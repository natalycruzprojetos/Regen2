/* ============================================================
   Regen — Checklist de Conformidade Correcional (Registro de Imóveis)
   Base construída a partir do relatório completo de inspeção ordinária
   do CNJ no TJSP (foro extrajudicial) — 4 a 8 de maio de 2026.

   Cada item traz: pergunta objetiva, referência (item da ata + norma)
   e a providência recomendada quando a resposta for "Não" ou "Parcial".
   As referências não identificam a serventia inspecionada — mantêm
   apenas o número do item correcional e a norma/lei citada na ementa.

   Estrutura em dois formulários (GRUPOS):
   1) CNJ - Inspeção Extrajudicial (áreas gerais)
   2) CNJ - Inspeção Registro de Imóveis (área específica de RI)
   ============================================================ */

const AREAS = [
  {
    id: "administracao",
    sigla: "AD",
    nome: "Administração da Serventia",
    descricao: "Exercício pessoal da delegação e governança geral da unidade.",
    itens: [
      {
        id: "ADM1",
        pergunta: "O(a) oficial(a) registrador(a) exerce pessoalmente a direção, supervisão e gestão da unidade, evitando risco de subdelegação vedada?",
        resumo: "Subdelegação vedada ocorre quando quem de fato dirige a serventia no dia a dia não é o delegatário, mas um terceiro sem essa atribuição legal — por exemplo, um gerente ou sócio informal.",
        referencia: "Rec. 3.6.20.1",
        providencia: "Reforçar o exercício pessoal da delegação na direção, supervisão e gestão da unidade."
      },
      {
        id: "ADM2",
        pergunta: "O(a) titular conhece o procedimento de aferição de incapacidade permanente do delegatário previsto no Provimento CNJ n. 220/2026, para o caso de eventual necessidade (própria ou de sucessão na serventia)?",
        resumo: "O Provimento CNJ n. 220/2026 disciplina o procedimento usado para apurar se um(a) notário(a) ou registrador(a) está permanentemente incapacitado(a) de exercer pessoalmente a delegação — por exemplo, por razões de saúde que impeçam a direção, supervisão e gestão da serventia, mesmo que a pessoa esteja apta para outras atividades. Não é um procedimento disciplinar. Pode ser instaurado por correições, denúncia (inclusive anônima) ou comunicação formal, e considera indício de incapacidade, entre outros, a ausência não localizada por 30 dias corridos consecutivos (ou 45 dias interpolados no mesmo trimestre) ou a falta a 3 convocações por videoconferência. O procedimento tem duas fases (preliminar e contraditória), prazo de 45 dias — prorrogável por 30 —, perícia médica com sigilo dos dados de saúde, possibilidade de afastamento cautelar durante a apuração, e recurso administrativo em 5 dias contra a decisão final. Conhecer esse procedimento ajuda tanto o próprio titular quanto quem avalia uma eventual sucessão na serventia.",
        referencia: "Provimento CNJ n. 220/2026, arts. 1º a 24",
        providencia: "Buscar orientação jurídica sobre o procedimento do Provimento CNJ n. 220/2026, especialmente em caso de afastamento por saúde ou planejamento de sucessão."
      }
    ]
  },
  {
    id: "financeiro",
    sigla: "F",
    nome: "Financeiro e Fiscal",
    descricao: "Depósito prévio, livro-caixa, selo digital, Justiça Aberta e provisionamento.",
    itens: [
      {
        id: "F1",
        pergunta: "O depósito prévio é escriturado pelo regime de caixa, e não pelo regime de competência?",
        resumo: "Regime de caixa: a receita é reconhecida quando o dinheiro efetivamente entra na conta. Regime de competência: seria reconhecida quando o serviço é prestado, ainda que o pagamento venha depois. Para fins tributários, delegatários devem usar o regime de caixa — inclusive para os valores recebidos como depósito prévio.",
        referencia: "Art. 34 do Decreto n. 9.580/2018; Soluções de Consulta Cosit n. 183 e 278/2023; Manual de Orientação Tributária – Cartórios/RFB (04/2026) — Itens CNJ 10.2.5; 10.4.13; 10.6.5; 10.7.8.3; 10.8.13.1.5",
        providencia: "Adequar a escrituração contábil do depósito prévio ao regime de caixa exigido dos delegatários."
      },
      {
        id: "F2",
        pergunta: "Existe e está atualizado o Livro de Controle de Depósito Prévio?",
        resumo: "Para cada valor recebido antecipadamente, o livro deve identificar quem pagou, para qual ato, a data do recebimento, o destino do valor (se foi convertido em receita ou devolvido) e, se devolvido, quando isso ocorreu.",
        referencia: "Art. 188 do Provimento CNJ n. 149/2023 — Itens CNJ 10.2.5; 10.4.13",
        providencia: "Abrir e manter o Livro de Controle de Depósito Prévio, com lançamentos regulares."
      },
      {
        id: "F3",
        pergunta: "Os valores são discriminados de forma detalhada em recibos, selos e no corpo dos atos registrais (e não apenas o número do selo)?",
        resumo: "Não basta anotar o número do selo. O documento (recibo, selo ou o próprio ato) deve mostrar os valores de cada parcela cobrada: emolumentos, prenotação, taxas, repasses legais, custas e demais itens.",
        referencia: "Art. 14, parágrafo único, da Lei n. 6.015/1973 — Achado transversal, relatório de inspeção CNJ",
        providencia: "Padronizar a discriminação detalhada dos valores em recibos, selos e no corpo dos atos. Se o sistema informatizado não permitir essa discriminação automaticamente, providenciar a adequação tecnológica necessária."
      },
      {
        id: "F4",
        pergunta: "Existe conta bancária específica e segregada para depósitos prévios, sem confusão patrimonial com recursos próprios da serventia?",
        resumo: "O valor deve entrar numa conta exclusiva para depósitos prévios. Só deve ser transferido para a conta de emolumentos da serventia no momento em que o depósito é efetivamente convertido em receita (ou seja, quando o ato é praticado).",
        referencia: "Achado transversal, relatório de inspeção CNJ — Itens CNJ 10.7.8.3; 10.8.13.1.5",
        providencia: "Abrir conta bancária segregada exclusiva para depósitos prévios, movimentando para a conta de emolumentos apenas quando o depósito for convertido em receita."
      },
      {
        id: "F5",
        pergunta: "Há procedimento padronizado para devolução de valores de depósito prévio quando o ato não é praticado, retendo apenas a parcela de prenotação?",
        resumo: "Ao devolver um valor: retenha só a parte referente à prenotação (o serviço de qualificação já foi prestado); emita recibo discriminado da devolução; lance a devolução no Livro-Caixa como despesa, no mês em que ela ocorreu; e guarde os comprovantes organizados para fiscalização.",
        referencia: "Determinações (30/60 dias), relatório de inspeção CNJ",
        providencia: "Instituir procedimento formal e padronizado de devolução de valores não utilizados, com recibo discriminado e escrituração da devolução no Livro-Caixa no mês de sua efetivação."
      },
      {
        id: "F6",
        pergunta: "A escrituração dos livros de depósito prévio e caixa está regular e é comprovável a qualquer momento?",
        resumo: "O Livro-Caixa é o livro diário de receitas e despesas da serventia — diferente do Livro de Controle de Depósito Prévio, que registra apenas os valores recebidos antecipadamente, antes de serem convertidos em receita.",
        referencia: "Itens CNJ 10.4.13; 10.6.8",
        providencia: "Regularizar e manter comprovável a escrituração dos livros de depósito prévio e caixa."
      },
      {
        id: "F8",
        pergunta: "Se a arrecadação bruta semestral da serventia for superior a R$ 100.000,00, são apresentadas anualmente (até 31 de março) a Declaração de Passivo Trabalhista e a Declaração de Solvência Trabalhista, elaboradas por contador habilitado no CRC?",
        resumo: "Desde o Provimento CNJ n. 227/2026, a Corregedoria não pode mais exigir fundo de provisionamento, conta vinculada ou instrumento parecido para verbas trabalhistas — isso foi expressamente proibido. Em vez disso, o delegatário declara todo ano: (1) o passivo trabalhista (o que seria devido a título de verbas rescisórias e encargos se todos os prepostos fossem dispensados) e (2) bens e direitos livres de ônus, em valor suficiente para cobrir esse passivo. Havendo déficit, há 60 dias para regularizar ou apresentar fiança bancária ou seguro-garantia. Serventias vagas, sob interinidade, ou classificadas na Classe I do Provimento CNJ n. 213/2026 estão dispensadas dessa obrigação.",
        referencia: "Provimento CNJ n. 227/2026, arts. 1º a 20",
        providencia: "Contratar contador habilitado no CRC para elaborar as declarações anuais; havendo déficit de cobertura, apresentar fiança bancária (instituição S1/S2) ou seguro-garantia dentro de 60 dias."
      },
      {
        id: "F9",
        pergunta: "O cálculo de emolumentos é realizado de forma fidedigna pelo próprio sistema (e não em planilhas paralelas)?",
        resumo: "Cálculos feitos em planilhas separadas do sistema principal são mais fáceis de errar ou alterar sem deixar rastro.",
        referencia: "Det. 10.3.9",
        providencia: "Implantar cálculo automatizado e fidedigno de emolumentos no sistema principal."
      },
      {
        id: "F10",
        pergunta: "O selo digital é gerado com controle centralizado, evitando saltos de numeração ou atos não transmitidos ('selos em branco')?",
        resumo: "Sem um controle central de quais números de selo já foram reservados, é difícil detectar se algum ato foi praticado sem gerar o selo correspondente (um 'salto' na numeração).",
        referencia: "Item CNJ 3.6.12 / Det. 3.6.19.3.1 a 3.6.19.3.8",
        providencia: "Avaliar/adotar mecanismo centralizado de pré-reserva e rastreamento de identificadores de selo."
      },
      {
        id: "F11",
        pergunta: "O prazo de transmissão dos selos e as retificações de atos (até 72h) são acompanhados, com histórico de retificações preservado e visível?",
        resumo: "Quanto menor o prazo entre a prática do ato e a transmissão do selo, menor a janela para inconsistências passarem despercebidas.",
        referencia: "Item CNJ 3.6.12.1 / Det. 3.6.19.3.5 a 3.6.19.3.7",
        providencia: "Reduzir o prazo de transmissão e preservar/exibir o histórico de retificações."
      },
      {
        id: "F12",
        pergunta: "O Sistema Justiça Aberta é alimentado de forma correta e atualizada (produtividade, situação da delegação, dados cadastrais)?",
        resumo: "Divergências comuns incluem: telefone e endereço eletrônico desatualizados, data de nomeação/assunção do delegatário diferente da informada em outros documentos, e quantitativo ou regime jurídico de colaboradores incorreto.",
        referencia: "Item CNJ 3.6.10.3 / Det. 3.6.19.2.3",
        providencia: "Instituir rotina periódica de atualização e conferência dos dados no Justiça Aberta, com atenção especial a contatos, data de nomeação e quadro de colaboradores."
      }
    ]
  },
  {
    id: "rh",
    sigla: "RH",
    nome: "Recursos Humanos e Governança",
    descricao: "Capacitação, integridade, provisionamento de verbas e teto remuneratório.",
    itens: [
      {
        id: "RH1",
        pergunta: "Existe programa institucional de capacitação periódica em proteção de dados pessoais (LGPD) para todos os colaboradores e prepostos?",
        resumo: "A capacitação deve alcançar todos que lidam com dados pessoais no dia a dia — não só quem ocupa cargo de gestão.",
        referencia: "Det. 3.6.19.3.13 — Item CNJ 3.6.15",
        providencia: "Instituir programa periódico de capacitação em LGPD para servidores, delegatário, interinos e prepostos."
      },
      {
        id: "RH2",
        pergunta: "Há programa de capacitação continuada dos escreventes e colaboradores?",
        resumo: "Pode ser algo simples, como um encontro periódico da equipe para atualização técnica — não precisa ser um programa formal e caro.",
        referencia: "Boas práticas identificadas pela inspeção CNJ — Item CNJ 10.1",
        providencia: "Estruturar programa contínuo de capacitação interna dos colaboradores."
      },
      {
        id: "RH3",
        pergunta: "São realizadas pesquisas periódicas de clima organizacional com os colaboradores?",
        referencia: "Boa prática identificada pela inspeção CNJ (índice de satisfação superior a 95%) — Item CNJ 10.1",
        providencia: "Implantar pesquisa periódica de clima organizacional."
      },
      {
        id: "RH4",
        pergunta: "Existe sistema interno de integridade (regimento, código de ética, canal de denúncias, comitê de ética, due diligence de colaboradores e fornecedores)?",
        resumo: "Due diligence de fornecedores significa uma verificação prévia mínima antes de contratar — por exemplo, confirmar dados básicos e a reputação da empresa.",
        referencia: "Boas práticas identificadas pela inspeção CNJ — Item CNJ 10.1",
        providencia: "Implantar sistema interno de integridade com canal de denúncias e due diligence de colaboradores e fornecedores."
      },
      {
        id: "RH7",
        pergunta: "A remuneração de colaboradores e a receita líquida do delegatário (titular ou interino) respeitam o teto de subsídio de Ministro do STF, com o excedente recolhido conforme as normas aplicáveis, ou há autorização fundamentada da Corregedoria para eventual excesso?",
        resumo: "Esse teto usa como referência o subsídio de Ministro do STF e incide sobre a receita líquida do delegatário — não apenas sobre o salário de colaboradores. A base constitucional é o art. 37, XI, da Constituição Federal, aplicada aos delegatários por regulamentação da Corregedoria-Geral (Código de Normas Extrajudicial do TJSP, item 10.5.2, Tomo II). O relatório de inspeção também menciona 'jurisprudência do STF sobre o tema', mas sem indicar o número do processo — não localizamos essa decisão específica com segurança suficiente para citá-la aqui. Se você tiver esse número (por exemplo, via KollGEN), nos avise para completarmos a referência.",
        referencia: "Art. 21 da Lei n. 8.935/1994; art. 37, XI, da Constituição Federal — Itens CNJ 3.6.10.2; 10.4.11 / Det. 10.4.13",
        providencia: "Ajustar remunerações ao teto legal ou formalizar justificativa fundamentada perante a Corregedoria — aplicável tanto a titulares quanto a interinos."
      },
      {
        id: "RH9",
        pergunta: "O provisionamento de verbas trabalhistas de interinos é realizado em duas contas distintas (férias/13º salário e verbas rescisórias, esta judicialmente vinculada)?",
        resumo: "Isso evita que, ao final do contrato, falte dinheiro reservado para pagar férias, 13º salário e eventuais verbas rescisórias do interino.",
        referencia: "Item 14.7.3 das Normas de Serviço, redação do Provimento CGJ/SP n. 18/2024 — Item CNJ 3.6.10.2.1",
        providencia: "Regularizar o provisionamento em duas contas distintas conforme as Normas de Serviço."
      }
    ]
  },
  {
    id: "arquivo",
    sigla: "AR",
    nome: "Arquivo e Acervo",
    descricao: "Guarda de documentos, preservação, continuidade e seguro do acervo.",
    itens: [
      {
        id: "AR1",
        pergunta: "A serventia tem um inventário do acervo (livros, processos e documentos) para eventual transmissão futura em caso de vacância?",
        resumo: "Esse inventário é diferente do inventário patrimonial (que trata de bens físicos, como móveis e equipamentos, e está na área de Instalações) — aqui o foco é o acervo documental e registral da serventia.",
        referencia: "Item 10.5.1 do Tomo II das Normas Locais — Item CNJ 10.4.11 / Det. 10.4.13",
        providencia: "Manter inventário atualizado do acervo documental e registral da serventia."
      },
      {
        id: "AR2",
        pergunta: "Todos os arquivos, atos e documentos da serventia estão sob guarda no próprio cartório, sem uso de computadores ou equipamentos particulares de escreventes?",
        resumo: "O risco de guardar arquivos em computadores pessoais dos escreventes é perder o acesso a esses dados se a pessoa se desligar da serventia.",
        referencia: "Item CNJ 10.4.11",
        providencia: "Adquirir equipamentos próprios e recolher ao cartório todos os arquivos e atos mantidos em máquinas particulares."
      },
      {
        id: "AR3",
        pergunta: "Se houver documentos históricos ou de valor especial sob guarda da serventia, existe proposta formal de preservação, catalogação e destinação institucional adequada?",
        referencia: "Achado da inspeção CNJ em acervo histórico sob guarda de serventia — Det. 10.8.13.3.1",
        providencia: "Apresentar ao Juízo Corregedor Permanente proposta formal de preservação, catalogação e destinação dos documentos."
      },
      {
        id: "AR4",
        pergunta: "Há rotina de backup e plano de continuidade para o acervo digital e físico da serventia?",
        resumo: "Backup é a cópia de segurança; continuidade é o plano para a serventia continuar funcionando, mesmo que de forma limitada, se um servidor falhar ou a internet cair.",
        referencia: "Achado da inspeção CNJ — plano de saneamento — Det. 10.3.9",
        providencia: "Estruturar plano de backup, continuidade e conservação do acervo."
      },
      {
        id: "AR5",
        pergunta: "O acervo (livros, títulos e documentos) está protegido por seguro contra sinistros?",
        referencia: "Det. 10.3.9",
        providencia: "Contratar seguro contra sinistros para proteção do acervo."
      }
    ]
  },
  {
    id: "ti",
    sigla: "TI",
    nome: "Tecnologia da Informação e Proteção de Dados",
    descricao: "Sistemas, LGPD, Provimento CNJ n. 213/2026 e continuidade tecnológica.",
    itens: [
      {
        id: "TI1",
        pergunta: "O sistema informatizado da serventia possui log de acesso e trilha de auditoria que identifique o responsável por cada ato praticado ou alterado?",
        resumo: "A trilha de auditoria mostra quem fez o quê e quando no sistema — essencial para investigar qualquer irregularidade depois.",
        referencia: "Det. 10.3.9",
        providencia: "Substituir/adequar o sistema para garantir log de acesso e trilha de auditoria de todos os atos."
      },
      {
        id: "TI3",
        pergunta: "Existe plano de atualização ou substituição de sistemas e infraestrutura de TI defasados?",
        resumo: "Sistemas muito antigos tendem a ter mais falhas de segurança e menos suporte do fabricante.",
        referencia: "Det. 10.3.9; Det. 10.4.13",
        providencia: "Elaborar plano de atualização estrutural e de TI, com cronograma e responsáveis."
      },
      {
        id: "TI6",
        pergunta: "Atos transmitidos com valor zerado (dependentes de retificação posterior) são identificados e monitorados por alertas automáticos?",
        resumo: "Um ato com valor zerado sem justificativa pode indicar erro ou tentativa de burlar a cobrança de emolumentos.",
        referencia: "Det. 3.6.19.3.6",
        providencia: "Desenvolver alertas automáticos para atos zerados, retificações, cancelamentos e exclusões atípicos."
      },
      {
        id: "TI8",
        pergunta: "O DPO (Encarregado de Proteção de Dados) está formalmente designado e a política de proteção de dados é divulgada a usuários e colaboradores?",
        resumo: "A divulgação deve ser ostensiva: por exemplo, afixada em local visível ao público e também disponível por QR Code, indicando o nome do encarregado (DPO) e um canal de contato. Vale também conferir se os termos de compromisso de prestadores de serviço quanto à privacidade de dados estão assinados e atualizados.",
        referencia: "Lei n. 13.709/2018 (LGPD); Provimento CNJ n. 149/2023 — Item CNJ 10.6.8",
        providencia: "Designar formalmente o DPO e divulgar a política de proteção de dados de forma ostensiva (afixação física e QR Code), com indicação do encarregado e canal de contato."
      },
      {
        id: "TI10",
        pergunta: "A serventia já identificou sua classe de risco tecnológico (1, 2 ou 3) segundo o Provimento CNJ n. 213/2026 e tem um plano de adequação com diagnóstico, medidas já implementadas e cronograma das pendentes?",
        resumo: "A classe é definida pela receita bruta semestral da serventia: Classe 1 vai até R$ 300.000,00 (com subclasses A/B/C); Classe 2 vai de R$ 300.000,01 até R$ 1.500.000,00 (subclasses D/E/F); Classe 3 é acima de R$ 1.500.000,00 (subclasses G/H/I/J, em múltiplos desse valor). Esses limites são reajustados todo ano pelo CNJ. Os prazos para concluir a implementação inicial (Etapas 1 e 2 do Anexo IV — governança, conformidade legal, infraestrutura e continuidade), contados da entrada em vigor do Provimento CN n. 243/2026, são: 180 dias para a Classe 3, 240 dias para a Classe 2 e 300 dias para a Classe 1. As etapas seguintes (3 a 5, controles mais avançados) podem ser implementadas de forma progressiva, com até 24 meses para a Classe 3.",
        referencia: "Provimento CNJ n. 213/2026, arts. 2º, 16, 20 a 23 e Anexo IV (redação dada pelo Provimento CN n. 243/2026)",
        providencia: "Calcular a receita bruta semestral para identificar a classe/subclasse correta e elaborar plano de adequação com diagnóstico, medidas implementadas e cronograma das pendentes, dentro do prazo aplicável à classe."
      },
      {
        id: "TI11",
        pergunta: "Existe Política de Segurança da Informação formalizada e integrada a um Plano de Continuidade de Negócios, com tempo e ponto de recuperação (RTO/RPO) definidos e já testados na prática?",
        resumo: "RTO é por quanto tempo o serviço pode ficar fora do ar até ser restabelecido; RPO é quanto tempo de dados a serventia pode se permitir perder num incidente. Definir esses números no papel não basta — é preciso testar a restauração na prática, com periodicidade compatível com a classe da serventia, e registrar o resultado dos testes no dossiê técnico. Para a Classe 3, a autenticação multifator em acessos administrativos, a criptografia e a conformidade com a LGPD já devem estar cumpridas desde o primeiro ciclo, mesmo que os controles mais avançados de monitoramento sejam implementados de forma progressiva. Vale também verificar se os contratos com fornecedores de TI preveem confidencialidade, reversibilidade e portabilidade dos dados.",
        referencia: "Provimento CNJ n. 213/2026, arts. 5º, 9º, 12 e 22",
        providencia: "Formalizar a Política de Segurança da Informação e o Plano de Continuidade de Negócios, definir RTO/RPO por classe e realizar testes periódicos de restauração, documentando os resultados."
      },
      {
        id: "TI12",
        pergunta: "A serventia mantém procedimento documentado para gestão de incidentes de segurança da informação (identificação, classificação por gravidade, contenção, correção e registro), com comunicação à Corregedoria quando o incidente for crítico?",
        resumo: "Isso vale tanto para incidentes técnicos (ex.: invasão, vazamento, indisponibilidade de sistema) quanto para falhas de segurança identificadas preventivamente (vulnerabilidades). Cada incidente crítico deve ter uma análise de causa raiz registrada, não só a solução aplicada — isso ajuda a evitar que o mesmo problema se repita.",
        referencia: "Provimento CNJ n. 213/2026, art. 11",
        providencia: "Documentar um procedimento interno de gestão de incidentes de segurança, com classificação por gravidade e comunicação à Corregedoria nos casos críticos."
      }
    ]
  },
  {
    id: "instalacoes",
    sigla: "IN",
    nome: "Instalações e Segurança Predial",
    descricao: "Regularidade predial, patrimônio, acessibilidade e cessões de uso.",
    itens: [
      {
        id: "IN1",
        pergunta: "A serventia possui alvará de localização válido junto à Municipalidade?",
        resumo: "Se o alvará estiver vencido ou nunca tiver sido obtido, o mínimo é ter o protocolo do pedido e comprovar que o processo está em andamento.",
        referencia: "Det. 10.7.12.1",
        providencia: "Adotar as providências perante a Municipalidade para obtenção do alvará de localização, comprovando o protocolo."
      },
      {
        id: "IN2",
        pergunta: "Eventuais cessões ou sublocações de áreas do cartório (ex.: estacionamento) estão formalizadas contratualmente e cobertas por seguro?",
        resumo: "O objetivo é evitar que uma cessão informal de espaço (sem contrato ou seguro) gere responsabilidade para a serventia em caso de acidente ou dano.",
        referencia: "Item CNJ 10.4.11",
        providencia: "Formalizar contratualmente qualquer cessão de área e providenciar cobertura de seguro."
      },
      {
        id: "IN4",
        pergunta: "A serventia dispõe de sinalização tátil e demais recursos de acessibilidade física e digital ao público?",
        resumo: "A sinalização tátil direcional e de alerta ajuda pessoas com deficiência visual a se orientar dentro da serventia.",
        referencia: "Art. 10-A da Lei n. 10.098/2000; ABNT NBR 16537; Lei n. 13.146/2015 — Det. 10.6.9",
        providencia: "Implantar sinalização tátil direcional e de alerta e demais recursos de acessibilidade, conforme a ABNT NBR 16537."
      },
      {
        id: "IN5",
        pergunta: "Em caso de vacância, existe inventário patrimonial (móveis, equipamentos e demais bens da serventia) atualizado, para viabilizar a ata de transmissão ao sucessor?",
        resumo: "Isso evita confusão entre os bens pessoais do titular anterior (ou de colaboradores) e os bens que pertencem efetivamente à serventia e devem permanecer com ela na sucessão.",
        referencia: "Item 10.5.1 do Tomo II das Normas Locais — Item CNJ 10.4.11 / Det. 10.4.13",
        providencia: "Manter inventário patrimonial atualizado e, em caso de vacância, realizar com urgência a ata de transmissão de acervo e inventário patrimonial."
      }
    ]
  },
  {
    id: "pldftp",
    sigla: "PLD",
    nome: "PLD/FTP e Prevenção à Fraude",
    descricao: "Comunicações ao COAF/UIF, capacitação, oficial de cumprimento e protocolos antifraude.",
    itens: [
      {
        id: "PLD1",
        pergunta: "A serventia comunica ao COAF/UIF (via SCAF) operações com indícios de lavagem de dinheiro ou financiamento ao terrorismo, adotando critérios que vão além do mero valor em espécie?",
        resumo: "O nome completo do programa é Prevenção à Lavagem de Dinheiro, ao Financiamento do Terrorismo e à Proliferação de Armas de Destruição em Massa (PLD/FTP). Usar só o critério de 'valor em espécie acima de X' deixa passar outras operações suspeitas — por exemplo, discrepância entre o valor declarado e o valor de mercado do imóvel.",
        referencia: "Item CNJ 3.6.16 / Det. 3.6.19.3.14",
        providencia: "Revisar os critérios de comunicação ao COAF/UIF, superando o critério único de valor em espécie.",
        extra: { chave: "totalComunicacoes", label: "Total de comunicações ao COAF/UIF realizadas desde 2020", tipo: "number", placeholder: "Ex.: 38" }
      },
      {
        id: "PLD2",
        pergunta: "Há capacitação periódica dos colaboradores em PLD/FTP e nas comunicações obrigatórias ao COAF?",
        resumo: "Vale para todos que atendem o público e lidam com a qualificação de atos — não apenas para o oficial de cumprimento.",
        referencia: "Det. 3.6.19.3.14",
        providencia: "Promover capacitação periódica em PLD/FTP e comunicações ao COAF."
      },
      {
        id: "PLD3",
        pergunta: "Existe protocolo interno formal de prevenção, identificação e comunicação de fraudes documentais (falsificações, discrepância entre valor declarado e valor de mercado, usurpação de identidade)?",
        resumo: "Um programa completo de PLD/FTP inclui: política institucional escrita, rotinas de identificação e qualificação de partes e operações, critérios internos para reconhecer operações suspeitas, registro das operações avaliadas e controle sobre a ausência de comunicações quando aplicável.",
        referencia: "Achados e boas práticas identificados pela inspeção CNJ — Det. 10.8.13",
        providencia: "Formalizar protocolo interno de prevenção, identificação e comunicação de fraudes."
      },
      {
        id: "PLD4",
        pergunta: "Há oficial de cumprimento formalmente nomeado para as obrigações de PLD/FTP junto ao SISCOAF/UIF?",
        resumo: "Esse oficial é o responsável por receber e avaliar informações internas sobre operações suspeitas e decidir se cabe comunicação ao COAF/UIF.",
        referencia: "Itens CNJ 10.4.11; 10.8.10",
        providencia: "Nomear formalmente o oficial de cumprimento responsável pelas comunicações ao SISCOAF/UIF."
      },
      {
        id: "PLD5",
        pergunta: "A serventia acompanha um indicador que relacione o número de comunicações feitas ao COAF com o volume total de atos praticados, para identificar possível sub-notificação?",
        resumo: "Um número absoluto de comunicações isolado não diz muito. Comparar esse número com o total de atos praticados (ou com o valor total arrecadado) ajuda a perceber se a serventia está comunicando muito pouco em relação ao seu volume de operações.",
        referencia: "Achados da inspeção CNJ sobre baixo volume de comunicações ao COAF em relação ao volume de atos praticados",
        providencia: "Criar e acompanhar periodicamente um indicador de proporção entre comunicações ao COAF e volume de atos praticados/arrecadação."
      }
    ]
  },
  {
    id: "ouvidoria",
    sigla: "OV",
    nome: "Atendimento ao Público e Ouvidoria",
    descricao: "Tratamento e consolidação estatística das manifestações de usuários.",
    itens: [
      {
        id: "OV1",
        pergunta: "As manifestações de usuários (reclamações, sugestões, dúvidas) recebidas pela serventia são registradas e classificadas estatisticamente (natureza, tempo de resposta, providência adotada)?",
        resumo: "Um controle simples (nem que seja uma planilha) já ajuda a identificar se as reclamações se concentram em algum tipo de serviço ou período específico.",
        referencia: "Item CNJ 3.6.9 / Det. 3.6.19.2.2",
        providencia: "Implementar rotina de identificação, classificação, consolidação e tratamento estatístico das manifestações de usuários."
      }
    ]
  },
  {
    id: "vulneraveis",
    sigla: "PV",
    nome: "Proteção de Pessoas Vulneráveis",
    descricao: "Prevenção à violência patrimonial em atos que envolvam idosos e pessoas vulneráveis.",
    itens: [
      {
        id: "PV1",
        pergunta: "Existe protocolo de governança por escrito para identificar e coibir atos que possam envolver violência patrimonial contra idosos, mulheres e a população vulnerável em geral?",
        resumo: "Violência patrimonial é o uso indevido de bens ou dinheiro de uma pessoa vulnerável, muitas vezes por familiares ou pessoas de confiança — por exemplo, induzindo-a a assinar um documento sem entender bem o que está fazendo.",
        referencia: "Provimento CNJ n. 222/2026 — Item CNJ 10.5.10.3",
        providencia: "Elaborar e formalizar protocolo de governança para identificação e prevenção de violência patrimonial."
      },
      {
        id: "PV2",
        pergunta: "Existe check-list padronizado de cautelas para atendimento ou qualificação de títulos envolvendo pessoas idosas, vulneráveis ou com possível limitação de compreensão, incluindo, quando aplicável, entrevista reservada?",
        resumo: "As cautelas incluem, por exemplo: conversar em algum momento sozinho com a pessoa (sem a presença de quem a acompanha), avaliar concretamente se ela entende o que está fazendo, e verificar se não há sinais de coação.",
        referencia: "Item CNJ 10.8.14.1",
        providencia: "Padronizar check-list de cautelas para atos ou atendimentos envolvendo pessoas idosas ou vulneráveis."
      }
    ]
  },
  {
    id: "registroimoveis",
    sigla: "RI",
    nome: "Registro de Imóveis",
    descricao: "Qualificação registral, usucapião, aquisição por estrangeiros, Reurb, notificações extrajudiciais e CNIB.",
    itens: [
      {
        id: "RI1",
        pergunta: "Em pedidos de usucapião extrajudicial, há diligência específica para identificar a utilização em série da modalidade em um mesmo empreendimento ou condomínio?",
        resumo: "Usucapião extrajudicial em série no mesmo empreendimento ou condomínio pode indicar uso indevido do instrumento — por exemplo, para regularizar situações que deveriam seguir outro caminho legal ou para fins de sonegação fiscal.",
        referencia: "Art. 410, §2º, do CNN/CN/CNJ-Extra — Det. 10.2.9.1.10",
        providencia: "Instituir diligência específica de aferição da utilização em série da usucapião extraordinária."
      },
      {
        id: "RI2",
        pergunta: "Os atos registrais decorrentes de usucapião incluem todos os elementos cadastrais essenciais do imóvel, inclusive o CEP (princípio da especialidade objetiva)?",
        resumo: "Além do CEP, o registro deve indicar expressamente a modalidade de usucapião reconhecida (ordinária, extraordinária etc.) e o fundamento jurídico da aquisição, e não apenas remeter à decisão de deferimento.",
        referencia: "Art. 440-AQ, §1º, do CNN/CN/CNJ-Extra — Det. 10.2.9.1.11",
        providencia: "Padronizar a inclusão de todos os elementos cadastrais essenciais, inclusive CEP, além da modalidade e do fundamento jurídico da usucapião, no ato registral."
      },
      {
        id: "RI3",
        pergunta: "As atas notariais de usucapião recebidas são qualificadas com rigor, com devolução quando se limitarem a reproduzir declarações das partes?",
        resumo: "A ata notarial precisa mostrar que o tabelião de fato verificou elementos concretos — a posse, o tempo de posse (prazo aquisitivo) e a intenção de dono (animus domini) — e não apenas repetiu o que as partes disseram.",
        referencia: "Lei n. 6.015/1973; Provimento CNJ n. 149/2023 — Itens CNJ 10.6.8; 10.6.9",
        providencia: "Instituir rotina de qualificação rigorosa das atas notariais de usucapião, com nota devolutiva fundamentada quando a ata não contiver elementos mínimos de diligência do notário."
      },
      {
        id: "RI4",
        pergunta: "Toda aquisição de imóvel rural por estrangeiro é submetida a análise prévia, com sistema e base cartográfica próprios, antes da qualificação registral positiva?",
        resumo: "A atenção deve valer também para pessoas jurídicas brasileiras com participação ou controle relevante de capital estrangeiro no seu quadro societário — não apenas para estrangeiros adquirindo diretamente em seu próprio nome.",
        referencia: "Lei n. 5.709/1971 — Item CNJ 3.6.18",
        providencia: "Implantar/manter sistema próprio de análise prévia de aquisição de terras rurais por estrangeiros, incluindo pessoas jurídicas brasileiras com controle estrangeiro relevante."
      },
      {
        id: "RI5",
        pergunta: "Havendo indícios de extrapolação dos limites legais de aquisição por estrangeiros, é instaurado Pedido de Providências com remessa ao INCRA e suspensão do registro?",
        resumo: "O INCRA é o órgão federal responsável por fiscalizar o cumprimento dos limites de aquisição de terras rurais por estrangeiros.",
        referencia: "Lei n. 5.709/1971 — Item CNJ 3.6.18",
        providencia: "Formalizar fluxo de instauração de Pedido de Providências e remessa ao INCRA em casos de indício de extrapolação."
      },
      {
        id: "RI6",
        pergunta: "A atuação em processos de Regularização Fundiária Urbana (Reurb) se limita à fiscalização e orientação normativa, sem assunção de funções executivas de política pública?",
        resumo: "Formular ou implementar a política de Reurb é papel das secretarias municipais, do ITESP, da CDHU e da COHAB-SP — o cartório fiscaliza e orienta a atividade registral, sem assumir essas funções executivas.",
        referencia: "Item CNJ 3.6.17; itens 297 a 324 das Normas de Serviço",
        providencia: "Reafirmar, em manual interno, os limites da atuação registral em processos de Reurb, sem assunção de função executiva."
      },
      {
        id: "RI7",
        pergunta: "Os valores recebidos de terceiros para notificações extrajudiciais (ex.: purga de mora em alienação fiduciária) são regularmente escriturados em conta própria do RI?",
        resumo: "Esses valores não são emolumentos da serventia — são valores de terceiros que passam pela conta do cartório e precisam ficar rastreáveis separadamente.",
        referencia: "Manual de Orientação Tributária – Cartórios/RFB (29/04/2026) — Det. 10.7.12.1",
        providencia: "Escriturar de forma segregada e rastreável os valores recebidos para notificações extrajudiciais."
      },
      {
        id: "RI8",
        pergunta: "A consulta à Central Nacional de Indisponibilidade de Bens (CNIB) na serventia está consistente com a base nacional mantida pelo ONR, sem indisponibilidades mostradas como 'canceladas' localmente quando ainda estão 'ativas' na base nacional?",
        resumo: "A CNIB é a base oficial de bloqueios judiciais sobre imóveis. Se o sistema local diverge da base nacional do ONR sobre o status de uma indisponibilidade, um registro pode ser indevidamente liberado, dando ao usuário a falsa impressão de que não há impedimento.",
        referencia: "Achados da inspeção CNJ em serventia de Registro de Imóveis — integração com a Central Nacional de Indisponibilidade de Bens (CNIB 2.0)",
        providencia: "Auditar a integração do sistema local com a CNIB/ONR e adotar mecanismos redundantes de verificação do status das indisponibilidades, especialmente para pessoas jurídicas com múltiplas unidades locais."
      },
      {
        id: "RI9",
        pergunta: "A serventia recebe ordens judiciais de penhora, arresto, sequestro e bloqueio de matrícula exclusivamente pelo Sistema de Constrição Judicial (Constrijud), verificando-o diariamente (abertura, encerramento e a cada 2 horas, salvo uso de API em tempo real)?",
        resumo: "O Constrijud é o canal oficial e obrigatório do Judiciário para enviar ordens de constrição a cartórios de imóveis, mantido pelo ONR. Ordens recebidas por outro canal devem ser recusadas por nota devolutiva fundamentada — salvo indisponibilidade comprovada do sistema, quando a serventia deve cumprir a ordem mesmo assim e comunicar a irregularidade à Corregedoria e ao ONR. Depois de qualificado, o registro, a averbação ou a nota devolutiva deve sair em até 10 dias úteis, e os emolumentos são pagos pelo próprio sistema.",
        referencia: "Provimento CNJ n. 224/2026 — arts. 320-X a 320-AN do CNN/CN/CNJ-Extra",
        providencia: "Adequar a rotina interna para verificação diária do Constrijud e cumprimento do prazo de 10 dias úteis para registro, averbação ou nota devolutiva."
      },
      {
        id: "RI10",
        pergunta: "A serventia está preparada para receber e qualificar extratos eletrônicos (Provimento CNJ n. 228/2026) enviados por tabeliães, bancos e demais emitentes autorizados, sem dispensar a qualificação registral nem, quando exigido, o arquivamento do instrumento original?",
        resumo: "O extrato eletrônico é uma versão estruturada e padronizada de um título (ex.: uma escritura), enviada pelo Serp para facilitar o registro. Ele não substitui a qualificação registral: o oficial continua analisando se o ato pode ou não ser registrado, e pode exigir o documento original quando necessário. A implantação é gradual, começando por financiamentos imobiliários (SFH, Minha Casa Minha Vida, SFI).",
        referencia: "Provimento CNJ n. 228/2026 — arts. 210-A a 210-Q do CNN/CN/CNJ-Extra",
        providencia: "Acompanhar o cronograma do ONR e adequar o sistema interno para processar extratos eletrônicos estruturados."
      },
      {
        id: "RI11",
        pergunta: "A serventia mantém adesão e monitoramento operacional diário (no mínimo na abertura e no encerramento do expediente) das plataformas do Serp/'Meu Registro' e dos Operadores Nacionais?",
        resumo: "'Meu Registro' é o nome da interface unificada de acesso do usuário ao Serp (o Sistema Eletrônico dos Registros Públicos) — não é um novo sistema, é uma nova identidade de acesso. A falta de acesso ou monitoramento diário pode ser comunicada à Corregedoria.",
        referencia: "Provimento CNJ n. 229/2026 — arts. 228-J a 228-S do CNN/CN/CNJ-Extra",
        providencia: "Implementar rotina de checagem diária das plataformas do Serp e designar responsável interno."
      },
      {
        id: "RI12",
        pergunta: "Quando a serventia atua como 'Cartório Orquestrador' em um pedido, evita transferir ao usuário o ônus de obter certidões ou providências complementares que podem ser resolvidas diretamente com outro cartório ('Cartório de Apoio') por interoperabilidade horizontal?",
        resumo: "A ideia é reduzir a peregrinação do usuário entre cartórios: quando um pedido depende de uma certidão ou providência de outra serventia, o cartório que recebeu o pedido principal (orquestrador) deve buscar isso diretamente, e não mandar o usuário resolver por conta própria. Isso não muda a competência legal de cada cartório.",
        referencia: "Provimento CNJ n. 229/2026 — arts. 228-T a 228-V do CNN/CN/CNJ-Extra",
        providencia: "Mapear fluxos internos de interoperabilidade horizontal com outros cartórios, reduzindo exigências desnecessárias ao usuário."
      },
      {
        id: "RI13",
        pergunta: "Quando uma ordem de indisponibilidade de bens recai sobre imóvel que passou para outra circunscrição de registro, a serventia sabe identificar corretamente onde a averbação deve ser feita?",
        resumo: "Depende do regime do imóvel. Se o imóvel já tem matrícula: a averbação é feita na circunscrição atual do imóvel, mesmo que ele tenha migrado de circunscrição — a serventia de origem não é mais competente para essa averbação. Se o imóvel ainda está no sistema antigo de transcrição e passou para outra circunscrição: a certidão deve ser enviada ao registrador atual, para abertura de matrícula. Só permanece com a serventia de origem quando a transcrição não reúne os requisitos para abertura de matrícula.",
        referencia: "Provimento CNJ n. 217/2026 — art. 320-I, §2º, do CNN/CN/CNJ-Extra; art. 169, I, e art. 176, §18, da Lei n. 6.015/1973",
        providencia: "Consultar o regime do imóvel (matrícula ou transcrição) antes de decidir onde registrar a averbação de indisponibilidade, remetendo ao registrador da circunscrição atual quando aplicável."
      }
    ]
  }
];

/* Agrupamento em dois formulários, exibidos como duas seções no menu lateral */
const GRUPOS = [
  {
    id: "extrajudicial",
    titulo: "CNJ - Inspeção Extrajudicial",
    areas: ["administracao", "financeiro", "rh", "arquivo", "ti", "instalacoes", "pldftp", "ouvidoria", "vulneraveis"]
  },
  {
    id: "registroimoveis",
    titulo: "CNJ - Inspeção Registro de Imóveis",
    areas: ["registroimoveis"]
  }
];

/* Mapa de migração: ids antigos -> ids novos, para que respostas já
   preenchidas antes desta reorganização não sejam perdidas. */
const MIGRACAO_IDS = {
  "F7": "RH9",
  "RH5": "ADM1",
  "RH6": "PLD4",
  "RH8": "ADM2",
  "TI2": "F9",
  "TI4": "F10",
  "TI5": "F11",
  "TI7": "F12",
  "TI9": "IN4",
  "IN3": "AR5"
};

/* Metadados da fonte, exibidos no rodapé/relatório */
const FONTE = {
  titulo: "Relatório de Inspeção Ordinária CNJ (TJSP)",
  inspecao: "Inspeção ordinária da Corregedoria Nacional de Justiça — Foro Extrajudicial",
  tribunal: "Tribunal de Justiça do Estado de São Paulo",
  periodo: "4 a 8 de maio de 2026"
};

/* Links verificados para normas citadas nas referências.
   Só entram aqui links de alta confiança (leis federais estáveis em
   planalto.gov.br, o link informado diretamente pela usuária, ou o link
   citado verbatim no próprio relatório de inspeção). Links que não
   pudemos confirmar com segurança foram removidos — texto sem link
   ainda mostra a referência, só não fica clicável.
   Para adicionar novos, inclua { re: /padrão/gi, url: "https://..." }. */
const NORMA_LINKS = [
  { re: /Provimento CNJ n\.\s?222\/2026/gi, url: "https://atos.cnj.jus.br/atos/detalhar/6882" },
  { re: /Provimento CNJ n\.\s?149\/2023/gi, url: "https://atos.cnj.jus.br/atos/detalhar/5243" },
  { re: /Provimento CNJ n\.\s?213\/2026/gi, url: "https://atos.cnj.jus.br/atos/detalhar/6734" },
  { re: /Provimento CNJ n\.\s?220\/2026/gi, url: "https://atos.cnj.jus.br/atos/detalhar/6873" },
  { re: /Lei n\.\s?6\.015\/1973/gi, url: "https://www.planalto.gov.br/ccivil_03/leis/l6015.htm" },
  { re: /Lei n\.\s?8\.935\/1994/gi, url: "https://www.planalto.gov.br/ccivil_03/leis/l8935.htm" },
  { re: /Decreto n\.\s?9\.580\/2018/gi, url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/decreto/d9580.htm" },
  { re: /Lei n\.\s?13\.709\/2018/gi, url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" },
  { re: /Lei n\.\s?10\.098\/2000/gi, url: "https://www.planalto.gov.br/ccivil_03/leis/l10098.htm" },
  { re: /Lei n\.\s?13\.146\/2015/gi, url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm" },
  { re: /Manual de Orientação Tributária\s?[–-]\s?Cartórios\/RFB/gi, url: "https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/manuais/manual-de-orientacao-tributaria-cartorios/manual-de-orientacao-tributaria-cartorios_v01.pdf/view" }
];
