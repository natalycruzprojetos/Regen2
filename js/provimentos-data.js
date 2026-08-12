/* ============================================================
   Monitor de Provimentos CNJ — dados
   Fonte primária: planilha "Provimentos - Auditoria" (22 provimentos CNJ, 2026).
   Datas de assinatura/publicação no DJe/CNJ, regra de vigência e prazos
   foram conferidos na página oficial de cada ato em atos.cnj.jus.br
   (campo "fonteVerificada"). Quando não foi possível confirmar com
   segurança, o item fica marcado como fonteVerificada:false — verifique
   o DJe oficial antes de usar esse dado para fins de conformidade formal.
   Campos "especialidades", "resumo", "resumoAprofundado" e "responsaveis"
   são leitura analítica elaborada a partir do texto dos atos, para apoiar
   a triagem interna do cartório — não substituem a leitura do ato na íntegra.
   ============================================================ */

const ORGAO = "CNJ";

const ESPECIALIDADES = {
  TODAS:  "Todas",
  RI:     "Registro de Imóveis",
  RCPN:   "Registro Civil de Pessoas Naturais",
  TN:     "Tabelionato de Notas",
  TPLT:   "Tabelionato de Protesto de Títulos",
  RTDPJ:  "Registro de Títulos e Documentos e Civil das Pessoas Jurídicas"
};

const STATUS_ADEQUACAO = [
  { valor: "nao_avaliado",   rotulo: "Não avaliado",         peso: 0 },
  { valor: "adequado",       rotulo: "Adequado",             peso: 1 },
  { valor: "parcial",        rotulo: "Parcialmente adequado", peso: 0.6 },
  { valor: "andamento",      rotulo: "Em andamento",         peso: 0.4 },
  { valor: "nao_adequado",   rotulo: "Não adequado",         peso: 0 },
  { valor: "nao_aplicavel",  rotulo: "Não aplicável",        peso: null } // excluído do cálculo
];

/* Tipos de vigência:
   "imediata"              -> entra em vigor na data de publicação
   "dias_apos_publicacao"  -> soma vigencia.dias à dataPublicacaoDje
   "data_fixa"             -> vigencia.dataFixa já é a data de entrada em vigor
   "indeterminado"         -> não foi possível confirmar (ver fonteVerificada)
*/

const PROVIMENTOS = [
{
  id: 211, ano: 2026,
  dataAssinatura: "2026-01-28", dataPublicacaoDje: "2026-01-30",
  djeReferencia: "DJe/CNJ n. 20/2026, de 30/01/2026, p. 3-6",
  fonteVerificada: true,
  epigrafe: "Altera o CNN-Extra — disciplina o uso de papéis de segurança pela serventia (arts. 64-A a 64-I).",
  areas: "Certidão",
  observacoes: "Confirmar se serventia ainda faz uso de papel de segurança para emissão de certidões. Em caso positivo, fazer a leitura do ato normativo e confirmar procedimento interno.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6649",
  especialidades: ["TODAS"],
  responsaveis: ["Escrituração de certidões", "Oficial"],
  resumo: "Insere no CNN-Extra um capítulo próprio sobre uso de papel de segurança pelas serventias: regras de aquisição junto a Entidades Credenciadoras, especificações técnicas, numeração sequencial obrigatória e exigências contratuais. Revisar fornecedor, credenciamento e controle interno de estoque.",
  resumoAprofundado: "O Provimento CNJ 211/2026 (assinado em 28/01/2026, DJe/CNJ n. 20/2026 de 30/01/2026) insere no CNN-Extra o Capítulo II do Título II (arts. 64-A a 64-I), disciplinando em detalhe o uso de papel de segurança pelas serventias extrajudiciais: regras de aquisição junto a Entidades Credenciadoras, especificações técnicas de segurança documentoscópica, numeração sequencial obrigatória, exigências contratuais mínimas entre serventia e fornecedora, programas de conformidade e hipóteses de suspensão/cassação do credenciamento da fornecedora. Revoga os arts. 461 e 461-A do CNN-Extra, que tratavam do tema anteriormente. O art. 3º concedeu 90 dias, contados da publicação (ou seja, até 30/04/2026 — prazo já encerrado), para a serventia e a Entidade Credenciadora promoverem as adaptações necessárias, ficando assegurada a validade dos estoques e arranjos já existentes durante esse período, desde que compatíveis com as novas regras; o parágrafo único exige manter documentação apta a comprovar esses estoques para fins de fiscalização. Como o prazo de adequação já se encerrou, o cartório deve neste momento já ter revisado o fornecedor/credenciadora e a numeração sequencial — se ainda não fez essa verificação, é prioritário.",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 5º. Este Provimento entra em vigor na data de sua publicação." },
  prazos: [
    { descricao: "Adaptação de estoques, contratos e credenciamento às novas regras de papel de segurança", tipo: "dias_apos_publicacao", dias: 90, dataFixa: null, textoFonte: "Art. 3º: prazo de 90 dias contados da publicação para as adaptações necessárias." }
  ]
},
{
  id: 212, ano: 2026,
  dataAssinatura: "2026-02-20", dataPublicacaoDje: "2026-02-23",
  djeReferencia: "DJe/CNJ n. 40/2026, de 23/02/2026, p. 8",
  fonteVerificada: true,
  epigrafe: "Altera o §9º do art. 184-A do CNN-Extra — gratuidade das comunicações mensais à prefeitura sobre mudança de titularidade de imóveis.",
  areas: "Comunicações mensais (prefeitura)",
  observacoes: "Confirmar se atende a comunicação de registros translativos prevista pelo Decreto municipal SP n.º 55.196/2014, art. 32, II e pu, e Lei municipal de SP nº 11.154/1991.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6733",
  especialidades: ["RI"],
  responsaveis: ["Setor de comunicações / Escrituração RI", "Oficial"],
  resumo: "Torna gratuito (sem custas ou emolumentos) o envio de comunicações aos Municípios/DF sobre mudança de titularidade de imóveis. Não altera a periodicidade mensal já vigente — apenas veda a cobrança por esse serviço.",
  resumoAprofundado: "O Provimento CNJ 212/2026 (assinado em 20/02/2026, DJe/CNJ n. 40/2026 de 23/02/2026) dá nova redação ao §9º do art. 184-A do CNN-Extra: o fornecimento de informações aos Municípios e ao DF para atualização de cadastros de contribuintes passa a ser feito sem cobrança de custas ou emolumentos, eliminando uma antinomia com a gratuidade já prevista na Resolução CNJ 547/2024 (art. 4º, parágrafo único, com redação da Resolução 617/2025) e no art. 39 da Lei 6.830/1980. O ato não altera o caput do art. 184-A nem a periodicidade mensal da comunicação de registros translativos — cuida exclusivamente da gratuidade. Na prática, a partir de 23/02/2026 (data da própria publicação, já que o art. 2º fixa vigência imediata) o cartório deve confirmar que nenhuma taxa está sendo cobrada dos Municípios/DF por esse serviço, mantendo o restante do fluxo (inclusive a compatibilidade com o Decreto municipal SP nº 55.196/2014 e a Lei municipal SP nº 11.154/1991, quando aplicável) como já praticado.",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 2º. Este Provimento entra em vigor na data de sua publicação." },
  prazos: []
},
{
  id: 213, ano: 2026,
  dataAssinatura: "2026-02-20", dataPublicacaoDje: "2026-02-23",
  djeReferencia: "DJe/CNJ n. 40/2026, de 23/02/2026, p. 8-27",
  fonteVerificada: false,
  epigrafe: "Padrões mínimos de Tecnologia da Informação para serviços notariais e de registro. Alterado pelo Provimento CNJ 243/2026.",
  areas: "TI",
  observacoes: "Padrões mínimos de Tecnologia da Informação. Alterado pelo Provimento CNJ 243/2026.",
  situacao: "Alterado", classificacao: "AUTONOMO-PÓS-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6734",
  especialidades: ["TODAS"],
  responsaveis: ["TI / responsável técnico de sistemas"],
  resumo: "Fixa padrões mínimos de TI (autenticação multifator, criptografia AES-256, trilhas de auditoria, PCN/PRD, backup) por classe de serventia. Os prazos de enquadramento foram redefinidos pelo Provimento 243/2026 — ler os dois atos em conjunto.",
  resumoAprofundado: "O Provimento CNJ 213/2026 fixa padrões mínimos de tecnologia da informação para serviços notariais e de registro, revogando o Provimento nº 74/2018: exige autenticação multifator, criptografia AES-256 para dados em repouso, trilhas de auditoria com retenção mínima de 5 anos, comunicação de incidentes críticos em até 72 horas, planos de continuidade (PCN) e de recuperação de desastres (PRD), com declaração anual de conformidade no Sistema Justiça Aberta. As serventias são classificadas em 3 classes por receita bruta semestral. O Provimento CNJ 243/2026 alterou os arts. 20 e 21 e inseriu o art. 20-A deste ato para escalonar os prazos de implementação inicial contados da entrada em vigor do próprio 243/2026 — 180 dias (Classe 3), 240 dias (Classe 2) e 300 dias (Classe 1) — com implementação integral em até 24, 30 ou 36 meses, respectivamente, e possibilidade de prorrogação estadual limitada a 180 dias. Não foi possível confirmar, no trecho acessado da página oficial, o artigo literal de vigência do Provimento 213 isoladamente (o último dispositivo capturado trata apenas da revogação do Provimento 74/2018); por prática usual do CNJ, presume-se vigência imediata a partir da publicação (23/02/2026), mas recomenda-se confirmar no DJe oficial antes de calcular prazos com precisão. Como o cronograma de prazos concreto depende da vigência do Provimento 243/2026 (também não confirmada com segurança nesta pesquisa), o mais seguro é tratar o enquadramento de TI como pendente de confirmação de data-base junto à Corregedoria ou ao texto oficial do DJe.",
  vigencia: { tipo: "indeterminado", dias: null, dataFixa: null, textoFonte: "Artigo de vigência não localizado no trecho acessado da página oficial; presume-se vigência imediata (padrão dos atos do CNJ), mas não confirmado. Confira no DJe/CNJ n. 40/2026." },
  prazos: []
},
{
  id: 214, ano: 2026,
  dataAssinatura: "2026-02-26", dataPublicacaoDje: "2026-03-02",
  djeReferencia: "DJe/CNJ n. 46/2026, de 02/03/2026, p. 6-7",
  fonteVerificada: true,
  epigrafe: "Altera o CNN-Extra — inclui o art. 439-A, sobre averbação de extinção de cláusula resolutiva em títulos fundiários da União.",
  areas: "Exame e qualificação / Conferência + TI",
  observacoes: "Verificar orientação para exame de título com extinção de cláusula resolutiva; incluído artigo para atendimento ao Prov. CNJ 213/2026 (tecnologia da informação).",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6743",
  especialidades: ["RI"],
  responsaveis: ["Exame e qualificação de títulos", "TI"],
  resumo: "Inclui o art. 439-A no CNN-Extra, disciplinando a averbação de extinção de cláusula resolutiva em títulos fundiários da União (Lei 11.952/2009), exigindo 5 documentos específicos e limitando o registrador a exame formal, sem análise de mérito.",
  resumoAprofundado: "O Provimento CNJ 214/2026 (assinado em 26/02/2026, DJe/CNJ n. 46/2026 de 02/03/2026) inclui o art. 439-A no CNN-Extra para disciplinar a averbação de extinção de cláusula resolutiva em títulos fundiários oriundos de terras da União (com base na Lei 11.952/2009). Exige a apresentação de cinco documentos específicos — comprovação de adimplemento, CCIR, CAR, Certidão de Liberação do INCRA e certidão negativa de trabalho escravo — e limita o registrador a exame formal desses documentos, vedando análise de mérito (§3º). O ato também atualiza os arts. 88 e 206 do CNN-Extra, remetendo ao Provimento 213/2026 (padrões de TI). Não há prazo específico fixado em dias; a vigência é imediata a partir da publicação (art. 2º). Na prática, o setor de exame e qualificação deve incluir a checagem dos cinco documentos no fluxo de averbação de extinção de cláusula resolutiva em imóveis rurais da União, revisando o checklist de qualificação correspondente.",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 2º. Este Provimento entra em vigor na data de sua publicação." },
  prazos: []
},
{
  id: 215, ano: 2026,
  dataAssinatura: "2026-03-03", dataPublicacaoDje: "2026-03-05",
  djeReferencia: "DJe/CNJ n. 50/2026, p. 21-22",
  fonteVerificada: true,
  epigrafe: "Altera o Provimento 206/2025 e o CNN-Extra — publicidade e indexação, na CENSEC, de escrituras de autocuratela e diretivas de curatela.",
  areas: "NA",
  observacoes: "Aplicável ao tabelionato de notas.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6753",
  especialidades: ["TN"],
  responsaveis: ["Tabelião de Notas", "Escrevente de Notas"],
  resumo: "Disciplina o sigilo/publicidade e a indexação na CENSEC de escrituras de autocuratela e diretivas de curatela: atos exclusivos de autocuratela ficam sob sigilo; atos híbridos (combinados com outros negócios) não, e exigem replicação de dados na CENSEC.",
  resumoAprofundado: "O Provimento CNJ 215/2026 (assinado em 03/03/2026, DJe/CNJ n. 50/2026 de 05/03/2026) altera o Provimento 206/2025 e o CNN-Extra para disciplinar, no Tabelionato de Notas, a publicidade e a indexação na CENSEC de escrituras de autocuratela e de escrituras declaratórias com diretivas de curatela. A regra central: escrituras exclusivas de autocuratela permanecem sob sigilo (certidão de inteiro teor só ao próprio declarante ou por ordem judicial — art. 110-A); já em escrituras híbridas, que combinem autocuratela com outros atos, não se aplica esse sigilo, prevalecendo a publicidade do ato conjugado, e o tabelião deve replicar na CENSEC os dados essenciais da diretiva de curatela (cadastro autônomo apenas para indexação/busca, sem alterar a natureza jurídica do ato), inclusive para escrituras já lavradas antes da norma. Essa replicação é gratuita (art. 110-B, §3º); quando depender de requerimento da parte, o tabelião tem prazo improrrogável de 5 dias úteis para efetivá-la na CENSEC, sob pena de responsabilidade disciplinar (art. 110-B, §5º) — prazo esse condicionado ao requerimento, sem data-base fixa a monitorar de forma contínua. A vigência é imediata a partir da publicação (art. 3º). Na prática, o tabelionato deve revisar de imediato a triagem sigilo/publicidade dessas escrituras e o fluxo de alimentação da CENSEC.",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 3º. Este Provimento entra em vigor na data de sua publicação." },
  prazos: []
},
{
  id: 217, ano: 2026,
  dataAssinatura: "2026-03-09", dataPublicacaoDje: "2026-03-11",
  djeReferencia: "DJe/CNJ n. 58/2026, p. 29-30 (data confirmada por consistência com a assinatura; a página oficial registrou o ano com uma possível inconsistência de digitação)",
  fonteVerificada: true,
  epigrafe: "Altera o §2º do art. 320-I do CNN-Extra — averbação de indisponibilidade de bens com mudança de circunscrição registral (CNIB).",
  areas: "Indisponibilidade de bens",
  observacoes: "Verificar orientação para exame de ordem de indisponibilidade de bens com mudança de circunscrição.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6775",
  especialidades: ["RI"],
  responsaveis: ["Exame e qualificação / Prenotação"],
  resumo: "Fixa que, havendo matrícula aberta, a averbação de indisponibilidade segue a circunscrição do registro do imóvel mesmo após mudança territorial. Se o imóvel só tiver transcrição, exige certidão para abertura de matrícula na circunscrição correta antes da averbação.",
  resumoAprofundado: "O Provimento CNJ 217/2026 (assinado em 09/03/2026) altera o §2º do art. 320-I do CNN-Extra para disciplinar a averbação de indisponibilidade de bens imóveis quando há mudança de circunscrição registral (desmembramento, criação de comarca ou reorganização territorial), em harmonia com os arts. 169, I, e 176, §18, da Lei 6.015/1973. Havendo matrícula aberta, a averbação deve ser feita na circunscrição do registro vigente, mesmo que o imóvel tenha migrado de circunscrição; para imóveis ainda sob transcrição (regime pré-matrícula), o oficial deve encaminhar certidão ao registrador da circunscrição atual para abertura de matrícula e só então proceder à averbação — se a transcrição não reunir requisitos para essa abertura, a indisponibilidade permanece averbada na circunscrição de origem. Na prática, ao receber ordem de indisponibilidade via CNIB, o registrador não deve recusar o cumprimento apenas porque o imóvel consta de outra circunscrição no sistema atual: é preciso verificar matrícula vs. transcrição antes de decidir onde averbar. Vigência imediata a partir da publicação (art. 2º), sem prazo específico de adaptação.",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 2º. Este Provimento entra em vigor na data de sua publicação." },
  prazos: []
},
{
  id: 218, ano: 2026,
  dataAssinatura: "2026-03-13", dataPublicacaoDje: "2026-03-16",
  djeReferencia: "DJe/CNJ n. 62/2026, p. 7-8 (data confirmada por consistência com a assinatura; a página oficial registrou o ano com uma possível inconsistência de digitação)",
  fonteVerificada: true,
  epigrafe: "Altera o CNN-Extra (arts. 136 a 136-H) — Sistema Justiça Aberta. Revoga o Provimento 24/2012.",
  areas: "Oficial ou Substituto",
  observacoes: "Verificar procedimentos internos para atualização do Portal Justiça Aberta: (1) até o 15º dia útil do mês subsequente, atualizar e revisar os dados do portal; (2) informar semestralmente, até o 10º dia útil de janeiro e julho, os dados relativos à produtividade e arrecadação.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6329",
  especialidades: ["TODAS"],
  responsaveis: ["Oficial ou Substituto"],
  resumo: "Revoga o Provimento 24/2012 e regulamenta em detalhe o Sistema Justiça Aberta: alimentação mensal (até o 15º dia útil do mês subsequente) e envio semestral de dados de produtividade/arrecadação (até o 10º dia útil de janeiro e julho), com prorrogação automática se o prazo cair em fim de semana/feriado.",
  resumoAprofundado: "O Provimento CNJ 218/2026 (assinado em 13/03/2026) insere os arts. 136 a 136-H no CNN-Extra, revogando o Provimento 24/2012, para disciplinar o Sistema Justiça Aberta como banco de dados estratégico alimentado por notários e registradores, sujeito a padrões de atualidade, fidedignidade, exatidão, integridade, rastreabilidade e coerência sistêmica, com auditoria permanente. Na prática, a alimentação mensal deve ocorrer até o 15º dia útil do mês subsequente ao de referência, e o envio semestral dos dados quantitativos de produtividade e arrecadação até o 10º dia útil de janeiro e de julho — ambos os prazos com prorrogação automática para o próximo dia útil quando recaírem em sábado, domingo ou feriado (art. 136-A, §§1º e 2º). O ato também determina que as Corregedorias estaduais zelem pela correspondência dos dados com a realidade das delegações e que decisões sobre outorgas, vacâncias e intervenções sejam transcritas no Sistema. Vigência imediata a partir da publicação (art. 4º), sem período de transição — a rotina de atualização mensal e semestral já deve estar em curso desde 16/03/2026.",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 4.º Este Provimento entra em vigor na data de sua publicação." },
  prazos: [
    { descricao: "Alimentação mensal do Sistema Justiça Aberta", tipo: "recorrente_mensal", dias: null, dataFixa: null, textoFonte: "Art. 136-A, §1º, I: até o 15º dia útil do mês subsequente ao de referência." },
    { descricao: "Envio semestral de dados de produtividade e arrecadação", tipo: "recorrente_semestral", dias: null, dataFixa: null, textoFonte: "Art. 136-A, §1º, II: até o 10º dia útil de janeiro e de julho." }
  ]
},
{
  id: 219, ano: 2026,
  dataAssinatura: "2026-03-20", dataPublicacaoDje: "2026-03-23",
  djeReferencia: "DJe/CNJ n. 68/2026, p. 3-7",
  fonteVerificada: true,
  epigrafe: "Complementa a Resolução CNJ 80/2009 — gestão, atualização e publicidade da Relação Geral de Vacância (RGV) das serventias.",
  areas: "NA",
  observacoes: "Estabelece regras para a gestão, atualização e publicidade da relação geral de vacância das serventias extrajudiciais, e dá outras providências.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6806",
  especialidades: ["TODAS"],
  responsaveis: ["Oficial", "Administrativo"],
  resumo: "Disciplina a Relação Geral de Vacância (RGV) das serventias, com publicidade semestral (janeiro/julho) e regras de impugnação. Obrigação principal é dos Tribunais de Justiça; ao cartório cabe verificar se sua situação está corretamente refletida na RGV do seu tribunal.",
  resumoAprofundado: "O Provimento CNJ 219/2026 (assinado em 20/03/2026) complementa a Resolução CNJ 80/2009, disciplinando a gestão, atualização e publicidade da Relação Geral de Vacância (RGV) das serventias extrajudiciais — lista única, permanente, cronológica e infinita, mantida por unidade federativa como repositório público e centralizado. Institui o método dinâmico-sequencial de alternância entre provimento (2/3) e remoção (1/3), com publicidade semestral no primeiro dia de expediente forense de janeiro e julho e prazo de 15 dias para impugnação a contar do dia seguinte à publicação (art. 6º); regula também a Lista de Vagas para Escolha (LVEC), sujeita a impugnação em 10 dias (art. 7º). A obrigação de adequar a RGV ao novo modelo — e o prazo até 30/06/2026 para isso (já vencido) — é dos Tribunais de Justiça estaduais, não do cartório individualmente. Para a serventia, o que importa na prática é verificar periodicamente se sua situação de vacância (quando houver) está corretamente refletida na RGV publicada pelo tribunal correspondente, e acompanhar os prazos de impugnação caso identifique inconsistência. Vigência imediata a partir da publicação (art. 15).",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 15. Este Provimento entra em vigor na data de sua publicação." },
  prazos: []
},
{
  id: 220, ano: 2026,
  dataAssinatura: "2026-04-22", dataPublicacaoDje: "2026-04-23",
  djeReferencia: "DJe/CNJ n. 91/2026, de 23/04/2026, p. 53-59",
  fonteVerificada: true,
  epigrafe: "Disciplina o procedimento administrativo de aferição de incapacidade permanente de delegatário (art. 39, III, Lei 8.935/1994).",
  areas: "Oficial e ADM (somente ciência)",
  observacoes: "Ciência do procedimento.",
  situacao: "Vigente", classificacao: "AUTONOMO-PÓS-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6873",
  especialidades: ["TODAS"],
  responsaveis: ["Oficial", "Administrativo (ciência)"],
  resumo: "Disciplina, em nível nacional, o procedimento de aferição de incapacidade permanente do delegatário, com fase preliminar (perícia) e fase contraditória (prazo total de 45 dias, prorrogável por 30). Ato de ciência institucional — os prazos são do procedimento condução pela Corregedoria/CAC, não uma obrigação de rotina do cartório.",
  resumoAprofundado: "O Provimento CNJ 220/2026 (assinado em 22/04/2026) disciplina o procedimento administrativo de aferição de incapacidade permanente de delegatário notarial/registral (art. 39, III, Lei 8.935/1994), com natureza não disciplinar. Divide-se em fase preliminar técnico-inquisitória, conduzida por uma Comissão de Aferição de Capacidade (CAC), e fase contraditória, com prazo total de conclusão de 45 dias (prorrogável uma vez por 30). Cria a figura da 'ausência qualificada' — não localização do delegatário por 30 dias contínuos ou 45 interpolados no trimestre, ou 3 faltas a videoconferências — que permite julgamento por prova indireta em caso de recusa injustificada à perícia. Todos os prazos processuais detalhados no ato (perícia em 15 dias, manifestação em 5 dias, julgamento em 15 dias, recurso em 5 dias, entre outros) regem a condução do procedimento pela Corregedoria e pela CAC quando um caso é instaurado — não são obrigações de rotina do cartório. Para a serventia, o ato é essencialmente de ciência: o Oficial e o setor administrativo devem conhecer o procedimento (inclusive a possibilidade de afastamento cautelar com indicação de substituto em 24 horas), sem prazo próprio de adequação a cumprir enquanto não houver um procedimento instaurado. Vigência imediata a partir da publicação (art. 24).",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 24. Este provimento entra em vigor na data de sua publicação." },
  prazos: []
},
{
  id: 221, ano: 2026,
  dataAssinatura: "2026-04-22", dataPublicacaoDje: "2026-04-24",
  djeReferencia: "DJe/CNJ n. 92/2026, de 24/04/2026, p. 25-26",
  fonteVerificada: true,
  epigrafe: "Disciplina, no RCPN, a concessão de gratuidade de emolumentos a pessoas com insuficiência de recursos.",
  areas: "NA",
  observacoes: "Aplicável ao Registro Civil de Pessoas Naturais.",
  situacao: "Vigente", classificacao: "AUTONOMO-PÓS-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6875",
  especialidades: ["RCPN"],
  responsaveis: ["Oficial de Registro Civil"],
  resumo: "Disciplina a gratuidade de emolumentos no RCPN por declaração de hipossuficiência: exige cartaz informativo ao lado da tabela de emolumentos e padroniza o procedimento, inclusive quando o registrador suspeitar da veracidade da declaração (contestação em 15 dias, sem suspender o atendimento).",
  resumoAprofundado: "O Provimento CNJ 221/2026 (assinado em 22/04/2026) disciplina, no Registro Civil de Pessoas Naturais, o procedimento de concessão de gratuidade de emolumentos a pessoas com insuficiência de recursos. Exige que o registrador afixe cartaz informativo sobre as hipóteses de gratuidade e isenção ao lado da tabela de emolumentos (art. 1º, §2º); a gratuidade não cobre despesas postais, remessas ou diligências, nem se aplica a gratuidades já concedidas por decisão judicial. A concessão depende de declaração de hipossuficiência (física ou eletrônica), devendo o ato lavrado conter a expressão 'isento de emolumentos' (art. 2º). Se o registrador tiver fundadas razões para duvidar da veracidade da declaração, pode suscitar ao juízo competente pedido de indeferimento ou de substituição por parcelamento — nesse caso, o interessado é notificado para se manifestar em 15 dias (prazo condicional, só se aplica se houver contestação), mas o ato deve ser praticado de imediato, independentemente da definição sobre a gratuidade (art. 3º). Na prática, o RCPN deve atualizar seus cartazes de atendimento, padronizar o modelo de declaração de hipossuficiência e o registro da isenção nos atos. Vigência imediata a partir da publicação (art. 5º), sem período de adaptação.",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 5.º Este Provimento entra em vigor na data de sua publicação." },
  prazos: []
},
{
  id: 222, ano: 2026,
  dataAssinatura: "2026-04-24", dataPublicacaoDje: "2026-04-27",
  djeReferencia: "DJe/CNJ n. 93/2026, de 27/04/2026, p. 18-21",
  fonteVerificada: true,
  epigrafe: "Estabelece medidas de prevenção e enfrentamento à violência patrimonial contra a mulher nos serviços notariais e registrais.",
  areas: "ADM e treinamento interno",
  observacoes: "Medidas para a prevenção e o enfrentamento da violência patrimonial e de outras formas de violência contra a mulher, especialmente em situação de vulnerabilidade, no âmbito dos serviços notariais e de registro, e estabelece diretrizes para um atendimento humanizado, seguro e protetivo.",
  situacao: "Vigente", classificacao: "AUTONOMO-PÓS-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6882",
  especialidades: ["TODAS"],
  responsaveis: ["Administrativo", "RH / treinamento interno"],
  resumo: "Institui o dever das serventias de adotar medidas preventivas contra violência patrimonial (confirmação de estado civil, atendimento reservado em caso de suspeita, cautelas extras em atos eletrônicos/videoconferência), programa de capacitação continuada e dever de comunicação a autoridades.",
  resumoAprofundado: "O Provimento CNJ 222/2026 (assinado em 24/04/2026) institui o dever das serventias extrajudiciais de adotarem medidas preventivas contra violência patrimonial e outras formas de violência contra a mulher em situação de vulnerabilidade (art. 1º). Fixa obrigações operacionais concretas: confirmação da declaração de estado civil, exigência de comparecimento presencial e entrevista reservada em atendimento humanizado quando houver suspeita de coação ou vulnerabilidade (art. 2º), e cautelas adicionais para atos praticados eletronicamente ou por videoconferência, dado o maior risco de fraude/coação nesses casos (art. 3º). Determina a instituição de programa de capacitação e formação continuada para os cartórios, cabendo às Corregedorias estaduais organizar os cursos e definir periodicidade (art. 4º), sem fixar prazo numérico específico. Impõe também o dever de comunicar às autoridades competentes (Polícia, Ministério Público, Defensoria) quando identificados indícios de violência patrimonial (art. 5º). Não há prazo em dias para adequação — a exigência é de caráter permanente desde a vigência, que é imediata a partir da publicação (art. 8º). Na prática, recomenda-se já planejar o treinamento interno da equipe de atendimento e revisar o protocolo de entrevista reservada.",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 8º. Este Provimento entra em vigor na data de sua publicação." },
  prazos: []
},
{
  id: 223, ano: 2026,
  dataAssinatura: "2026-05-06", dataPublicacaoDje: "2026-05-08",
  djeReferencia: "DJe/CNJ n. 103/2026, p. 4-5",
  fonteVerificada: true,
  epigrafe: "Institui o Programa Nacional de Execução Efetiva (PNEE / LabExec) e o Banco Nacional de Penhoras.",
  areas: "NA",
  observacoes: "Somente ciência: institui o Programa Nacional de Execução Efetiva (PNEE), sob coordenação da Corregedoria Nacional de Justiça, com a finalidade de elevar a efetividade da execução judicial e extrajudicial (exceto fiscal e penal) mediante padronização nacional, modernização tecnológica, estruturas especializadas, integração de dados, incrementos para conciliação e cooperação judicial, e estímulos para a atuação de magistrados na execução.",
  situacao: "Vigente", classificacao: "HIBRIDO",
  url: "https://atos.cnj.jus.br/atos/detalhar/1340",
  especialidades: ["TODAS"],
  responsaveis: ["Oficial (ciência institucional)"],
  resumo: "Institui o Programa Nacional de Execução Efetiva (LabExec) e o Banco Nacional de Penhoras, com alimentação obrigatória pelos tribunais em prazo a ser fixado por Portaria futura. Ato de ciência institucional — sem ação imediata obrigatória para o cartório.",
  resumoAprofundado: "O Provimento CNJ 223/2026 (assinado em 06/05/2026) institui o Programa Nacional de Execução Efetiva (PNEE/LabExec), com diretrizes de padronização, modernização tecnológica e integração de dados para a execução judicial e extrajudicial, e cria o Laboratório de Inovação na Execução (LINE) como espaço de teste de soluções tecnológicas. Institui também o Banco Nacional de Penhoras, sistema de centralização de informações sobre bens constritos, com alimentação obrigatória por todos os tribunais conforme metadados a serem fixados por Portaria regulamentar futura da Corregedoria Nacional (art. 5º, §1º) — o próprio ato não fixa prazo numérico para essa obrigatoriedade. Cria um Comitê Gestor para coordenar a implementação. Para o cartório extrajudicial, o ato é essencialmente de ciência institucional: não há obrigação própria e imediata a cumprir, mas recomenda-se acompanhar a publicação da Portaria regulamentar que definirá prazos de integração ao Banco Nacional de Penhoras. Vigência imediata a partir da publicação (art. 8º).",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 8º Este Provimento entra em vigor na data de sua publicação." },
  prazos: []
},
{
  id: 224, ano: 2026,
  dataAssinatura: "2026-05-12", dataPublicacaoDje: "2026-05-15",
  djeReferencia: "DJe/CNJ n. 111/2026, p. 4-7",
  fonteVerificada: true,
  epigrafe: "Institui o Constrijud (arts. 320-X a 320-AN do CNN-Extra) — sistema eletrônico do ONR/SREI para ordens de penhora, arresto e sequestro.",
  areas: "Atendimento eletrônico + Exame e qualificação de títulos judiciais",
  observacoes: "Procedimento de monitoramento do sistema CONSTRIJUD, recepção e prenotação será implantado até o final de agosto/2026. Iniciando por penhoras, arrestos e sequestros. Ler o provimento.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/1002",
  especialidades: ["RI"],
  responsaveis: ["Atendimento eletrônico", "Exame e qualificação de títulos judiciais"],
  resumo: "Institui o Constrijud, canal eletrônico obrigatório para o Judiciário enviar ordens de penhora/arresto/sequestro aos RIs, integrado ao Serp. Implantação inicial em até 90 dias da publicação (13/08/2026). Enquanto isso, seguem valendo o Penhora On Line e o Malote Digital.",
  resumoAprofundado: "O Provimento CNJ 224/2026 (assinado em 12/05/2026) institui o Sistema de Constrição Judicial (Constrijud), novos arts. 320-X a 320-AN do CNN-Extra, integrado ao Serp e operado pelo ONR/SREI, como canal eletrônico para o Judiciário encaminhar ordens de penhora, arresto, sequestro, conversão de arresto em penhora e averbação premonitória aos registradores de imóveis. A implantação é gradual: começa pelas ordens de penhora/arresto/sequestro e, nos 90 dias seguintes à publicação — prazo que se esgota em 13/08/2026 —, pode expandir progressivamente por região/UF a critério do ONR (art. 2º); enquanto uma espécie de ordem não estiver disponível no sistema, seguem valendo o Penhora On Line ou o Malote Digital/Sistema Hermes (art. 3º). Os Tribunais têm 2 anos da vigência para adequar seus sistemas e operar por interoperabilidade via SERP (art. 4º) — prazo institucional, não do cartório. Internamente, o registrador deve verificar novas ordens no Constrijud em intervalos não superiores a 2 horas e processá-las (qualificação/registro) em até 10 dias úteis da prenotação. Vigência imediata a partir da publicação (art. 5º). Como o prazo de 90 dias da implantação inicial vence em 13/08/2026, é prioritário que o cartório já tenha o fluxo de atendimento eletrônico e prenotação via Constrijud pronto para operar.",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 5º. Este Provimento entra em vigor na data de sua publicação." },
  prazos: [
    { descricao: "Implantação inicial do Constrijud (penhoras, arrestos e sequestros), com possível expansão progressiva por região/UF", tipo: "dias_apos_publicacao", dias: 90, dataFixa: null, textoFonte: "Art. 2º: ao longo dos 90 dias seguintes à publicação, a plena disponibilização poderá ocorrer progressivamente." }
  ]
},
{
  id: 225, ano: 2026,
  dataAssinatura: "2026-05-20", dataPublicacaoDje: "2026-05-21",
  djeReferencia: "DJe/CNJ n. 117/2026, de 21/05/2026, p. 11-16",
  fonteVerificada: true,
  epigrafe: "Institui obrigações de alimentação da CENPROT e reporte periódico sobre decisões judiciais que impactem a publicidade de protestos.",
  areas: "NA",
  observacoes: "Aplicável ao Protesto.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/637",
  especialidades: ["TPLT"],
  responsaveis: ["Tabelião de Protesto"],
  resumo: "Cria obrigação de alimentar continuamente a CENPROT sobre decisões que suspendam/cancelem/restrinjam publicidade de protesto (litigância abusiva/predatória), com relatórios bimestrais às Corregedorias estaduais e quadrimestrais à Corregedoria Nacional.",
  resumoAprofundado: "O Provimento CNJ 225/2026 (assinado em 20/05/2026) entra em vigor imediatamente na data de publicação, sem período de transição. Para o Tabelionato de Protesto, cria a obrigação de alimentar continuamente a base de dados da CENPROT com informações estruturadas sobre decisões judiciais que determinem suspensão, cancelamento ou restrição de publicidade de protestos, classificando as situações como litigância abusiva, litigância predatória ou abuso de direito por credores (arts. 263-D e seguintes). O tabelionato deve operar com três camadas de dados (transacional, analítica pseudonimizada e pública agregada/anonimizada), restringindo a divulgação externa a dados agregados e anonimizados; é vedada qualquer antecipação de juízo de ilicitude sobre o protesto sem validação humana, e eventual bloqueio provisório de publicidade tem natureza cautelar, durando apenas o tempo necessário à apuração dos fatos (art. 263-D, §2º). Além da alimentação contínua, a serventia integra a cadeia de reporte que culmina em relatórios bimestrais às Corregedorias estaduais e quadrimestrais à Corregedoria Nacional, com comunicações extraordinárias em caso de impacto sistêmico (art. 263-H). Não há prazo de adaptação explícito — o tabelionato deve revisar desde já seus fluxos internos e a integração de sistemas com a CENPROT.",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 3º. Este Provimento entra em vigor na data de sua publicação." },
  prazos: [
    { descricao: "Relatório periódico à Corregedoria-Geral estadual sobre decisões que impactem publicidade de protestos", tipo: "recorrente_outro", dias: null, dataFixa: null, textoFonte: "Art. 263-H, §1º: encaminhamento bimestral." },
    { descricao: "Relatório consolidado à Corregedoria Nacional de Justiça", tipo: "recorrente_outro", dias: null, dataFixa: null, textoFonte: "Art. 263-H, §2º: envio quadrimestral." }
  ]
},
{
  id: 227, ano: 2026,
  dataAssinatura: "2026-06-09", dataPublicacaoDje: "2026-06-11",
  djeReferencia: "DJe/CNJ n. 133/2026, de 11/06/2026, p. 20-23",
  fonteVerificada: true,
  epigrafe: "Institui declarações anuais de solvência trabalhista dos delegatários, com fiscalização (arts. 4º, 13, 14, 16 e 18).",
  areas: "ADM + RH + Contabilidade",
  observacoes: "Verificar procedimentos para envio das declarações de passivos trabalhistas e de solvência trabalhista. 1ª comunicação até 11/09/2026; demais, anualmente até 31/03.",
  situacao: "Vigente", classificacao: "AUTONOMO-PÓS-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/1384",
  especialidades: ["TODAS"],
  responsaveis: ["Administrativo", "RH", "Contabilidade"],
  resumo: "Institui declarações anuais de solvência trabalhista dos delegatários, com fiscalização. Vigência 60 dias após a publicação (10/08/2026, já em vigor). Primeira declaração (regra de transição) até 30 dias da vigência (art. 18); demais, anualmente até 31/03.",
  resumoAprofundado: "O Provimento CNJ 227/2026 (assinado em 09/06/2026, DJe/CNJ n. 133/2026 de 11/06/2026) institui a exigência de declaração anual de solvência trabalhista dos delegatários, com fiscalização pelas Corregedorias. O art. 4º fixa o prazo padrão de envio até 31 de março de cada ano; o art. 18 concede, para o primeiro ano de vigência, prazo de 30 dias contados da entrada em vigor do ato para a declaração inicial. O art. 13 disciplina a regularização de eventual déficit de garantias ou cobertura em 60 dias, com renovação de garantias exigida com antecedência mínima de 30 dias do vencimento (art. 13, §2º); o art. 14 exige comunicação em até 30 dias de qualquer alienação ou oneração patrimonial relevante do delegatário; e o art. 16, §2º, garante 15 dias de prazo para manifestação antes de instauração de regime especial de acompanhamento. O art. 20 estabelece vigência diferida de 60 dias após a publicação — ou seja, aproximadamente 10/08/2026, data já alcançada, de modo que o Provimento está em vigor. Com base na vigência em ~10/08/2026, a primeira declaração (art. 18) vence por volta de 09/09/2026; a planilha de auditoria interna registra o prazo já apurado com a Corregedoria local como 11/09/2026, que deve prevalecer como referência operacional. Recomenda-se que ADM, RH e Contabilidade já estejam organizando a coleta de dados de passivos trabalhistas para cumprir esse primeiro envio, e programando o envio anual subsequente até 31/03 de cada ano.",
  vigencia: { tipo: "dias_apos_publicacao", dias: 60, dataFixa: null, textoFonte: "Art. 20. Este Provimento entra em vigor após decorridos 60 (sessenta) dias da sua publicação." },
  prazos: [
    { descricao: "1ª declaração de solvência trabalhista (regra de transição)", tipo: "data_fixa", dias: null, dataFixa: "2026-09-11", textoFonte: "Art. 18: 30 dias contados da entrada em vigor, para a primeira declaração — referência operacional apurada: 11/09/2026." },
    { descricao: "Declarações anuais subsequentes de solvência trabalhista", tipo: "recorrente_anual", dias: null, dataFixa: "03-31", textoFonte: "Art. 4º: até 31 de março de cada ano." }
  ]
},
{
  id: 228, ano: 2026,
  dataAssinatura: "2026-06-16", dataPublicacaoDje: "2026-06-18",
  djeReferencia: "DJe/CNJ n. 140/2026, p. 8-13",
  fonteVerificada: true,
  epigrafe: "Regulamenta, no Registro de Imóveis, a utilização de extratos eletrônicos estruturados para registro ou averbação.",
  areas: "Todas as áreas do processo de registro e averbação",
  observacoes: "Regulamenta, no âmbito do Registro de Imóveis, a utilização dos extratos eletrônicos para registro ou averbação de fatos, atos e negócios jurídicos com repercussão imobiliária.",
  situacao: "Vigente", classificacao: "AUTONOMO-PÓS-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6929",
  especialidades: ["RI"],
  responsaveis: ["Exame e qualificação", "Prenotação", "Escrituração"],
  resumo: "Cria fluxo de extratos eletrônicos estruturados para registro/averbação no RI. O ONR tem até 4 meses da publicação (~18/10/2026) para liberar ambiente/especificações; a partir daí, o cartório tem 6 meses para adequar seus sistemas. Implantação completa em até 3 anos, por ordem de prioridade (SFH, agronegócio, escrituras públicas).",
  resumoAprofundado: "O Provimento CNJ 228/2026 (assinado em 16/06/2026) regulamenta, no Registro de Imóveis, a utilização de extratos eletrônicos estruturados para registro ou averbação de fatos, atos e negócios jurídicos com repercussão imobiliária — um fluxo digital que substitui, em parte, a apresentação de instrumentos tradicionais. Embora entre em vigor imediatamente na publicação (art. 6º), a aplicação prática é escalonada: o ONR tem até 4 meses da publicação (art. 3º) — ou seja, até aproximadamente 18/10/2026 — para disponibilizar ambiente de produção, especificações técnicas definitivas e manuais operacionais; só a partir dessa disponibilização os cartórios terão 6 meses (parágrafo único do art. 3º) para adequar seus sistemas internos ao processamento dos extratos estruturados. A implantação massiva será gradual, com prazo máximo de 3 anos, seguindo ordem de prioridade que começa pelos contratos do Sistema Financeiro da Habitação, avança para títulos do agronegócio e, por fim, escrituras públicas (art. 4º), cabendo ao ONR normatizar o cronograma detalhado por Instrução Técnica de Normalização. As Corregedorias estaduais devem revogar ou adaptar normas locais conflitantes (art. 5º). Na prática, o registrador deve monitorar as publicações do ONR (esperadas por volta de outubro/2026) para saber quando o prazo de 6 meses de adequação de sistemas começa a correr.",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 6º. Este Provimento entra em vigor na data da sua publicação." },
  prazos: [
    { descricao: "ONR disponibiliza ambiente de produção, especificações técnicas e manuais operacionais", tipo: "outro", dias: null, dataFixa: "2026-10-18", textoFonte: "Art. 3º: prazo máximo de 4 meses contado da publicação (obrigação do ONR, não do cartório)." },
    { descricao: "Cartório adequa seus sistemas internos aos extratos eletrônicos estruturados (a contar da disponibilização do ONR — data estimada)", tipo: "outro", dias: null, dataFixa: "2027-04-18", textoFonte: "Art. 3º, parágrafo único: 6 meses a contar da disponibilização do ambiente pelo ONR (data estimada, sujeita a confirmação)." }
  ]
},
{
  id: 229, ano: 2026,
  dataAssinatura: "2026-06-16", dataPublicacaoDje: "2026-06-19",
  djeReferencia: "DJe/CNJ n. 141/2026, de 19/06/2026, p. 23-29",
  fonteVerificada: true,
  epigrafe: "Reestrutura o ecossistema do Serp: marca única \"Meu Registro\", Número Registral nacional e interoperabilidade entre serventias.",
  areas: "Oficial e Substitutos",
  observacoes: "Ciência: o Sistema Eletrônico dos Registros Públicos (Serp), preservada sua denominação legal e técnica, adotará, para fins de interface com o usuário, comunicação institucional e identidade de marca, a denominação “Meu Registro”. É obrigatória a adesão, o acesso e o monitoramento operacional diário dos oficiais às plataformas do Serp e de seus Operadores Nacionais. A implantação ocorrerá de forma progressiva, mediante fases-piloto, ambientes de homologação, publicação de ITNs, início por serviços prioritários e ampliação gradual para outras especialidades.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/1423",
  especialidades: ["TODAS"],
  responsaveis: ["Oficial e Substitutos"],
  resumo: "Institui a marca única \"Meu Registro\" para o Serp, cria o Número Registral nacional e a interoperabilidade entre serventias. Torna obrigatória a adesão e o monitoramento diário dos oficiais às plataformas do Serp. Cronograma detalhado depende de Instruções Técnicas de Normalização futuras.",
  resumoAprofundado: "O Provimento CNJ 229/2026 (assinado em 16/06/2026) reestrutura o ecossistema do Sistema Eletrônico dos Registros Públicos (Serp): institui a identidade de marca e interface única 'Meu Registro' (art. 228-K), cria o Número Registral único de abrangência nacional (art. 228-O), disciplina a interoperabilidade horizontal entre serventias (arts. 228-T a 228-Z) e cria mecanismo de inspeção remota para as Corregedorias (art. 228-S), além de regras sobre fluxos de pagamento e emolumentos no ambiente eletrônico. Torna obrigatória a adesão, o acesso e o monitoramento operacional diário dos oficiais às plataformas do Serp e de seus Operadores Nacionais. A implantação é progressiva — fases-piloto, ambientes de homologação, início por serviços prioritários e ampliação gradual — com cronogramas e prazos operacionais a serem fixados por Instruções Técnicas de Normalização (ITNs) futuras (art. 228-AD, §2º); o próprio Provimento não fixa datas específicas de cronograma. Vigência imediata a partir da publicação (art. 4º). Na prática, o Oficial deve acompanhar as ITNs conforme forem publicadas e garantir o acesso diário às plataformas do Serp já a partir de agora, já que essa obrigação de monitoramento não depende do cronograma de implantação por fases.",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 4º Este Provimento entra em vigor na data de sua publicação." },
  prazos: []
},
{
  id: 237, ano: 2026,
  dataAssinatura: "2026-07-13", dataPublicacaoDje: "2026-07-14",
  djeReferencia: "DJe/CNJ n. 165/2026, p. 12-13",
  fonteVerificada: true,
  epigrafe: "Altera o art. 473 do CNN-Extra — codificação de acervo nas certidões do RCPN, e o art. 513, III (comprovação de união estável para reprodução assistida).",
  areas: "NA",
  observacoes: "Aplicável ao Registro Civil de Pessoas Naturais. Padrões de numeração da matrícula, de inserção obrigatória nas certidões (primeira e demais vias) emitidas pelos Cartórios de Registro Civil das Pessoas Naturais.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/942",
  especialidades: ["RCPN"],
  responsaveis: ["Escrituração de certidões (RCPN)"],
  resumo: "Padroniza a codificação de acervo (código \"01\" = acervo próprio; \"02\" em diante = acervos incorporados) na numeração de matrícula do RCPN. Também amplia os documentos aceitos para comprovar união estável em reprodução assistida.",
  resumoAprofundado: "O Provimento CNJ 237/2026 (assinado em 13/07/2026) altera o art. 473 do CNN-Extra, que trata da estrutura da matrícula (CNS + código de acervo), para uniformizar a identificação de certidões de acervos incorporados no RCPN: o código de acervo '01' passa a designar sempre o acervo próprio da serventia, e os demais números (02 em diante) os acervos incorporados de outras unidades extintas, desativadas ou fracionadas. Há regra de transição: incorporações até 31/12/2009 usam o CNS da incorporadora (§3º); a partir de 01/01/2010, mantém-se o CNS da serventia originária (§4º); em caso de fracionamento entre serventias sucessoras, cada uma emite certidões com seu próprio CNS e código de acervo '02' (§5º). Isso exige que o RCPN revise seus sistemas e modelos de certidão para garantir que a numeração de matrícula reflita corretamente a origem do acervo, evitando duplicidade (§1º). O ato também altera o art. 513, III, ampliando os documentos aceitos para comprovar situação conjugal em procedimentos de reprodução assistida (certidão de casamento, certidão de conversão de união estável em casamento, escritura pública de união estável ou sentença de reconhecimento de união estável). Vigência imediata a partir da publicação (art. 2º), sem prazo de transição.",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 2º Este Provimento entra em vigor na data de sua publicação." },
  prazos: []
},
{
  id: 240, ano: 2026,
  dataAssinatura: "2026-07-16", dataPublicacaoDje: "2026-07-17",
  djeReferencia: "DJe/CNJ n. 168/2026, p. 9-11",
  fonteVerificada: true,
  epigrafe: "Altera o CNN-Extra e o CNN-Jud — registro, averbação e tramitação eletrônica de mandados de adoção (arts. 511-E e 21-A).",
  areas: "NA",
  observacoes: "Aplicável ao Registro Civil de Pessoas Naturais.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/2001",
  especialidades: ["RCPN"],
  responsaveis: ["Oficial de Registro Civil"],
  resumo: "Padroniza a tramitação eletrônica de mandados de adoção: menores via SNA, maiores via SERP, com prazo de 5 dias úteis para encaminhamento ao cartório. Vigência diferida — entra em vigor em 15/09/2026 (60 dias após a publicação).",
  resumoAprofundado: "O Provimento CNJ 240/2026 (assinado em 16/07/2026) altera o CNN-Extra e o CNN-Jud para padronizar o registro, a averbação e a tramitação eletrônica dos mandados judiciais de adoção. Para adoção de crianças e adolescentes, o RCPN deve cancelar o registro de nascimento primitivo e lavrar novo assento, refletindo a nova filiação e o novo nome do adotado; para adoção de pessoas maiores de idade, exige-se apenas a averbação no registro original, preservando o CPF já vinculado. A comunicação e expedição dos mandados passa a ocorrer eletronicamente — pelo SNA (Sistema Nacional de Adoção) nos casos de menores e pelo SERP nos casos de maiores —, com prazo de até 5 dias úteis contados da expedição para o encaminhamento ao cartório competente (arts. 511-E e 21-A); esse prazo de 5 dias é condicional (só corre quando há um mandado em trâmite), não uma data-base fixa a monitorar continuamente. O ponto de maior atenção é o art. 3º: diferentemente da maioria dos atos recentes do CNJ, este Provimento NÃO entra em vigor na data da publicação — a vigência é diferida para 60 dias após a publicação (17/07/2026), ou seja, 15/09/2026. Até essa data, o cartório deve revisar seus fluxos internos de recepção de mandados eletrônicos e capacitar a equipe para diferenciar o procedimento (cancelamento/novo assento vs. mera averbação) conforme a idade do adotado.",
  vigencia: { tipo: "dias_apos_publicacao", dias: 60, dataFixa: null, textoFonte: "Art. 3º. Este Provimento entra em vigor 60 (sessenta) dias após a data de sua publicação." },
  prazos: []
},
{
  id: 242, ano: 2026,
  dataAssinatura: "2026-07-21", dataPublicacaoDje: "2026-07-23",
  djeReferencia: "DJe/CNJ n. 172/2026, p. 8-18",
  fonteVerificada: true,
  epigrafe: "Institui a base nacional do RTDPJ e os identificadores NNP (Número Nacional de Protocolo) e MN-RTDPJ (Matrícula Nacional do RTDPJ).",
  areas: "NA",
  observacoes: "Aplicável ao Registro de Títulos e Documentos e Civil das Pessoas Jurídicas.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/1111",
  especialidades: ["RTDPJ"],
  responsaveis: ["Oficial de RTDPJ"],
  resumo: "Cria o NNP e a MN-RTDPJ, identificadores nacionais para o RTDPJ. O ON-RTDPJ tem até 4 meses da publicação (~23/11/2026) para disponibilizar o ambiente; depois disso, o cartório tem 6 meses para adequação, com prazos adicionais de 180 a 300 dias conforme a classe da unidade.",
  resumoAprofundado: "O Provimento CNJ 242/2026 (assinado em 21/07/2026) institui a base nacional do RTDPJ e cria dois identificadores centrais: o NNP (Número Nacional de Protocolo), gerado automaticamente no protocolo do título para certificar data/hora e prioridade do ato, validado por dígito verificador em Módulo 97; e a MN-RTDPJ (Matrícula Nacional do RTDPJ), chave identificadora de cada ato registral, destinada a assegurar unicidade e rastreabilidade nacional. Na prática, os ofícios de RTDPJ devem aguardar a disponibilização do ambiente de produção, especificações técnicas e manuais pelo ON-RTDPJ — prazo de até 4 meses após a publicação, ou seja, até aproximadamente 23/11/2026 (art. 2º) — e, a partir daí, terão 6 meses para adequar seus sistemas internos, com implantação integral do NNP em prazo adicional conforme cronograma oficial (art. 2º, §§1º e 2º). Também haverá migração retroativa de acervo: o primeiro lote cobre atos de 01/01/2020 até a data de publicação, com lotes subsequentes organizados em períodos de 5 anos (art. 5º), e o ato exige mecanismo eletrônico de validação com vigência mínima de 1 ano a partir da entrada em vigor (art. 4º). Há prazos diferenciados de adaptação por classe de unidade — 180, 240 e 300 dias, respectivamente para Classe 3, 2 e 1 (art. 6º) — contados da entrada em vigor do próprio Provimento (imediata, art. 14). Como as obrigações operacionais concretas dependem da disponibilização futura do ON-RTDPJ, recomenda-se já mapear a classe da unidade e o acervo elegível para os lotes de migração.",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 14. Este Provimento entra em vigor na data de sua publicação." },
  prazos: [
    { descricao: "ON-RTDPJ disponibiliza ambiente de produção, especificações técnicas e manuais operacionais", tipo: "outro", dias: null, dataFixa: "2026-11-23", textoFonte: "Art. 2º: prazo máximo de 4 meses contado da publicação (obrigação do ON-RTDPJ, não do cartório)." },
    { descricao: "Prazo de adaptação/migração — unidades Classe 3 (menor movimento)", tipo: "dias_apos_vigencia", dias: 180, dataFixa: null, textoFonte: "Art. 6º: 180 dias contados da entrada em vigor, para Classe 3." },
    { descricao: "Prazo de adaptação/migração — unidades Classe 2", tipo: "dias_apos_vigencia", dias: 240, dataFixa: null, textoFonte: "Art. 6º: 240 dias contados da entrada em vigor, para Classe 2." },
    { descricao: "Prazo de adaptação/migração — unidades Classe 1 (maior movimento)", tipo: "dias_apos_vigencia", dias: 300, dataFixa: null, textoFonte: "Art. 6º: 300 dias contados da entrada em vigor, para Classe 1." }
  ]
},
{
  id: 243, ano: 2026,
  dataAssinatura: "2026-07-21", dataPublicacaoDje: null,
  djeReferencia: null,
  fonteVerificada: false,
  epigrafe: "Altera o Provimento CNJ 213/2026 — redefine classes de serventia e reescalona os prazos de enquadramento aos padrões mínimos de TI.",
  areas: "TI",
  observacoes: "Alterador do Provimento CNJ 213/2026, que dispõe sobre padrões mínimos de Tecnologia da Informação.",
  situacao: "Vigente", classificacao: "EXTRA-PÓS-CNN",
  url: "https://atos.cnj.jus.br/atos/detalhar/6936",
  especialidades: ["TODAS"],
  responsaveis: ["TI / responsável técnico de sistemas"],
  resumo: "Altera o Provimento 213/2026: redefine as classes de serventia por receita e reescalona os prazos de enquadramento de TI (180/240/300 dias por classe, contados da vigência deste ato). ⚠ Não foi possível confirmar com segurança a data de publicação/vigência deste ato específico — verifique diretamente no DJe antes de contar os prazos.",
  resumoAprofundado: "O Provimento CNJ 243/2026 altera os arts. 20 e 21 do Provimento CNJ 213/2026 e insere o art. 20-A, redefinindo os critérios de classificação das serventias por receita bruta semestral (Classe 1 até R$300 mil; Classe 2 de R$300 mil a R$1,5 milhão; Classe 3 acima de R$1,5 milhão) e reescalonando os prazos de implementação inicial dos padrões mínimos de TI: 180 dias (Classe 3), 240 dias (Classe 2) e 300 dias (Classe 1), contados da entrada em vigor deste próprio Provimento 243, com implementação integral em até 24, 30 ou 36 meses respectivamente, e possibilidade de prorrogação estadual limitada a 180 dias no total (art. 21, §3º). Insere ainda o art. 20-A, com regime de transição excepcional para serventias sem solução de mercado disponível ou com custo desproporcional, exceto para requisitos de backup, integridade, autenticação e controle de acesso. Esses achados foram corroborados de forma consistente na leitura do texto consolidado do Provimento 213/2026 (que já reflete as alterações do 243). Porém, não foi possível confirmar com segurança, a partir da página oficial do próprio Provimento 243, a data exata de assinatura/publicação no DJe nem o texto literal do seu próprio artigo de vigência — a pesquisa automatizada retornou resultados inconsistentes entre tentativas para esta página específica. Por isso, os prazos de 180/240/300 dias (que dependem da data de entrada em vigor deste ato) não puderam ser convertidos em datas-calendário confiáveis. Recomenda-se fortemente verificar o texto oficial do Provimento 243/2026 diretamente no site do CNJ ou no DJe antes de usar qualquer data derivada dele para fins de conformidade.",
  vigencia: { tipo: "indeterminado", dias: null, dataFixa: null, textoFonte: "Não foi possível confirmar o artigo de vigência deste ato com segurança nesta pesquisa automatizada. Verifique o DJe oficial." },
  prazos: []
},
{
  id: 246, ano: 2026,
  dataAssinatura: "2026-07-28", dataPublicacaoDje: "2026-08-03",
  djeReferencia: "DJe/CNJ n. 181/2026, de 03/08/2026, p. 5-6",
  fonteVerificada: true,
  epigrafe: "Altera o art. 440-AO do CNN-Extra — alienação fiduciária por instrumento particular fora do SFI (adequação ao MS 39.930/DF, STF).",
  areas: "Exame e qualificação / Conferência — Alienação Fiduciária",
  observacoes: "Verificar orientação para exame de títulos que envolvam a constituição, transferência, modificação ou renúncia de alienação fiduciária.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/3274",
  especialidades: ["RI"],
  responsaveis: ["Exame e qualificação — Conferência de Alienação Fiduciária"],
  resumo: "Permite constituir alienação fiduciária por instrumento particular com efeitos de escritura pública mesmo fora do SFI. O registrador não pode recusar o registro apenas por nenhuma das partes integrar o SFI — deve focar no exame formal/material do instrumento.",
  resumoAprofundado: "O Provimento CNJ 246/2026 (assinado em 28/07/2026, DJe/CNJ n. 181/2026 de 03/08/2026) altera o art. 440-AO do CNN-Extra para adequar a atuação registral à decisão do STF no MS 39.930/DF (julgado em 13/12/2024, rel. Min. Gilmar Mendes), que reconheceu a validade de instrumentos particulares com efeitos de escritura pública para alienação fiduciária de imóveis (Lei 9.514/1997) fora do Sistema de Financiamento Imobiliário (SFI). A alteração permite que tais atos sejam celebrados por escritura pública ou por instrumento particular com efeitos de escritura pública, independentemente de os contratantes integrarem o SFI, estendendo essa faculdade a pessoas físicas e jurídicas fora do SFI (§1º). Para o exame e qualificação, o registrador deve fazer estrita verificação dos requisitos formais e materiais de validade do instrumento (§2º), mas não pode recusar o registro sob o único fundamento de que nenhuma parte integra o SFI (§3º) — essa ausência de vinculação ao SFI não é, por si só, motivo de exigência ou devolução. Na prática, o setor de exame e qualificação deve focar a qualificação nos requisitos materiais e formais do negócio fiduciário (capacidade das partes, descrição do imóvel, valor da dívida, condições de vencimento, cláusulas obrigatórias da Lei 9.514/1997), revisando o checklist correspondente. Vigência imediata a partir da publicação (art. 3º), sem prazo de adaptação.",
  vigencia: { tipo: "imediata", dias: null, dataFixa: null, textoFonte: "Art. 3º: \"Este Provimento entra em vigor na data de sua publicação, revogadas as disposições em contrário.\"" },
  prazos: []
}
];
