/* ============================================================
   Monitor de Provimentos CNJ — app.js
   ============================================================ */

const STORAGE_KEY = "provimentos-cnj::v2";
const JSONBLOB_BASE_P = "https://jsonblob.com/api/jsonBlob";

let ESTADO_P = {
  sessaoId: null,
  cartorio: "", titular: "", dataReferencia: "",
  adequacoes: {} // { [id]: { status, obs, atualizadoEm } }
};

let FILTROS = { busca: "", especialidade: "TODAS", situacao: "TODAS", adequacao: "TODAS", ano: "TODOS" };
let EMAILS_POR_ID = {};   // { [id]: string[] } — em memória, não persistido individualmente
let EMAILS_PADRAO = [];   // últimos e-mails usados, reaproveitados ao abrir outro cartão
let PAINEL_EMAIL_ABERTO = null;   // id do cartão com o painel de e-mail aberto, se algum
let PAINEL_RESUMO_ABERTO = null;  // id do cartão com o resumo aprofundado aberto, se algum
let timerEnvioSessaoP = null;
let timerPollingP = null;

/* ---------------- Utilidades de data ---------------- */
function hojeISO(){
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function parseISO(iso){
  if(!iso) return null;
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d);
}
function addDaysISO(iso, dias){
  const d = parseISO(iso);
  if(!d || dias == null) return null;
  d.setDate(d.getDate() + dias);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function diasEntre(isoAlvo){
  const alvo = parseISO(isoAlvo);
  if(!alvo) return null;
  const hoje = parseISO(hojeISO());
  return Math.round((alvo - hoje) / 86400000);
}
function formatarData(iso){
  if(!iso) return "—";
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}
function proximaDataAnual(mmdd){
  if(!mmdd) return null;
  const [mes, dia] = mmdd.split("-").map(Number);
  const hoje = parseISO(hojeISO());
  let ano = hoje.getFullYear();
  let candidata = new Date(ano, mes - 1, dia);
  if(candidata < hoje) candidata = new Date(ano + 1, mes - 1, dia);
  return `${candidata.getFullYear()}-${String(candidata.getMonth()+1).padStart(2,"0")}-${String(candidata.getDate()).padStart(2,"0")}`;
}

/* ---------------- Cálculo de vigência e prazos ---------------- */
function vigenciaCalculada(p){
  const v = p.vigencia || {};
  if(v.tipo === "imediata") return p.dataPublicacaoDje || null;
  if(v.tipo === "dias_apos_publicacao") return addDaysISO(p.dataPublicacaoDje, v.dias);
  if(v.tipo === "data_fixa") return v.dataFixa;
  return null; // indeterminado
}
function prazoCalculado(p, prazo, vigenciaISO){
  if(prazo.tipo === "data_fixa") return prazo.dataFixa;
  if(prazo.tipo === "dias_apos_publicacao") return addDaysISO(p.dataPublicacaoDje, prazo.dias);
  if(prazo.tipo === "dias_apos_assinatura") return addDaysISO(p.dataAssinatura, prazo.dias);
  if(prazo.tipo === "dias_apos_vigencia") return addDaysISO(vigenciaISO, prazo.dias);
  if(prazo.tipo === "recorrente_anual") return proximaDataAnual(prazo.dataFixa);
  return null; // recorrente_mensal, recorrente_semestral, recorrente_outro, outro sem data-base
}
function badgeAlerta(diasRestantes, { emVigorLabel = false } = {}){
  if(diasRestantes == null) return "";
  if(diasRestantes <= 0){
    return emVigorLabel
      ? `<span class="alerta alerta-ok">Em vigor</span>`
      : `<span class="alerta alerta-vencido">Vencido há ${Math.abs(diasRestantes)} dia(s)</span>`;
  }
  if(diasRestantes <= 15) return `<span class="alerta alerta-urgente">Faltam ${diasRestantes} dia(s)</span>`;
  if(diasRestantes <= 45) return `<span class="alerta alerta-atencao">Faltam ${diasRestantes} dia(s)</span>`;
  return `<span class="alerta alerta-neutro">Faltam ${diasRestantes} dia(s)</span>`;
}

/* ---------------- Utilidades gerais ---------------- */
function escapeHtml(s){
  return String(s == null ? "" : s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}
function escapeAttr(s){ return escapeHtml(s).replace(/"/g, "&quot;"); }
function horaAtual(){
  const d = new Date();
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}
function rotuloStatus(valor){
  const s = STATUS_ADEQUACAO.find(x => x.valor === valor);
  return s ? s.rotulo : "Não avaliado";
}
function classeStatus(valor){ return "st-" + valor; }

function toast(msg, tipo){
  const container = document.getElementById("toast-container");
  const el = document.createElement("div");
  el.className = "toast" + (tipo ? " " + tipo : "");
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 4200);
}

/* ---------------- Persistência local ---------------- */
function salvar(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(ESTADO_P)); }catch(e){ /* ignore */ }
  agendarEnvioSessaoP();
}
function carregar(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw) ESTADO_P = Object.assign({ sessaoId: null, cartorio: "", titular: "", dataReferencia: "", adequacoes: {} }, JSON.parse(raw));
  }catch(e){ /* ignore */ }
}
function obterAdequacao(id){
  return ESTADO_P.adequacoes[id] || { status: "nao_avaliado", obs: "", atualizadoEm: null };
}
function setAdequacao(id, patch){
  const atual = obterAdequacao(id);
  ESTADO_P.adequacoes[id] = Object.assign({}, atual, patch, { atualizadoEm: new Date().toISOString() });
  salvar();
}

/* ---------------- Filtros ---------------- */
function provimentoCorrespondeFiltro(p){
  const a = obterAdequacao(p.id);
  if(FILTROS.ano !== "TODOS" && String(p.ano) !== String(FILTROS.ano)) return false;
  if(FILTROS.especialidade !== "TODAS" && !p.especialidades.includes(FILTROS.especialidade)) return false;
  if(FILTROS.situacao !== "TODAS" && p.situacao !== FILTROS.situacao) return false;
  if(FILTROS.adequacao !== "TODAS" && a.status !== FILTROS.adequacao) return false;
  if(FILTROS.busca){
    const alvo = [
      p.id, p.epigrafe, p.areas, p.observacoes, p.resumo,
      p.responsaveis.join(" "), p.especialidades.map(e => ESPECIALIDADES[e]).join(" ")
    ].join(" ").toLowerCase();
    if(!alvo.includes(FILTROS.busca.toLowerCase())) return false;
  }
  return true;
}
function provimentosOrdenados(lista){
  // Ordena por data de publicação no DJe quando confirmada para ambos os itens;
  // quando a data de publicação de algum dos dois não pôde ser confirmada
  // (ex.: Provimento 243/2026), usa a numeração do ato como critério — que segue
  // a ordem cronológica de expedição do CNJ e evita distorções por datas incertas.
  return lista.slice().sort((a, b) => {
    if(a.dataPublicacaoDje && b.dataPublicacaoDje && a.dataPublicacaoDje !== b.dataPublicacaoDje){
      return a.dataPublicacaoDje < b.dataPublicacaoDje ? -1 : 1;
    }
    return a.id - b.id;
  });
}

/* ---------------- Renderização: sidebar ---------------- */
function renderSidebar(){
  const porSituacao = { Vigente: 0, Alterado: 0 };
  PROVIMENTOS.forEach(p => porSituacao[p.situacao] = (porSituacao[p.situacao] || 0) + 1);

  const statsSituacao = document.getElementById("stats-situacao");
  statsSituacao.innerHTML = `
    <div class="stats-titulo">Situação normativa</div>
    <div class="stats-linha"><span><span class="stats-dot" style="background:var(--success)"></span>Vigente</span><b>${porSituacao.Vigente || 0}</b></div>
    <div class="stats-linha"><span><span class="stats-dot" style="background:var(--warning)"></span>Alterado</span><b>${porSituacao.Alterado || 0}</b></div>
    <div class="stats-linha"><span>Total</span><b>${PROVIMENTOS.length}</b></div>
  `;

  const porAdequacao = {};
  STATUS_ADEQUACAO.forEach(s => porAdequacao[s.valor] = 0);
  PROVIMENTOS.forEach(p => { porAdequacao[obterAdequacao(p.id).status]++; });

  const cores = {
    adequado: "var(--success)", parcial: "var(--warning)", andamento: "var(--accent)",
    nao_adequado: "var(--danger)", nao_aplicavel: "var(--neutral)", nao_avaliado: "var(--text-faint)"
  };
  const statsAdequacao = document.getElementById("stats-adequacao");
  statsAdequacao.innerHTML = `<div class="stats-titulo">Adequação interna</div>` +
    STATUS_ADEQUACAO.map(s => `
      <div class="stats-linha"><span><span class="stats-dot" style="background:${cores[s.valor]}"></span>${s.rotulo}</span><b>${porAdequacao[s.valor]}</b></div>
    `).join("");

  const listaEsp = document.getElementById("especialidade-filtros");
  listaEsp.innerHTML = Object.keys(ESPECIALIDADES).map(cod => {
    const n = cod === "TODAS" ? PROVIMENTOS.length : PROVIMENTOS.filter(p => p.especialidades.includes(cod)).length;
    const ativo = FILTROS.especialidade === cod ? "ativo" : "";
    return `<li class="nav-item"><button class="nav-btn ${ativo}" data-action="filtro-especialidade" data-valor="${cod}">
      <span class="nav-sigla">${cod === "TODAS" ? "*" : cod}</span>
      <span class="nav-nome">${ESPECIALIDADES[cod]}</span>
      <span class="nav-badge">${n}</span>
    </button></li>`;
  }).join("");

  const totalAvaliados = PROVIMENTOS.filter(p => obterAdequacao(p.id).status !== "nao_avaliado").length;
  const pct = Math.round((totalAvaliados / PROVIMENTOS.length) * 100);
  document.getElementById("progresso-txt").textContent = `${totalAvaliados} de ${PROVIMENTOS.length} provimentos avaliados (${pct}%)`;
  document.getElementById("progresso-fill").style.width = Math.min(pct, 100) + "%";
}

/* ---------------- Renderização: filtros (selects) ---------------- */
function preencherSelectsFiltro(){
  const selEsp = document.getElementById("f-especialidade");
  selEsp.innerHTML = Object.keys(ESPECIALIDADES).map(cod =>
    `<option value="${cod}">${cod === "TODAS" ? "Todas" : ESPECIALIDADES[cod] + " (" + cod + ")"}</option>`
  ).join("");
  selEsp.value = FILTROS.especialidade;

  const selAdeq = document.getElementById("f-adequacao");
  selAdeq.innerHTML = `<option value="TODAS">Todas</option>` +
    STATUS_ADEQUACAO.map(s => `<option value="${s.valor}">${s.rotulo}</option>`).join("");
  selAdeq.value = FILTROS.adequacao;

  const anos = Array.from(new Set(PROVIMENTOS.map(p => p.ano))).sort((a, b) => b - a);
  const selAno = document.getElementById("f-ano");
  selAno.innerHTML = `<option value="TODOS">Todos</option>` + anos.map(a => `<option value="${a}">${a}</option>`).join("");
  selAno.value = FILTROS.ano;

  document.getElementById("f-situacao").value = FILTROS.situacao;
  document.getElementById("f-busca").value = FILTROS.busca;
}

/* ---------------- Renderização: lista de cartões ---------------- */
function renderCard(p){
  const a = obterAdequacao(p.id);
  const emails = EMAILS_POR_ID[p.id] || [];
  const vigISO = vigenciaCalculada(p);
  const diasVig = vigISO ? diasEntre(vigISO) : null;

  const badgesEsp = p.especialidades.map(cod =>
    `<span class="badge esp">${cod === "TODAS" ? "Todas as especialidades" : ESPECIALIDADES[cod]}</span>`
  ).join("");

  const badgeSituacao = p.situacao === "Vigente"
    ? `<span class="badge vigente">Vigente</span>`
    : `<span class="badge alterado">Alterado</span>`;

  const respChips = p.responsaveis.map(r => `<span class="chip resp">${escapeHtml(r)}</span>`).join("");

  const emailTagsHtml = emails.map(em => `
    <span class="email-tag">${escapeHtml(em)}
      <button type="button" data-action="remove-email" data-id="${p.id}" data-email="${escapeAttr(em)}" aria-label="Remover">&times;</button>
    </span>`).join("");

  // ---- Vigência ----
  let vigenciaHtml;
  if(!p.fonteVerificada && p.vigencia.tipo === "indeterminado"){
    vigenciaHtml = `<div class="prov-vigencia nao-verificado">⚠ Vigência não confirmada na fonte oficial — verifique o DJe antes de contar prazos. ${escapeHtml(p.vigencia.textoFonte || "")}</div>`;
  } else if(vigISO){
    const label = diasVig <= 0 ? `Em vigor desde ${formatarData(vigISO)}` : `Entra em vigor em ${formatarData(vigISO)}`;
    vigenciaHtml = `<div class="prov-vigencia">📅 ${label} ${badgeAlerta(diasVig, { emVigorLabel: true })}</div>`;
  } else {
    vigenciaHtml = `<div class="prov-vigencia">📅 Vigência: não determinada automaticamente.</div>`;
  }

  // ---- Prazos ----
  const prazosHtml = (p.prazos || []).map(prazo => {
    const dataCalc = prazoCalculado(p, prazo, vigISO);
    const dias = dataCalc ? diasEntre(dataCalc) : null;
    const dataLabel = dataCalc ? ` — ${formatarData(dataCalc)}` : "";
    const alerta = dias != null ? badgeAlerta(dias) : "";
    return `<div class="prov-prazo">⏱ ${escapeHtml(prazo.descricao)}${dataLabel} ${alerta}</div>`;
  }).join("");

  // ---- Resumo aprofundado (painel) ----
  const resumoAberto = PAINEL_RESUMO_ABERTO === p.id;
  const avisoFonte = !p.fonteVerificada ? `<p class="fonte-aviso">⚠ Esta pesquisa não pôde ser confirmada com segurança na fonte oficial — verifique o texto do ato no site do CNJ antes de uso formal.</p>` : "";

  return `
  <article class="prov-card" data-card-id="${p.id}">
    <div class="prov-card-top">
      <div>
        <div class="prov-numero">Provimento ${ORGAO} ${p.id}/${p.ano}</div>
        <div class="prov-epigrafe">${escapeHtml(p.epigrafe)}</div>
        <div class="prov-data">Publicado em ${formatarData(p.dataPublicacaoDje)}${p.djeReferencia ? " · " + escapeHtml(p.djeReferencia) : ""}</div>
      </div>
      <div class="prov-badges">${badgeSituacao}${badgesEsp}</div>
    </div>

    <div class="prov-resumo">${escapeHtml(p.resumo)}</div>
    ${vigenciaHtml}
    ${prazosHtml}

    <div class="prov-meta">
      <div class="prov-meta-item">
        <strong>Áreas internas envolvidas</strong>
        ${escapeHtml(p.areas === "NA" ? "Não especificado na fonte" : p.areas)}
      </div>
      <div class="prov-meta-item">
        <strong>Responsáveis pela leitura</strong>
        <div class="chip-lista">${respChips}</div>
      </div>
      <div class="prov-meta-item">
        <strong>Íntegra do ato</strong>
        <a class="prov-link" href="${escapeAttr(p.url)}" target="_blank" rel="noopener">Ler no portal do CNJ ↗</a>
        <br><small style="color:var(--text-faint)">Classificação: ${escapeHtml(p.classificacao)}</small>
      </div>
    </div>

    <div class="prov-acoes">
      <button class="btn" type="button" data-action="toggle-resumo" data-id="${p.id}">${resumoAberto ? "▲ Ocultar resumo aprofundado" : "🔎 Ler resumo aprofundado"}</button>
      <button class="btn" type="button" data-action="gen-pdf" data-id="${p.id}">⬇ Gerar PDF do provimento</button>
      <button class="btn" type="button" data-action="toggle-email" data-id="${p.id}">✉ Notificar responsáveis</button>
    </div>

    <div class="resumo-aprofundado-painel ${resumoAberto ? "aberto" : ""}" id="resumo-painel-${p.id}">
      ${avisoFonte}
      <p>${escapeHtml(p.resumoAprofundado)}</p>
    </div>

    <div class="adequacao-painel">
      <div class="adequacao-campo">
        <label for="status-${p.id}">Adequação interna</label>
        <select id="status-${p.id}" class="${classeStatus(a.status)}" data-action="status" data-id="${p.id}">
          ${STATUS_ADEQUACAO.map(s => `<option value="${s.valor}" ${s.valor === a.status ? "selected" : ""}>${s.rotulo}</option>`).join("")}
        </select>
      </div>
      <div class="adequacao-obs">
        <label for="obs-${p.id}">Observação interna (opcional)</label>
        <textarea id="obs-${p.id}" data-action="obs" data-id="${p.id}" placeholder="Ex.: procedimento ajustado em 12/08, aguardando validação do responsável...">${escapeHtml(a.obs)}</textarea>
      </div>
      ${a.atualizadoEm ? `<div class="adequacao-meta">Atualizado em ${new Date(a.atualizadoEm).toLocaleString("pt-BR")}</div>` : ""}
    </div>

    <div class="email-painel" id="email-painel-${p.id}">
      <p class="email-ajuda">Adicione os e-mails dos responsáveis internos que devem tomar conhecimento deste provimento. "Gerar PDF" baixa um resumo em PDF para anexar; "Abrir e-mail" prepara uma mensagem no seu cliente de e-mail padrão com os destinatários e o resumo — anexe o PDF baixado antes de enviar (envio automático com anexo requer um backend de e-mail; veja nota abaixo).</p>
      <div class="email-tags" id="email-tags-${p.id}">${emailTagsHtml}</div>
      <div class="email-input-row">
        <input type="text" placeholder="nome@cartorio.com.br" data-role="email-input" data-id="${p.id}">
        <button class="btn" type="button" data-action="add-email" data-id="${p.id}">Adicionar</button>
      </div>
      <div class="prov-acoes">
        <button class="btn primario" type="button" data-action="send-email" data-id="${p.id}">Abrir e-mail para os destinatários</button>
      </div>
    </div>
  </article>`;
}

function renderLista(){
  const lista = provimentosOrdenados(PROVIMENTOS.filter(provimentoCorrespondeFiltro));

  const container = document.getElementById("prov-lista");
  document.getElementById("filtro-contador").textContent =
    `${lista.length} de ${PROVIMENTOS.length} provimentos`;

  container.innerHTML = lista.length
    ? lista.map(renderCard).join("")
    : `<div class="prov-vazio">Nenhum provimento encontrado com os filtros atuais.</div>`;

  if(PAINEL_EMAIL_ABERTO){
    const el = document.getElementById(`email-painel-${PAINEL_EMAIL_ABERTO}`);
    if(el) el.classList.add("aberto");
  }
}

function renderCapa(){
  document.getElementById("in-cartorio").value = ESTADO_P.cartorio || "";
  document.getElementById("in-titular").value = ESTADO_P.titular || "";
  document.getElementById("in-data-ref").value = ESTADO_P.dataReferencia || "";
}

function renderTudo(){
  renderSidebar();
  renderLista();
  renderCapa();
}

/* ---------------- Ações de e-mail ---------------- */
function validarEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

function adicionarEmail(id){
  const input = document.querySelector(`input[data-role="email-input"][data-id="${id}"]`);
  const valor = (input.value || "").trim();
  if(!valor) return;
  if(!validarEmail(valor)){ toast("E-mail inválido: " + valor, "erro"); return; }
  EMAILS_POR_ID[id] = EMAILS_POR_ID[id] || [];
  if(!EMAILS_POR_ID[id].includes(valor)) EMAILS_POR_ID[id].push(valor);
  EMAILS_PADRAO = EMAILS_POR_ID[id].slice();
  PAINEL_EMAIL_ABERTO = id;
  renderLista();
}
function removerEmail(id, email){
  EMAILS_POR_ID[id] = (EMAILS_POR_ID[id] || []).filter(e => e !== email);
  PAINEL_EMAIL_ABERTO = id;
  renderLista();
}
function abrirPainelEmail(id){
  if(!EMAILS_POR_ID[id] && EMAILS_PADRAO.length) EMAILS_POR_ID[id] = EMAILS_PADRAO.slice();
  const jaAberto = PAINEL_EMAIL_ABERTO === id;
  PAINEL_EMAIL_ABERTO = jaAberto ? null : id;
  renderLista();
}
function alternarResumoAprofundado(id){
  PAINEL_RESUMO_ABERTO = PAINEL_RESUMO_ABERTO === id ? null : id;
  renderLista();
  if(PAINEL_RESUMO_ABERTO === id){
    const el = document.getElementById(`resumo-painel-${id}`);
    if(el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function enviarEmail(id){
  const p = PROVIMENTOS.find(x => x.id === Number(id));
  const emails = EMAILS_POR_ID[id] || [];
  if(!emails.length){ toast("Adicione ao menos um e-mail antes de enviar.", "erro"); return; }
  const assunto = `Provimento ${ORGAO} ${p.id}/${p.ano} — ${p.epigrafe}`;
  const corpo = `Olá,\n\nSegue provimento do CNJ para conhecimento e providências internas:\n\n` +
    `Provimento ${ORGAO} ${p.id}/${p.ano} — publicado em ${formatarData(p.dataPublicacaoDje)}\n` +
    `${p.epigrafe}\n\n` +
    `Resumo: ${p.resumo}\n\n` +
    `Íntegra do ato: ${p.url}\n\n` +
    `Anexe a este e-mail o PDF gerado pelo botão "Gerar PDF do provimento" no monitor.\n\n` +
    `Monitor de Provimentos CNJ — ${window.location.origin}${window.location.pathname}`;
  const link = `mailto:${emails.join(",")}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  window.location.href = link;
  toast("Abrindo seu cliente de e-mail — não esqueça de anexar o PDF baixado.", "ok");
}

/* ---------------- PDF ---------------- */
function gerarPDF(id){
  const p = PROVIMENTOS.find(x => x.id === Number(id));
  if(!window.jspdf){ toast("Não foi possível carregar o gerador de PDF agora.", "erro"); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margem = 56;
  let y = 60;
  const largura = 595 - margem * 2;
  const alturaPagina = 800;

  const quebraPagina = (linhasAltura) => {
    if(y + linhasAltura > alturaPagina){ doc.addPage(); y = 60; }
  };

  doc.setFont("helvetica", "bold"); doc.setFontSize(17);
  doc.text(`Provimento ${ORGAO} ${p.id}/${p.ano}`, margem, y); y += 24;

  doc.setFont("helvetica", "normal"); doc.setFontSize(10.5);
  doc.setTextColor(90, 90, 90);
  doc.text(`Publicado em ${formatarData(p.dataPublicacaoDje)} (${p.djeReferencia || "DJe não confirmado"})  ·  Situação: ${p.situacao}`, margem, y); y += 20;

  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.5);
  const linhasEpigrafe = doc.splitTextToSize(p.epigrafe, largura);
  doc.text(linhasEpigrafe, margem, y);
  y += linhasEpigrafe.length * 16 + 12;

  const secao = (titulo, texto) => {
    if(!texto) return;
    doc.setFont("helvetica", "bold"); doc.setFontSize(10.5);
    doc.setTextColor(47, 111, 109);
    quebraPagina(14);
    doc.text(titulo.toUpperCase(), margem, y); y += 14;
    doc.setFont("helvetica", "normal"); doc.setFontSize(10.5);
    doc.setTextColor(20, 20, 20);
    const linhas = doc.splitTextToSize(texto, largura);
    quebraPagina(linhas.length * 13.5);
    doc.text(linhas, margem, y);
    y += linhas.length * 13.5 + 14;
  };

  const vigISO = vigenciaCalculada(p);
  const vigTexto = !p.fonteVerificada && p.vigencia.tipo === "indeterminado"
    ? `Não confirmada na fonte oficial. ${p.vigencia.textoFonte || ""}`
    : vigISO ? `${formatarData(vigISO)} (${p.vigencia.textoFonte || ""})` : "Não determinada.";

  secao("Resumo prático", p.resumo);
  secao("Vigência", vigTexto);
  if((p.prazos || []).length){
    const txtPrazos = p.prazos.map(pr => {
      const dc = prazoCalculado(p, pr, vigISO);
      return `${pr.descricao}${dc ? " — " + formatarData(dc) : ""} (${pr.textoFonte})`;
    }).join("\n");
    secao("Prazos", txtPrazos);
  }
  secao("Áreas internas envolvidas", p.areas === "NA" ? "Não especificado na fonte" : p.areas);
  secao("Responsáveis pela leitura", p.responsaveis.join(", "));
  secao("Especialidades aplicáveis", p.especialidades.map(c => ESPECIALIDADES[c]).join(", "));
  secao("Resumo aprofundado", p.resumoAprofundado + (!p.fonteVerificada ? " [ATENÇÃO: fonte não confirmada — verifique o DJe oficial antes de uso formal]" : ""));
  secao("Íntegra do ato", p.url);

  const a = obterAdequacao(p.id);
  secao("Status de adequação interna registrado pelo cartório", rotuloStatus(a.status) + (a.obs ? " — " + a.obs : ""));

  quebraPagina(20);
  doc.setFontSize(8.5); doc.setTextColor(150, 150, 150);
  doc.text("Gerado pelo Monitor de Provimentos CNJ — Regen · não substitui a leitura do ato normativo na íntegra.", margem, alturaPagina);

  doc.save(`provimento-cnj-${p.id}-${p.ano}.pdf`);
  toast("PDF gerado.", "ok");
}

/* ---------------- Exportar / Importar status ---------------- */
function exportarJSON(){
  const dados = { cartorio: ESTADO_P.cartorio, titular: ESTADO_P.titular, dataReferencia: ESTADO_P.dataReferencia, adequacoes: ESTADO_P.adequacoes };
  const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "adequacao-provimentos-cnj.json";
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  toast("Status de adequação exportado.", "ok");
}
function importarJSON(file){
  const reader = new FileReader();
  reader.onload = (e) => {
    try{
      const dados = JSON.parse(e.target.result);
      if(dados.adequacoes) ESTADO_P.adequacoes = Object.assign({}, ESTADO_P.adequacoes, dados.adequacoes);
      if(dados.cartorio != null) ESTADO_P.cartorio = dados.cartorio;
      if(dados.titular != null) ESTADO_P.titular = dados.titular;
      if(dados.dataReferencia != null) ESTADO_P.dataReferencia = dados.dataReferencia;
      salvar();
      renderTudo();
      toast("Status de adequação importado.", "ok");
    }catch(err){
      toast("Arquivo inválido.", "erro");
    }
  };
  reader.readAsText(file);
}

/* ---------------- Relatório (score, conclusão, plano de ação) ---------------- */
function calcularEstatisticas(){
  const contagem = {}; STATUS_ADEQUACAO.forEach(s => contagem[s.valor] = 0);
  PROVIMENTOS.forEach(p => contagem[obterAdequacao(p.id).status]++);
  const total = PROVIMENTOS.length;
  const naoAplicavel = contagem["nao_aplicavel"];
  const baseCalculo = total - naoAplicavel;
  let pontos = 0;
  STATUS_ADEQUACAO.forEach(s => { if(s.peso != null) pontos += contagem[s.valor] * s.peso; });
  const score = baseCalculo > 0 ? Math.round((pontos / baseCalculo) * 100) : 0;
  return { contagem, total, naoAplicavel, baseCalculo, score, naoAvaliado: contagem["nao_avaliado"] };
}
function seloSVG(pct){
  let cor = "#1F8A55", rotulo = "CONFORME";
  if(pct < 60){ cor = "#C0392B"; rotulo = "CRÍTICO"; }
  else if(pct < 85){ cor = "#B7791E"; rotulo = "ATENÇÃO"; }
  return `
  <svg class="selo-svg" width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-label="Selo de adequação: ${pct}%">
    <circle cx="60" cy="60" r="54" fill="none" stroke="#EEF0F5" stroke-width="9"/>
    <circle cx="60" cy="60" r="54" fill="none" stroke="${cor}" stroke-width="9" stroke-linecap="round"
      stroke-dasharray="${2 * Math.PI * 54}" stroke-dashoffset="${2 * Math.PI * 54 * (1 - pct / 100)}"
      transform="rotate(-90 60 60)"/>
    <text x="60" y="58" text-anchor="middle" font-size="24" font-weight="700" fill="${cor}">${pct}%</text>
    <text x="60" y="76" text-anchor="middle" font-size="9" font-weight="600" letter-spacing="1" fill="${cor}">${rotulo}</text>
  </svg>`;
}
function textoConclusaoRelatorio(stats){
  const { score, naoAvaliado, total, naoAplicavel } = stats;
  let nivel, orientacao;
  if(naoAvaliado === total){
    nivel = "Avaliação ainda não iniciada.";
    orientacao = "Registre o status de adequação de cada provimento para gerar um diagnóstico.";
  } else if(score >= 85 && naoAvaliado === 0){
    nivel = "Situação geral: adequada, com baixo risco de exposição correcional.";
    orientacao = "O cartório atende à maior parte dos provimentos do CNJ monitorados. Recomenda-se manter rotina de reavaliação periódica e tratar os itens parciais ou em andamento remanescentes, sobretudo os que têm prazo próximo do vencimento.";
  } else if(score >= 60){
    nivel = "Situação geral: atenção — há pendências relevantes.";
    orientacao = "Existem provimentos não adequados, parciais ou ainda não avaliados que podem gerar exposição em correição. Priorize o plano de ação abaixo, sobretudo os itens com prazo vencido ou próximo do vencimento.";
  } else {
    nivel = "Situação geral: crítica — exposição correcional relevante.";
    orientacao = "O volume de provimentos não adequados ou não avaliados é significativo. Recomenda-se um plano de saneamento formal, com cronograma e responsáveis definidos, priorizando os itens com prazo vencido.";
  }
  const naoAvaliadoTxt = naoAvaliado > 0
    ? ` Há ${naoAvaliado} provimento(s) ainda não avaliado(s) — conclua a avaliação antes de considerar o diagnóstico definitivo.`
    : "";
  const naTxt = naoAplicavel > 0 ? ` ${naoAplicavel} provimento(s) foram marcados como não aplicáveis e não entram no cálculo.` : "";
  return `<p><b>${nivel}</b></p><p>${orientacao}${naoAvaliadoTxt}${naTxt}</p>`;
}
function urgenciaItem(p){
  // menor número = mais urgente
  const a = obterAdequacao(p.id);
  const vigISO = vigenciaCalculada(p);
  let menorDias = Infinity;
  const prazosComData = (p.prazos || []).map(pr => prazoCalculado(p, pr, vigISO)).filter(Boolean);
  if(vigISO) menorDias = Math.min(menorDias, diasEntre(vigISO));
  prazosComData.forEach(d => { menorDias = Math.min(menorDias, diasEntre(d)); });
  const temPrazoUrgente = menorDias !== Infinity && menorDias <= 45;
  const pesoStatus = { nao_adequado: 0, nao_avaliado: 1, parcial: 2, andamento: 3, adequado: 5, nao_aplicavel: 6 }[a.status] ?? 4;
  return { prioridade: (temPrazoUrgente ? 0 : 1) * 10 + pesoStatus, menorDias: menorDias === Infinity ? null : menorDias };
}
function renderRelatorio(){
  const stats = calcularEstatisticas();

  document.getElementById("rel-cartorio").textContent = ESTADO_P.cartorio || "Cartório não identificado";
  document.getElementById("rel-titular").textContent = ESTADO_P.titular ? `Responsável pela verificação: ${ESTADO_P.titular}` : "";
  document.getElementById("rel-data").textContent = ESTADO_P.dataReferencia ? `Data de referência: ${formatarData(ESTADO_P.dataReferencia)}` : "";
  document.getElementById("rel-gerado").textContent = `Relatório gerado em ${new Date().toLocaleDateString("pt-BR")}`;

  document.getElementById("selo-container").innerHTML = seloSVG(stats.score);

  document.getElementById("resumo-adequado").textContent = stats.contagem.adequado;
  document.getElementById("resumo-parcial").textContent = stats.contagem.parcial;
  document.getElementById("resumo-andamento").textContent = stats.contagem.andamento;
  document.getElementById("resumo-nao-adequado").textContent = stats.contagem.nao_adequado;
  document.getElementById("resumo-na").textContent = stats.contagem.nao_aplicavel;
  document.getElementById("resumo-pendente").textContent = stats.contagem.nao_avaliado;

  document.getElementById("rel-conclusao-corpo").innerHTML = textoConclusaoRelatorio(stats);

  const pendentes = PROVIMENTOS
    .filter(p => obterAdequacao(p.id).status !== "adequado" && obterAdequacao(p.id).status !== "nao_aplicavel")
    .map(p => ({ p, u: urgenciaItem(p) }))
    .sort((a, b) => a.u.prioridade - b.u.prioridade || (a.u.menorDias ?? 9999) - (b.u.menorDias ?? 9999));

  const cont = document.getElementById("rel-acoes-lista");
  if(!pendentes.length){
    cont.innerHTML = `<div class="sem-pendencia">Nenhuma ação pendente — todos os provimentos aplicáveis estão marcados como adequados.</div>`;
  } else {
    cont.innerHTML = pendentes.map(({ p, u }) => {
      const a = obterAdequacao(p.id);
      const urgente = u.menorDias != null && u.menorDias <= 45;
      return `<div class="pendencia ${urgente ? "urgente" : ""}">
        <div class="p-titulo">Provimento ${ORGAO} ${p.id}/${p.ano} — ${escapeHtml(p.epigrafe)}</div>
        <div class="p-ref">Status atual: <b>${rotuloStatus(a.status)}</b>${u.menorDias != null ? " · " + badgeAlerta(u.menorDias, { emVigorLabel: true }) : ""}</div>
        <div class="p-prov">${escapeHtml(p.resumo)}</div>
        ${a.obs ? `<div class="p-meta">Observação do cartório: ${escapeHtml(a.obs)}</div>` : ""}
      </div>`;
    }).join("");
  }

  document.getElementById("relatorio").classList.add("ativa");
  document.getElementById("relatorio").scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------------- Sessão colaborativa (jsonblob.com) ---------------- */
function obterSessaoDaURLP(){
  return new URLSearchParams(window.location.search).get("sessao");
}
function atualizarURLSessaoP(id){
  const url = new URL(window.location);
  if(id) url.searchParams.set("sessao", id); else url.searchParams.delete("sessao");
  history.replaceState({}, "", url);
}
function setColabStatusP(msg, tipo){
  const el = document.getElementById("colab-status");
  if(!el) return;
  el.textContent = msg;
  el.className = "colab-status" + (tipo ? " " + tipo : "");
}
async function criarSessaoColaborativaP(){
  setColabStatusP("Criando sessão...");
  try{
    const resp = await fetch(JSONBLOB_BASE_P, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(ESTADO_P)
    });
    if(!resp.ok) throw new Error("status " + resp.status);
    const loc = resp.headers.get("Location") || resp.headers.get("location");
    if(!loc) throw new Error("sem identificador de sessão retornado");
    ESTADO_P.sessaoId = loc.split("/").pop();
    atualizarURLSessaoP(ESTADO_P.sessaoId);
    iniciarPollingP();
    setColabStatusP("Sessão criada. Compartilhe o link abaixo com a equipe.", "ok");
    atualizarPainelColabP();
  }catch(err){
    console.warn(err);
    setColabStatusP("Não foi possível criar a sessão colaborativa agora. Use exportar/importar JSON como alternativa.", "erro");
  }
}
async function enviarSessaoP(){
  if(!ESTADO_P.sessaoId) return;
  try{
    await fetch(`${JSONBLOB_BASE_P}/${ESTADO_P.sessaoId}`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(ESTADO_P)
    });
    setColabStatusP("Sincronizado às " + horaAtual(), "ok");
  }catch(err){ setColabStatusP("Falha ao sincronizar — verifique a conexão.", "erro"); }
}
async function receberSessaoP(silencioso){
  if(!ESTADO_P.sessaoId) return;
  try{
    const resp = await fetch(`${JSONBLOB_BASE_P}/${ESTADO_P.sessaoId}`);
    if(!resp.ok) throw new Error("status " + resp.status);
    const remoto = await resp.json();
    if(JSON.stringify(remoto) !== JSON.stringify(ESTADO_P)){
      remoto.sessaoId = ESTADO_P.sessaoId;
      ESTADO_P = Object.assign({ sessaoId: ESTADO_P.sessaoId, cartorio: "", titular: "", dataReferencia: "", adequacoes: {} }, remoto);
      renderTudo();
    }
    if(!silencioso) setColabStatusP("Sincronizado às " + horaAtual(), "ok");
  }catch(err){ if(!silencioso) setColabStatusP("Não foi possível sincronizar agora.", "erro"); }
}
function agendarEnvioSessaoP(){
  if(!ESTADO_P.sessaoId) return;
  clearTimeout(timerEnvioSessaoP);
  timerEnvioSessaoP = setTimeout(enviarSessaoP, 1500);
}
function iniciarPollingP(){
  clearInterval(timerPollingP);
  timerPollingP = setInterval(() => receberSessaoP(true), 20000);
}
function encerrarSessaoColaborativaP(){
  ESTADO_P.sessaoId = null;
  clearInterval(timerPollingP);
  atualizarURLSessaoP(null);
  atualizarPainelColabP();
}
function atualizarPainelColabP(){
  const painel = document.getElementById("colab-painel");
  if(!painel) return;
  if(ESTADO_P.sessaoId){
    const link = window.location.origin + window.location.pathname + "?sessao=" + ESTADO_P.sessaoId;
    painel.innerHTML = `
      <h3>Sessão colaborativa ativa</h3>
      <p>Qualquer pessoa com este link vê e atualiza o status de adequação interna, sincronizado entre todos automaticamente.</p>
      <div class="colab-link-row">
        <input type="text" id="colab-link" value="${escapeAttr(link)}" readonly>
        <button class="btn primario" id="btn-copiar-link-p" type="button">Copiar link</button>
        <button class="btn" id="btn-sincronizar-p" type="button">Sincronizar agora</button>
        <button class="btn" id="btn-encerrar-sessao-p" type="button">Encerrar sessão</button>
      </div>
      <div class="colab-status" id="colab-status"></div>
    `;
    document.getElementById("btn-copiar-link-p").addEventListener("click", () => {
      navigator.clipboard.writeText(link).then(() => setColabStatusP("Link copiado.", "ok"));
    });
    document.getElementById("btn-sincronizar-p").addEventListener("click", () => receberSessaoP(false).then(enviarSessaoP));
    document.getElementById("btn-encerrar-sessao-p").addEventListener("click", () => {
      if(confirm("Encerrar a sessão colaborativa?")) encerrarSessaoColaborativaP();
    });
  } else {
    painel.innerHTML = `
      <h3>Preenchimento colaborativo</h3>
      <p>Gere um link para que a equipe registre o status de adequação junto com você, sincronizado automaticamente. Depende de um serviço gratuito externo (jsonblob.com). Se preferir não depender dele, use "Exportar" / "Importar" para revezar manualmente.</p>
      <button class="btn primario" id="btn-criar-sessao-p" type="button">Criar link de preenchimento colaborativo</button>
      <div class="colab-status" id="colab-status"></div>
    `;
    document.getElementById("btn-criar-sessao-p").addEventListener("click", criarSessaoColaborativaP);
  }
}
function alternarPainelColabP(){
  const painel = document.getElementById("colab-painel");
  painel.style.display = (painel.style.display === "none" || !painel.style.display) ? "block" : "none";
}

/* ---------------- Eventos (delegação) ---------------- */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if(!btn) return;
  const id = btn.dataset.id;
  switch(btn.dataset.action){
    case "filtro-especialidade":
      FILTROS.especialidade = btn.dataset.valor;
      preencherSelectsFiltro();
      renderTudo();
      break;
    case "toggle-email": abrirPainelEmail(id); break;
    case "toggle-resumo": alternarResumoAprofundado(Number(id)); break;
    case "add-email": adicionarEmail(id); break;
    case "remove-email": removerEmail(id, btn.dataset.email); break;
    case "send-email": enviarEmail(id); break;
    case "gen-pdf": gerarPDF(id); break;
    case "gerar-relatorio": renderRelatorio(); break;
    case "imprimir-relatorio": window.print(); break;
  }
});

document.addEventListener("keydown", (e) => {
  if(e.target.matches('input[data-role="email-input"]') && e.key === "Enter"){
    e.preventDefault();
    adicionarEmail(e.target.dataset.id);
  }
});

document.addEventListener("change", (e) => {
  if(e.target.matches("select[data-action='status']")){
    setAdequacao(e.target.dataset.id, { status: e.target.value });
    renderTudo();
  }
  if(e.target.id === "in-cartorio"){ ESTADO_P.cartorio = e.target.value; salvar(); }
  if(e.target.id === "in-titular"){ ESTADO_P.titular = e.target.value; salvar(); }
  if(e.target.id === "in-data-ref"){ ESTADO_P.dataReferencia = e.target.value; salvar(); }
});
document.addEventListener("blur", (e) => {
  if(e.target.matches("textarea[data-action='obs']")){
    setAdequacao(e.target.dataset.id, { obs: e.target.value });
    renderSidebar();
  }
}, true);

document.addEventListener("DOMContentLoaded", async () => {
  carregar();
  preencherSelectsFiltro();

  const sessaoURL = obterSessaoDaURLP();
  if(sessaoURL){
    ESTADO_P.sessaoId = sessaoURL;
    await receberSessaoP(true);
    iniciarPollingP();
  }
  atualizarPainelColabP();
  renderTudo();

  document.getElementById("f-busca").addEventListener("input", (e) => { FILTROS.busca = e.target.value; renderLista(); });
  document.getElementById("f-especialidade").addEventListener("change", (e) => { FILTROS.especialidade = e.target.value; renderTudo(); });
  document.getElementById("f-situacao").addEventListener("change", (e) => { FILTROS.situacao = e.target.value; renderLista(); });
  document.getElementById("f-adequacao").addEventListener("change", (e) => { FILTROS.adequacao = e.target.value; renderLista(); });
  document.getElementById("f-ano").addEventListener("change", (e) => { FILTROS.ano = e.target.value; renderLista(); });
  document.getElementById("btn-limpar-filtros").addEventListener("click", () => {
    FILTROS = { busca: "", especialidade: "TODAS", situacao: "TODAS", adequacao: "TODAS", ano: "TODOS" };
    preencherSelectsFiltro();
    renderTudo();
  });

  document.getElementById("btn-exportar").addEventListener("click", exportarJSON);
  document.getElementById("btn-importar").addEventListener("click", () => document.getElementById("input-importar").click());
  document.getElementById("input-importar").addEventListener("change", (e) => {
    if(e.target.files[0]) importarJSON(e.target.files[0]);
  });
  document.getElementById("btn-colab").addEventListener("click", alternarPainelColabP);
});
