/* ============================================================
   Monitor de Provimentos CNJ — dados
   Fonte: planilha "Provimentos - Auditoria" (22 provimentos, 2026)
   Campos originais da planilha: N., Ano, Data, Epígrafe, Áreas
   envolvidas, Recomendações/Observações, Situação, Classificação, URL.
   Campos "especialidades", "resumo" e "responsaveis" são leitura
   analítica elaborada a partir do texto da própria planilha, para
   facilitar a triagem interna do cartório — não substituem a leitura
   do ato normativo na íntegra.
   ============================================================ */

const ESPECIALIDADES = {
  TODAS:  "Todas",
  RI:     "Registro de Imóveis",
  RCPN:   "Registro Civil de Pessoas Naturais",
  TN:     "Tabelionato de Notas",
  TPLT:   "Tabelionato de Protesto de Títulos",
  RTDPJ:  "Registro de Títulos e Documentos e Civil das Pessoas Jurídicas"
};

const STATUS_ADEQUACAO = [
  { valor: "nao_avaliado",   rotulo: "Não avaliado" },
  { valor: "adequado",       rotulo: "Adequado" },
  { valor: "parcial",        rotulo: "Parcialmente adequado" },
  { valor: "andamento",      rotulo: "Em andamento" },
  { valor: "nao_adequado",   rotulo: "Não adequado" },
  { valor: "nao_aplicavel",  rotulo: "Não aplicável" }
];

const PROVIMENTOS = [
{
  id: 211, data: "2026-01-28",
  epigrafe: "Altera CNN-Extra — dispõe sobre o uso de papéis de segurança pela serventia.",
  areas: "Certidão",
  observacoes: "Confirmar se serventia ainda faz uso de papel de segurança para emissão de certidões. Em caso positivo, fazer a leitura do ato normativo e confirmar procedimento interno.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6649",
  especialidades: ["TODAS"],
  responsaveis: ["Escrituração de certidões", "Oficial"],
  resumo: "Verificar se a serventia ainda utiliza papel de segurança para emissão de certidões. Em caso positivo, ler o ato na íntegra e revisar o procedimento interno de emissão.",
  prazo: null
},
{
  id: 212, data: "2026-02-20",
  epigrafe: "Altera o CNN-Extra — altera §9º do art. 184-A do Código de Normas sobre dispensa de custas e emolumentos para envio mensal (até o último dia útil do mês subsequente) de comunicações à prefeitura sobre mudança de titularidade de imóveis realizadas no mês anterior.",
  areas: "Comunicações mensais (prefeitura)",
  observacoes: "Confirmar se atende a comunicação de registros translativos prevista pelo Decreto municipal SP n.º 55.196/2014, art. 32, II e pu, e Lei municipal de SP nº 11.154/1991.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6733",
  especialidades: ["RI"],
  responsaveis: ["Setor de comunicações / Escrituração RI", "Oficial"],
  resumo: "Passa a ser exigido o envio mensal (até o último dia útil do mês subsequente) de comunicações à prefeitura sobre mudanças de titularidade de imóveis, com dispensa de custas e emolumentos. Confirmar se o procedimento atual do cartório também atende ao Decreto municipal SP nº 55.196/2014 (art. 32, II) e à Lei municipal SP nº 11.154/1991.",
  prazo: "Envio mensal, até o último dia útil do mês subsequente."
},
{
  id: 213, data: "2026-02-20",
  epigrafe: "Padrões mínimos de Tecnologia da Informação. Alterado pelo Provimento CNJ 243/2026.",
  areas: "TI",
  observacoes: "Padrões mínimos de Tecnologia da Informação. Alterado pelo Provimento CNJ 243/2026.",
  situacao: "Alterado", classificacao: "AUTONOMO-PÓS-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6734",
  especialidades: ["TODAS"],
  responsaveis: ["TI / responsável técnico de sistemas"],
  resumo: "Fixa padrões mínimos de Tecnologia da Informação para as serventias. Já foi alterado pelo Provimento CNJ 243/2026 (que ajustou enquadramento e prazos) — ler os dois atos em conjunto e revisar a infraestrutura de TI do cartório frente aos padrões exigidos.",
  prazo: null
},
{
  id: 214, data: "2026-02-26",
  epigrafe: "Altera o CNN-Extra (cláusulas resolutivas + TIC)",
  areas: "Exame e qualificação / Conferência + TI",
  observacoes: "Verificar orientação para exame de título com extinção de cláusula resolutiva; incluído artigo para atendimento ao Prov. CNJ 213/2026 (tecnologia da informação).",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6743",
  especialidades: ["RI"],
  responsaveis: ["Exame e qualificação de títulos", "TI"],
  resumo: "Altera a orientação para exame de títulos com extinção de cláusula resolutiva e inclui dispositivo de conexão com o Provimento CNJ 213/2026 (TI). Revisar o checklist de qualificação de títulos com cláusula resolutiva.",
  prazo: null
},
{
  id: 215, data: "2026-03-03",
  epigrafe: "Altera o CNN-Extra — disciplina a publicidade e a indexação de escrituras de autocuratela e diretivas de curatela",
  areas: "NA",
  observacoes: "Aplicável ao tabelionato de notas.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6753",
  especialidades: ["TN"],
  responsaveis: ["Tabelião de Notas", "Escrevente de Notas"],
  resumo: "Disciplina a publicidade e a indexação de escrituras de autocuratela e diretivas de curatela. Aplicável ao Tabelionato de Notas — revisar a rotina de lavratura, publicidade e indexação desses instrumentos.",
  prazo: null
},
{
  id: 217, data: "2026-03-09",
  epigrafe: "Altera o CNN-Extra (CNIB — circunscrição)",
  areas: "Indisponibilidade de bens",
  observacoes: "Verificar orientação para exame de ordem de indisponibilidade de bens com mudança de circunscrição.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6775",
  especialidades: ["RI"],
  responsaveis: ["Exame e qualificação / Prenotação"],
  resumo: "Altera regras da Central Nacional de Indisponibilidade de Bens (CNIB) para casos de mudança de circunscrição. Revisar o procedimento de exame de ordens de indisponibilidade de bens quando houver alteração de circunscrição.",
  prazo: null
},
{
  id: 218, data: "2026-03-13",
  epigrafe: "Altera o CNN-Extra (CNS, Justiça Aberta — revoga 24/2012)",
  areas: "Oficial ou Substituto",
  observacoes: "Verificar procedimentos internos para atualização do Portal Justiça Aberta: (1) até o 15º dia útil do mês subsequente, atualizar e revisar os dados do portal; (2) informar semestralmente, até o 10º dia útil de janeiro e julho, os dados relativos à produtividade e arrecadação.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6329",
  especialidades: ["TODAS"],
  responsaveis: ["Oficial ou Substituto"],
  resumo: "Revoga o Provimento 24/2012 e ajusta as regras do Portal Justiça Aberta (CNS). Atualizar e revisar os dados do portal até o 15º dia útil do mês subsequente, e informar semestralmente (até o 10º dia útil de janeiro e julho) os dados de produtividade e arrecadação.",
  prazo: "Mensal (15º dia útil) + semestral (10º dia útil de jan. e jul.)."
},
{
  id: 219, data: "2026-03-20",
  epigrafe: "Altera o CNN-Extra — vacâncias",
  areas: "NA",
  observacoes: "Estabelece regras para a gestão, atualização e publicidade da relação geral de vacância das serventias extrajudiciais, e dá outras providências.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6806",
  especialidades: ["TODAS"],
  responsaveis: ["Oficial", "Administrativo"],
  resumo: "Estabelece regras para a gestão, atualização e publicidade da relação geral de vacância das serventias extrajudiciais. Verificar se o cartório mantém a relação atualizada e publicada conforme exigido.",
  prazo: null
},
{
  id: 220, data: "2026-04-22",
  epigrafe: "Incapacidade permanente de delegatário",
  areas: "Oficial e ADM (somente ciência)",
  observacoes: "Ciência do procedimento.",
  situacao: "Vigente", classificacao: "AUTONOMO-PÓS-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6873",
  especialidades: ["TODAS"],
  responsaveis: ["Oficial", "Administrativo (ciência)"],
  resumo: "Disciplina o procedimento em caso de incapacidade permanente do delegatário. Ato apenas de ciência — não exige ação imediata, mas o Oficial e o setor administrativo devem conhecer o procedimento.",
  prazo: null
},
{
  id: 221, data: "2026-04-22",
  epigrafe: "Gratuidade emolumentos RCPN (insuficiência de recursos)",
  areas: "NA",
  observacoes: "Aplicável ao Registro Civil de Pessoas Naturais.",
  situacao: "Vigente", classificacao: "AUTONOMO-PÓS-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6875",
  especialidades: ["RCPN"],
  responsaveis: ["Oficial de Registro Civil"],
  resumo: "Regulamenta a gratuidade de emolumentos no Registro Civil de Pessoas Naturais para requerentes com insuficiência de recursos. Revisar os critérios e o fluxo interno de concessão da gratuidade.",
  prazo: null
},
{
  id: 222, data: "2026-04-24",
  epigrafe: "Violência patrimonial contra a mulher",
  areas: "ADM e treinamento interno",
  observacoes: "Medidas para a prevenção e o enfrentamento da violência patrimonial e de outras formas de violência contra a mulher, especialmente em situação de vulnerabilidade, no âmbito dos serviços notariais e de registro, e estabelece diretrizes para um atendimento humanizado, seguro e protetivo.",
  situacao: "Vigente", classificacao: "AUTONOMO-PÓS-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6882",
  especialidades: ["TODAS"],
  responsaveis: ["Administrativo", "RH / treinamento interno"],
  resumo: "Estabelece medidas de prevenção e enfrentamento à violência patrimonial e a outras formas de violência contra a mulher nos serviços notariais e registrais, com diretrizes para atendimento humanizado, seguro e protetivo. Planejar o treinamento interno da equipe de atendimento.",
  prazo: null
},
{
  id: 223, data: "2026-05-06",
  epigrafe: "Programa Nacional de Execução Efetiva — LabExec",
  areas: "NA",
  observacoes: "Somente ciência: institui o Programa Nacional de Execução Efetiva (PNEE), sob coordenação da Corregedoria Nacional de Justiça, com a finalidade de elevar a efetividade da execução judicial e extrajudicial (exceto fiscal e penal) mediante padronização nacional, modernização tecnológica, estruturas especializadas, integração de dados, incrementos para conciliação e cooperação judicial, e estímulos para a atuação de magistrados na execução.",
  situacao: "Vigente", classificacao: "HIBRIDO",
  url: "https://atos.cnj.jus.br/atos/detalhar/1340",
  especialidades: ["TODAS"],
  responsaveis: ["Oficial (ciência institucional)"],
  resumo: "Institui o Programa Nacional de Execução Efetiva (LabExec), com padronização nacional, modernização tecnológica e integração de dados para a execução judicial e extrajudicial. Ato de ciência institucional — sem ação imediata obrigatória para o cartório neste momento.",
  prazo: null
},
{
  id: 224, data: "2026-05-12",
  epigrafe: "CONSTRIJUD — do ONR/SREI. Serp-Jud.",
  areas: "Atendimento eletrônico + Exame e qualificação de títulos judiciais",
  observacoes: "Procedimento de monitoramento do sistema CONSTRIJUD, recepção e prenotação será implantado até o final de agosto/2026. Iniciando por penhoras, arrestos e sequestros. Ler o provimento.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/1002",
  especialidades: ["RI"],
  responsaveis: ["Atendimento eletrônico", "Exame e qualificação de títulos judiciais"],
  resumo: "Implanta o monitoramento do sistema CONSTRIJUD para recepção e prenotação eletrônica de penhoras, arrestos e sequestros, com início previsto até o final de agosto/2026. Ler o provimento na íntegra e preparar o fluxo de atendimento eletrônico e prenotação.",
  prazo: "Implantação prevista até o final de agosto/2026 (início por penhoras, arrestos e sequestros)."
},
{
  id: 225, data: "2026-05-20",
  epigrafe: "Obrigatoriedade de prestação de informações relativas ao cumprimento de ordens judiciais que impactem a publicidade de protestos.",
  areas: "NA",
  observacoes: "Aplicável ao Protesto.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/637",
  especialidades: ["TPLT"],
  responsaveis: ["Tabelião de Protesto"],
  resumo: "Estabelece a obrigatoriedade de prestar informações sobre o cumprimento de ordens judiciais que impactem a publicidade de protestos. Aplicável ao Tabelionato de Protesto — revisar o fluxo interno de resposta a essas ordens judiciais.",
  prazo: null
},
{
  id: 227, data: "2026-06-09",
  epigrafe: "Solvência trabalhista dos delegatários (declarações anuais e fiscalização)",
  areas: "ADM + RH + Contabilidade",
  observacoes: "Verificar procedimentos para envio das declarações de passivos trabalhistas e de solvência trabalhista. 1ª comunicação até 11/09/2026; demais, anualmente até 31/03.",
  situacao: "Vigente", classificacao: "AUTONOMO-PÓS-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/1384",
  especialidades: ["TODAS"],
  responsaveis: ["Administrativo", "RH", "Contabilidade"],
  resumo: "Institui declarações anuais de solvência trabalhista dos delegatários, com fiscalização. A primeira comunicação deve ser feita até 11/09/2026; as demais, anualmente até 31/03. Organizar com ADM, RH e Contabilidade a coleta e o envio das declarações dentro do prazo.",
  prazo: "1ª comunicação até 11/09/2026; demais, anualmente até 31/03."
},
{
  id: 228, data: "2026-06-16",
  epigrafe: "Extratos eletrônicos no Registro de Imóveis",
  areas: "Todas as áreas do processo de registro e averbação",
  observacoes: "Regulamenta, no âmbito do Registro de Imóveis, a utilização dos extratos eletrônicos para registro ou averbação de fatos, atos e negócios jurídicos com repercussão imobiliária.",
  situacao: "Vigente", classificacao: "AUTONOMO-PÓS-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/6929",
  especialidades: ["RI"],
  responsaveis: ["Exame e qualificação", "Prenotação", "Escrituração"],
  resumo: "Regulamenta, no âmbito do Registro de Imóveis, a utilização de extratos eletrônicos para registro ou averbação de fatos, atos e negócios jurídicos com repercussão imobiliária. Revisar o fluxo de recepção, exame e registro de extratos eletrônicos em todas as etapas do processo registral.",
  prazo: null
},
{
  id: 229, data: "2026-06-16",
  epigrafe: "Altera o CNN-Extra (ecossistema Serp; marca “Meu Registro”; interoperabilidade)",
  areas: "Oficial e Substitutos",
  observacoes: "Ciência: o Sistema Eletrônico dos Registros Públicos (Serp), preservada sua denominação legal e técnica, adotará, para fins de interface com o usuário, comunicação institucional e identidade de marca, a denominação “Meu Registro”. É obrigatória a adesão, o acesso e o monitoramento operacional diário dos oficiais às plataformas do Serp e de seus Operadores Nacionais. A implantação ocorrerá de forma progressiva, mediante fases-piloto, ambientes de homologação, publicação de ITNs, início por serviços prioritários e ampliação gradual para outras especialidades.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/1423",
  especialidades: ["TODAS"],
  responsaveis: ["Oficial e Substitutos"],
  resumo: "Institui a marca “Meu Registro” como interface unificada do Serp e torna obrigatória a adesão, o acesso e o monitoramento operacional diário dos oficiais às plataformas do Serp. Implantação progressiva, por fases-piloto. Acompanhar o cronograma de implantação e a adesão obrigatória do cartório.",
  prazo: "Implantação progressiva (fases-piloto e ampliação gradual) — acompanhar cronograma."
},
{
  id: 237, data: "2026-07-13",
  epigrafe: "Altera o CNN-Extra (CNS e código de acervo em certidões de acervos incorporados)",
  areas: "NA",
  observacoes: "Aplicável ao Registro Civil de Pessoas Naturais. Padrões de numeração da matrícula, de inserção obrigatória nas certidões (primeira e demais vias) emitidas pelos Cartórios de Registro Civil das Pessoas Naturais.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/942",
  especialidades: ["RCPN"],
  responsaveis: ["Escrituração de certidões (RCPN)"],
  resumo: "Padroniza a numeração da matrícula e a inserção do código de acervo em certidões (primeira e demais vias) emitidas pelo Registro Civil para acervos incorporados. Revisar o modelo de certidão emitido pelo cartório.",
  prazo: null
},
{
  id: 240, data: "2026-07-16",
  epigrafe: "Altera CNN-Extra e CNN-Jud (mandados de adoção — registro, averbação e comunicação)",
  areas: "NA",
  observacoes: "Aplicável ao Registro Civil de Pessoas Naturais.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/2001",
  especialidades: ["RCPN"],
  responsaveis: ["Oficial de Registro Civil"],
  resumo: "Ajusta as regras de registro, averbação e comunicação de mandados de adoção no Registro Civil de Pessoas Naturais e no CNN-Jud. Revisar o procedimento interno para mandados de adoção.",
  prazo: null
},
{
  id: 242, data: "2026-07-21",
  epigrafe: "Altera o CNN-Extra (base nacional RTDPJ; identificadores NNP e MN-RTDPJ)",
  areas: "NA",
  observacoes: "Aplicável ao Registro de Títulos e Documentos e Civil das Pessoas Jurídicas.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/1111",
  especialidades: ["RTDPJ"],
  responsaveis: ["Oficial de RTDPJ"],
  resumo: "Cria base nacional para o RTDPJ, com novos identificadores (NNP e MN-RTDPJ). Aplicável ao Registro de Títulos e Documentos e Civil das Pessoas Jurídicas — revisar a adequação dos sistemas internos aos novos identificadores.",
  prazo: null
},
{
  id: 243, data: "2026-07-21",
  epigrafe: "Altera o Prov. 213/2026 (padrões mínimos de TIC — enquadramento e prazos)",
  areas: "TI",
  observacoes: "Alterador do Provimento CNJ 213/2026, que dispõe sobre padrões mínimos de Tecnologia da Informação.",
  situacao: "Vigente", classificacao: "EXTRA-PÓS-CNN",
  url: "https://atos.cnj.jus.br/atos/detalhar/6936",
  especialidades: ["TODAS"],
  responsaveis: ["TI / responsável técnico de sistemas"],
  resumo: "Altera o Provimento CNJ 213/2026, ajustando o enquadramento e os prazos dos padrões mínimos de Tecnologia da Informação. Ler os dois atos em conjunto e verificar o novo cronograma de adequação tecnológica.",
  prazo: null
},
{
  id: 246, data: "2026-07-28",
  epigrafe: "Altera o CNN-Extra (art. 440-AO — alienação fiduciária; adequação aos MS 39.805/39.930 STF)",
  areas: "Exame e qualificação / Conferência — Alienação Fiduciária",
  observacoes: "Verificar orientação para exame de títulos que envolvam a constituição, transferência, modificação ou renúncia de alienação fiduciária.",
  situacao: "Vigente", classificacao: "ALTERADOR-CNN-EXTRA",
  url: "https://atos.cnj.jus.br/atos/detalhar/3274",
  especialidades: ["RI"],
  responsaveis: ["Exame e qualificação — Conferência de Alienação Fiduciária"],
  resumo: "Atualiza a orientação para exame de títulos que envolvam constituição, transferência, modificação ou renúncia de alienação fiduciária, adequando-a às decisões do STF (MS 39.805 e 39.930). Revisar o checklist de qualificação de títulos com alienação fiduciária.",
  prazo: null
}
];
