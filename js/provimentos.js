/* ============================================================
   Monitor de Provimentos CNJ — app.js
   ============================================================ */

const STORAGE_KEY = "provimentos-cnj::v1";
const JSONBLOB_BASE_P = "https://jsonblob.com/api/jsonBlob";

let ESTADO_P = {
  sessaoId: null,
  adequacoes: {} // { [id]: { status, obs, atualizadoEm } }
};

let FILTROS = { busca: "", especialidade: "TODAS", situacao: "TODAS", adequacao: "TODAS" };
let EMAILS_POR_ID = {};   // { [id]: string[] } — em memória, não persistido individualmente
let EMAILS_PADRAO = [];   // últimos e-mails usados, reaproveitados ao abrir outro cartão
let PAINEL_EMAIL_ABERTO = null; // id do cartão com o painel de e-mail aberto, se algum
let timerEnvioSessaoP = null;
let timerPollingP = null;

/* ---------------- Utilidades ---------------- */
function escapeHtml(s){
  return String(s == null ? "" : s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}
function escapeAttr(s){ return escapeHtml(s).replace(/"/g, "&quot;"); }
function horaAtual(){
  const d = new Date();
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}
function formatarData(iso){
  if(!iso) return "—";
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
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
    if(raw) ESTADO_P = Object.assign({ sessaoId: null, adequacoes: {} }, JSON.parse(raw));
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

  document.getElementById("f-situacao").value = FILTROS.situacao;
  document.getElementById("f-busca").value = FILTROS.busca;
}

/* ---------------- Renderização: lista de cartões ---------------- */
function renderCard(p){
  const a = obterAdequacao(p.id);
  const emails = EMAILS_POR_ID[p.id] || [];

  const badgesEsp = p.especialidades.map(cod =>
    `<span class="badge esp">${cod === "TODAS" ? "Todas as especialidades" : ESPECIALIDADES[cod]}</span>`
  ).join("");

  const badgeSituacao = p.situacao === "Vigente"
    ? `<span class="badge vigente">Vigente</span>`
    : `<span class="badge alterado">Alterado</span>`;

  const respChips = p.responsaveis.map(r => `<span class="chip resp">${escapeHtml(r)}</span>`).join("");

  const prazoHtml = p.prazo ? `<div class="prov-prazo">⏱ Prazo / periodicidade: ${escapeHtml(p.prazo)}</div>` : "";

  const emailTagsHtml = emails.map(em => `
    <span class="email-tag">${escapeHtml(em)}
      <button type="button" data-action="remove-email" data-id="${p.id}" data-email="${escapeAttr(em)}" aria-label="Remover">&times;</button>
    </span>`).join("");

  return `
  <article class="prov-card" data-card-id="${p.id}">
    <div class="prov-card-top">
      <div>
        <span class="prov-id">Prov. ${p.id}/2026</span>
        <div class="prov-epigrafe">${escapeHtml(p.epigrafe)}</div>
        <div class="prov-data">Publicado em ${formatarData(p.data)} · vigência: a partir da publicação (salvo prazo indicado abaixo)</div>
      </div>
      <div class="prov-badges">${badgeSituacao}${badgesEsp}</div>
    </div>

    <div class="prov-resumo">${escapeHtml(p.resumo)}</div>
    ${prazoHtml}

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
      <button class="btn" type="button" data-action="deep-summary" data-id="${p.id}">🔎 Resumo aprofundado (Claude)</button>
      <button class="btn" type="button" data-action="gen-pdf" data-id="${p.id}">⬇ Gerar PDF do provimento</button>
      <button class="btn" type="button" data-action="toggle-email" data-id="${p.id}">✉ Notificar responsáveis</button>
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
  const lista = PROVIMENTOS
    .filter(provimentoCorrespondeFiltro)
    .sort((a, b) => b.data.localeCompare(a.data));

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

function renderTudo(){
  renderSidebar();
  renderLista();
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

function enviarEmail(id){
  const p = PROVIMENTOS.find(x => x.id === Number(id));
  const emails = EMAILS_POR_ID[id] || [];
  if(!emails.length){ toast("Adicione ao menos um e-mail antes de enviar.", "erro"); return; }
  const assunto = `Provimento CNJ ${p.id}/2026 — ${p.epigrafe}`;
  const corpo = `Olá,\n\nSegue provimento do CNJ para conhecimento e providências internas:\n\n` +
    `Provimento ${p.id}/2026 — publicado em ${formatarData(p.data)}\n` +
    `${p.epigrafe}\n\n` +
    `Resumo: ${p.resumo}\n\n` +
    (p.prazo ? `Prazo/periodicidade: ${p.prazo}\n\n` : "") +
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
  let y = 64;
  const largura = 595 - margem * 2;

  doc.setFont("helvetica", "bold"); doc.setFontSize(15);
  doc.text(`Provimento CNJ ${p.id}/2026`, margem, y); y += 22;

  doc.setFont("helvetica", "normal"); doc.setFontSize(11);
  doc.setTextColor(90, 90, 90);
  doc.text(`Publicado em ${formatarData(p.data)}  ·  Situação: ${p.situacao}  ·  Classificação: ${p.classificacao}`, margem, y); y += 22;

  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold"); doc.setFontSize(12.5);
  doc.text(doc.splitTextToSize(p.epigrafe, largura), margem, y);
  y += doc.splitTextToSize(p.epigrafe, largura).length * 16 + 14;

  const secao = (titulo, texto) => {
    doc.setFont("helvetica", "bold"); doc.setFontSize(10.5);
    doc.setTextColor(47, 111, 109);
    doc.text(titulo.toUpperCase(), margem, y); y += 14;
    doc.setFont("helvetica", "normal"); doc.setFontSize(11);
    doc.setTextColor(20, 20, 20);
    const linhas = doc.splitTextToSize(texto, largura);
    doc.text(linhas, margem, y);
    y += linhas.length * 14.5 + 16;
  };

  secao("Resumo prático", p.resumo);
  if(p.prazo) secao("Prazo / periodicidade", p.prazo);
  secao("Áreas internas envolvidas", p.areas === "NA" ? "Não especificado na fonte" : p.areas);
  secao("Responsáveis pela leitura", p.responsaveis.join(", "));
  secao("Especialidades aplicáveis", p.especialidades.map(c => ESPECIALIDADES[c]).join(", "));
  secao("Observações da auditoria interna", p.observacoes);
  secao("Íntegra do ato", p.url);

  const a = obterAdequacao(p.id);
  secao("Status de adequação interna registrado pelo cartório", rotuloStatus(a.status) + (a.obs ? " — " + a.obs : ""));

  doc.setFontSize(9); doc.setTextColor(150, 150, 150);
  doc.text("Gerado pelo Monitor de Provimentos CNJ — Regen · não substitui a leitura do ato normativo na íntegra.", margem, 800);

  doc.save(`provimento-cnj-${p.id}-2026.pdf`);
  toast("PDF gerado.", "ok");
}

/* ---------------- Resumo aprofundado (Claude) ---------------- */
function abrirResumoAprofundado(id){
  const p = PROVIMENTOS.find(x => x.id === Number(id));
  const prompt = `Explique em detalhes o Provimento CNJ ${p.id}/2026 ("${p.epigrafe}"), disponível em ${p.url}. ` +
    `Contexto interno do cartório: áreas envolvidas — ${p.areas === "NA" ? "não especificado" : p.areas}; ` +
    `observações da auditoria — ${p.observacoes} ` +
    `Quero entender: (1) o que muda na prática, (2) quais procedimentos internos preciso revisar, e (3) quais riscos de não conformidade devo priorizar.`;
  navigator.clipboard.writeText(prompt).then(() => {
    toast("Prompt copiado — cole na conversa com o Claude.", "ok");
  }).catch(() => {
    toast("Não foi possível copiar automaticamente. Copie o texto do provimento manualmente.", "erro");
  });
  window.open("https://claude.ai/new", "_blank", "noopener");
}

/* ---------------- Exportar / Importar status ---------------- */
function exportarJSON(){
  const blob = new Blob([JSON.stringify(ESTADO_P.adequacoes, null, 2)], { type: "application/json" });
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
      ESTADO_P.adequacoes = Object.assign({}, ESTADO_P.adequacoes, dados);
      salvar();
      renderTudo();
      toast("Status de adequação importado.", "ok");
    }catch(err){
      toast("Arquivo inválido.", "erro");
    }
  };
  reader.readAsText(file);
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
      ESTADO_P = Object.assign({ sessaoId: ESTADO_P.sessaoId, adequacoes: {} }, remoto);
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
    case "add-email": adicionarEmail(id); break;
    case "remove-email": removerEmail(id, btn.dataset.email); break;
    case "send-email": enviarEmail(id); break;
    case "gen-pdf": gerarPDF(id); break;
    case "deep-summary": abrirResumoAprofundado(id); break;
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
  document.getElementById("btn-limpar-filtros").addEventListener("click", () => {
    FILTROS = { busca: "", especialidade: "TODAS", situacao: "TODAS", adequacao: "TODAS" };
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
