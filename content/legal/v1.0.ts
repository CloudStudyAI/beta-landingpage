export type LegalSection = {
  title: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type LegalDocument = {
  slug: "termos" | "privacidade" | "cancelamento-e-reembolso";
  title: string;
  shortTitle: string;
  description: string;
  version: string;
  effectiveDate: string;
  sections: readonly LegalSection[];
};

export const LEGAL_VERSION = "1.0";
export const LEGAL_EFFECTIVE_DATE_ISO = "2026-08-24";
export const LEGAL_EFFECTIVE_DATE_LABEL = "24 de agosto de 2026";

export const LEGAL_OPERATOR = {
  brand: "Cloud Study",
  legalName: "64.919.190 THIAGO CARDOSO DAVI",
  cnpj: "64.919.190/0001-28",
  cityState: "São Paulo/SP, Brasil",
  supportEmail: "suporte@cloudstudy.com.br",
  privacyEmail: "privacidade@cloudstudy.com.br",
} as const;

export const TERMS_DOCUMENT: LegalDocument = {
  slug: "termos",
  title: "Termos de Uso da Cloud Study",
  shortTitle: "Termos de Uso",
  description: "Condições para criação de conta, uso da plataforma, assinaturas, conteúdo educacional e responsabilidades.",
  version: LEGAL_VERSION,
  effectiveDate: LEGAL_EFFECTIVE_DATE_LABEL,
  sections: [
    {
      title: "1. Identificação, alcance e aceite",
      paragraphs: [
        `Estes Termos regulam o uso da plataforma Cloud Study, nome comercial operado atualmente por ${LEGAL_OPERATOR.legalName}, CNPJ ${LEGAL_OPERATOR.cnpj}, com operação em ${LEGAL_OPERATOR.cityState}. O canal oficial para suporte contratual é ${LEGAL_OPERATOR.supportEmail}.`,
        "Ao criar uma conta, o usuário manifesta aceite eletrônico expresso destes Termos por meio de ação afirmativa própria. A Cloud Study registra evidências técnicas desse aceite, incluindo versão dos documentos, data e hora registradas pelo servidor, origem do aceite e dados técnicos de segurança, como endereço IP e identificação do navegador/dispositivo, na medida necessária para auditoria, prevenção a fraude, exercício regular de direitos e cumprimento de obrigações legais.",
        "A aceitação destes Termos não implica renúncia a direitos assegurados por normas obrigatórias, especialmente o Código de Defesa do Consumidor e a legislação de proteção de dados aplicável.",
      ],
    },
    {
      title: "2. Objeto do serviço",
      paragraphs: [
        "A Cloud Study fornece uma plataforma digital de preparação para certificações profissionais, com recursos que podem incluir trilhas de estudo, aulas, materiais de revisão, flashcards, questões autorais, simulados, métricas de desempenho, histórico, recomendações, plano de estudos e recursos assistidos por software ou inteligência artificial.",
        "O escopo efetivamente contratado é aquele apresentado na oferta e no resumo de contratação correspondente ao plano escolhido pelo usuário. Recursos, certificações e funcionalidades não indicados como incluídos na oferta não integram automaticamente a contratação.",
      ],
    },
    {
      title: "3. Natureza educacional e ausência de garantia de aprovação",
      paragraphs: [
        "A Cloud Study é uma ferramenta de preparação educacional. Não aplicamos, corrigimos ou controlamos os exames oficiais das entidades certificadoras e não garantimos aprovação, pontuação mínima, contratação, promoção profissional, aumento salarial ou qualquer resultado acadêmico, profissional ou financeiro.",
        "Resultados de simulados, indicadores de prontidão, recomendações e estimativas de desempenho são referências de estudo e não equivalem ao resultado de um exame oficial.",
      ],
    },
    {
      title: "4. Independência e marcas de terceiros",
      paragraphs: [
        "A Cloud Study é independente e não é afiliada, patrocinada, endossada ou operada pela Amazon Web Services, Inc., Amazon.com, Inc. ou por outras entidades certificadoras, salvo se uma parceria específica vier a ser informada expressamente e por escrito.",
        "AWS, Amazon Web Services, nomes de certificações, marcas, logotipos e demais sinais distintivos de terceiros pertencem aos seus respectivos titulares e são mencionados apenas para identificação dos conteúdos e objetivos de estudo.",
      ],
    },
    {
      title: "5. Integridade dos exames e materiais confidenciais",
      paragraphs: [
        "Os materiais, questões e simulados da Cloud Study são destinados à preparação educacional e não são apresentados como cópias de questões oficiais ou conteúdo confidencial de exames.",
        "É proibido utilizar a plataforma para inserir, armazenar, publicar, vender, compartilhar ou solicitar dumps, questões memorizadas de provas reais, conteúdo confidencial de exame ou qualquer material obtido em violação de regras de uma entidade certificadora.",
      ],
    },
    {
      title: "6. Conta, credenciais e veracidade das informações",
      paragraphs: [
        "A conta é pessoal e destinada ao próprio usuário cadastrado. O usuário deve fornecer dados verdadeiros e manter suas credenciais sob controle razoável de segurança.",
        "O usuário é responsável por comunicar prontamente suspeitas de acesso indevido. A Cloud Study poderá exigir nova autenticação ou verificações adicionais quando identificar sinais razoáveis de comprometimento, fraude ou uso incompatível com estes Termos.",
      ],
    },
    {
      title: "7. Licença de uso",
      paragraphs: [
        "Durante a vigência do acesso contratado, concedemos ao usuário uma licença limitada, pessoal, revogável nos limites destes Termos, não exclusiva, não sublicenciável e não transferível para acessar os recursos disponibilizados ao seu plano.",
        "A contratação não transfere propriedade intelectual sobre software, banco de questões, textos, explicações, imagens, vídeos, design, estrutura pedagógica, bases de dados ou demais materiais da Cloud Study.",
      ],
    },
    {
      title: "8. Usos proibidos e proteção da plataforma",
      paragraphs: [
        "Sem prejuízo de outras condutas ilícitas ou incompatíveis com a finalidade do serviço, é proibido:",
      ],
      bullets: [
        "compartilhar, vender, alugar, emprestar ou transferir a conta ou o acesso contratado;",
        "copiar, baixar em massa, reproduzir, republicar ou redistribuir questões, explicações, aulas, flashcards ou outros conteúdos além do uso pessoal permitido;",
        "usar scraping, crawlers, bots, automações, extensões ou scripts para extrair conteúdo, contornar limites ou reproduzir a base de dados;",
        "utilizar conteúdo da Cloud Study para criar banco concorrente, dataset, material comercial ou treinar/ajustar modelos de inteligência artificial sem autorização escrita;",
        "realizar engenharia reversa, exploração de vulnerabilidades, evasão de controles de acesso, fraude, interferência deliberada, ataques de disponibilidade ou tentativa de obter acesso não autorizado;",
        "usar a plataforma para transmitir malware, conteúdo ilícito ou material que viole direitos de terceiros.",
      ],
    },
    {
      title: "9. Detecção de abuso, suspensão e encerramento",
      paragraphs: [
        "Podemos aplicar controles proporcionais de segurança e antifraude, inclusive análise de padrões de sessão, volume de requisições, acessos simultâneos e eventos de pagamento, para proteger usuários, conteúdo e infraestrutura.",
        "A conta poderá ser temporariamente limitada ou suspensa quando houver indícios razoáveis de fraude, compartilhamento de acesso, extração automatizada, ataque, violação relevante de propriedade intelectual, inadimplência ou outra violação material destes Termos. Quando a natureza do caso permitir, o usuário poderá solicitar revisão pelo suporte.",
        "A suspensão por violação não elimina direitos legais do consumidor nem autoriza retenção de valores em hipóteses nas quais a legislação imponha restituição.",
      ],
    },
    {
      title: "10. Planos, preços e resumo da contratação",
      paragraphs: [
        "Antes da finalização de uma compra, a Cloud Study apresenta ao usuário o produto ou certificação, ciclo de cobrança, preço total, moeda, forma de pagamento e demais condições relevantes da oferta. A contratação é vinculada à versão e ao resumo comercial apresentados naquele momento.",
        "Para fins de segurança e prova da contratação, podemos conservar um snapshot técnico da oferta aceita, contendo identificadores do plano, preço em centavos, moeda, ciclo de cobrança, certificação, identificador da transação e versões das políticas aplicáveis.",
      ],
    },
    {
      title: "11. Assinaturas mensais e anuais, renovação e cobrança",
      paragraphs: [
        "Planos mensais contratados como assinatura são cobrados no valor mensal informado na oferta e renovados a cada ciclo até cancelamento, salvo condição promocional ou modalidade expressamente diferente.",
        "Planos anuais contratados como assinatura têm o valor anual informado cobrado de acordo com a oferta e são renovados no ciclo anual até cancelamento, quando a oferta indicar renovação automática. O valor equivalente mensal exibido para um plano anual é apenas referência de comparação; o valor efetivamente cobrado é o total anual indicado no resumo da contratação.",
        "Quando houver modalidade pré-paga sem renovação automática, essa característica será informada expressamente antes do pagamento.",
      ],
    },
    {
      title: "12. Alteração de preços",
      paragraphs: [
        "Alterações de preço não modificam retroativamente um período já pago. Quando aplicável a uma renovação futura, a Cloud Study deverá comunicar a mudança de forma adequada antes da cobrança, permitindo que o usuário cancele a renovação caso não concorde.",
      ],
    },
    {
      title: "13. Processamento de pagamento",
      paragraphs: [
        "Os pagamentos podem ser processados por provedores especializados, atualmente incluindo a Stripe. A Cloud Study não precisa armazenar o número completo do cartão ou CVC para operar a cobrança.",
        "A utilização de um processador de pagamento não transfere ao usuário responsabilidades que a legislação atribua à Cloud Study como fornecedora. Eventos assinados do provedor são utilizados para confirmar pagamento, renovação, falha, cancelamento e outros estados financeiros.",
      ],
    },
    {
      title: "14. Falha de pagamento e restabelecimento",
      paragraphs: [
        "Em caso de falha, recusa, expiração ou inadimplência, o acesso pago poderá permanecer pendente, ser limitado ou ser suspenso de acordo com o estado da cobrança e as regras do plano. Pagamentos posteriormente regularizados serão reconciliados com o acesso correspondente quando tecnicamente confirmados.",
      ],
    },
    {
      title: "15. Cancelamento",
      paragraphs: [
        "O usuário pode solicitar ou efetuar o cancelamento pelos meios disponibilizados na plataforma ou pelo canal de suporte. Em assinaturas recorrentes, o cancelamento impede cobranças futuras depois do período já contratado, respeitadas as informações exibidas no momento da contratação e os direitos legais aplicáveis.",
        "Quando o acesso permanecer válido até o fim do período já pago, o cancelamento da renovação não encerra necessariamente o acesso de forma imediata.",
      ],
    },
    {
      title: "16. Direito de arrependimento e reembolsos",
      paragraphs: [
        "Nas contratações sujeitas ao direito de arrependimento previsto no art. 49 do Código de Defesa do Consumidor, o consumidor pode desistir da contratação no prazo legal de 7 (sete) dias, com restituição dos valores conforme a legislação aplicável.",
        "Após esse prazo, o mero cancelamento de renovação não gera automaticamente reembolso proporcional de período já contratado, sem prejuízo de reembolso ou correção em situações de cobrança indevida, duplicidade, descumprimento da oferta, falha imputável ao fornecedor ou qualquer outra hipótese em que a legislação determine restituição.",
        "As regras operacionais estão detalhadas na Política de Cancelamento e Reembolso, que integra estas condições para a contratação.",
      ],
    },
    {
      title: "17. Contestações, chargebacks e prevenção a fraude",
      paragraphs: [
        "O usuário mantém o direito de contestar cobranças legítima e adequadamente pelos canais disponíveis. Em caso de disputa, a Cloud Study poderá apresentar ao processador de pagamento e às autoridades competentes evidências pertinentes da contratação e do uso, como versão dos termos aceitos, data e hora, snapshot da oferta, eventos de pagamento e registros técnicos de acesso, observada a legislação de proteção de dados.",
        "Fraude deliberada, falsificação de informações ou abuso do mecanismo de disputa poderá resultar em suspensão do acesso e adoção das medidas cabíveis, sem impedir o exercício de direitos legítimos do consumidor.",
      ],
    },
    {
      title: "18. Atualização de conteúdo e mudanças em exames",
      paragraphs: [
        "Certificações, guias de exame e serviços de terceiros podem ser alterados sem controle da Cloud Study. Podemos atualizar, corrigir, substituir ou retirar conteúdo obsoleto para preservar a utilidade pedagógica, sem descaracterizar de forma injustificada o objeto essencial da oferta já contratada.",
        "Quantidade de questões, módulos, recursos e organização podem evoluir ao longo do tempo, desde que sejam respeitadas as condições essenciais anunciadas ao usuário.",
      ],
    },
    {
      title: "19. Recursos automatizados e inteligência artificial",
      paragraphs: [
        "Recomendações, resumos, estimativas, explicações ou outros resultados produzidos ou auxiliados por sistemas automatizados podem conter imprecisões. O usuário deve utilizá-los como apoio de estudo e conferir informações relevantes em fontes confiáveis quando necessário.",
      ],
    },
    {
      title: "20. Disponibilidade e manutenção",
      paragraphs: [
        "A Cloud Study empregará esforços razoáveis para manter o serviço disponível e preservar o acesso contratado, mas não oferece garantia de disponibilidade ininterrupta ou de ausência absoluta de erros, salvo se um nível de serviço específico for contratado por escrito.",
        "Manutenções, incidentes de infraestrutura, indisponibilidade de fornecedores ou eventos fora de controle razoável podem causar interrupções temporárias. Direitos do consumidor decorrentes de falhas relevantes permanecem preservados.",
      ],
    },
    {
      title: "21. Propriedade intelectual",
      paragraphs: [
        "O software, identidade visual, organização da plataforma, conteúdo autoral, questões, explicações, materiais, bases e demais ativos próprios são protegidos pela legislação aplicável. Nenhuma disposição destes Termos concede licença para uso comercial, reprodução em massa ou exploração fora do acesso pessoal contratado.",
      ],
    },
    {
      title: "22. Comunicações",
      paragraphs: [
        "Podemos enviar comunicações necessárias à execução do contrato, segurança da conta, cobrança, alterações relevantes do serviço e suporte. Comunicações promocionais serão tratadas separadamente quando a legislação ou a base legal aplicável exigir escolha específica do usuário.",
      ],
    },
    {
      title: "23. Privacidade e retenção de evidências",
      paragraphs: [
        "O tratamento de dados pessoais é descrito na Política de Privacidade. Registros necessários para comprovar contratação, pagamento, prevenção a fraude, segurança, cumprimento de obrigação legal ou exercício regular de direitos podem ser mantidos pelo período necessário à respectiva finalidade, inclusive após encerramento da conta quando houver fundamento legal para retenção.",
      ],
    },
    {
      title: "24. Alterações destes Termos",
      paragraphs: [
        "Cada versão destes Termos possui identificação e data de vigência. Alterações materiais serão comunicadas de forma adequada e, quando necessário, poderão exigir novo aceite expresso. O histórico de aceite do usuário continua associado à versão efetivamente aceita.",
      ],
    },
    {
      title: "25. Responsabilidade e direitos obrigatórios",
      paragraphs: [
        "Nenhuma cláusula pretende excluir ou limitar responsabilidade em situações nas quais tal exclusão ou limitação seja proibida por lei. A Cloud Study não responde por resultados de exame ou decisões profissionais autônomas do usuário, mas permanece responsável pelas obrigações que lhe sejam legalmente atribuídas como fornecedora do serviço.",
      ],
    },
    {
      title: "26. Legislação aplicável e solução de dúvidas",
      paragraphs: [
        `Aplicam-se as leis da República Federativa do Brasil, inclusive normas de proteção ao consumidor quando cabíveis. Dúvidas, solicitações contratuais, cancelamentos e reclamações podem ser encaminhados para ${LEGAL_OPERATOR.supportEmail}. Nada nestes Termos restringe o acesso do consumidor aos órgãos administrativos ou ao Poder Judiciário nos casos previstos em lei.`,
      ],
    },
  ],
};

export const PRIVACY_DOCUMENT: LegalDocument = {
  slug: "privacidade",
  title: "Política de Privacidade da Cloud Study",
  shortTitle: "Privacidade",
  description: "Como a Cloud Study coleta, utiliza, compartilha, protege e conserva dados pessoais.",
  version: LEGAL_VERSION,
  effectiveDate: LEGAL_EFFECTIVE_DATE_LABEL,
  sections: [
    {
      title: "1. Controlador e contato",
      paragraphs: [
        `Esta Política descreve o tratamento de dados realizado pela Cloud Study, operada atualmente por ${LEGAL_OPERATOR.legalName}, CNPJ ${LEGAL_OPERATOR.cnpj}, em ${LEGAL_OPERATOR.cityState}. Para assuntos de privacidade e exercício de direitos, utilize ${LEGAL_OPERATOR.privacyEmail}.`,
      ],
    },
    {
      title: "2. Dados que podemos tratar",
      paragraphs: ["Dependendo de como o usuário utiliza a plataforma, podemos tratar as seguintes categorias de dados:"],
      bullets: [
        "cadastro e conta: nome, e-mail, identificadores internos e estado da conta;",
        "autenticação e segurança: sessões, tokens protegidos, data e hora de acesso, endereço IP, user-agent, eventos de segurança e sinais antifraude;",
        "estudo: certificação escolhida, onboarding, plano de estudo, progresso, respostas, simulados, flashcards, notas, desempenho e histórico;",
        "contratação: plano, preço, moeda, periodicidade, status de assinatura, identificadores Stripe e eventos financeiros necessários à reconciliação;",
        "evidência contratual: versão dos termos/políticas aceitos, data e hora do servidor, origem do aceite, endereço IP, user-agent e snapshot da oferta quando aplicável;",
        "suporte e comunicação: mensagens, solicitações, protocolos e informações fornecidas voluntariamente pelo usuário.",
      ],
    },
    {
      title: "3. Finalidades",
      paragraphs: ["Tratamos dados para finalidades compatíveis com a operação do serviço, incluindo:"],
      bullets: [
        "criar, autenticar, proteger e administrar contas;",
        "entregar conteúdo, personalizar trilhas, calcular desempenho e manter progresso;",
        "processar e reconciliar pagamentos, assinaturas, cancelamentos e reembolsos;",
        "prevenir fraude, abuso, compartilhamento indevido e incidentes de segurança;",
        "registrar e comprovar aceite contratual e condições de compra;",
        "atender suporte e exercer direitos e obrigações legais;",
        "melhorar confiabilidade, usabilidade e desempenho do produto com dados adequados à finalidade.",
      ],
    },
    {
      title: "4. Bases legais",
      paragraphs: [
        "A Cloud Study não depende de uma única base legal para todo tratamento. Conforme a finalidade e o contexto, o tratamento poderá se apoiar na execução de contrato e procedimentos preliminares, cumprimento de obrigação legal ou regulatória, exercício regular de direitos, legítimo interesse observado o balanceamento aplicável, proteção contra fraude e, quando juridicamente adequado, consentimento.",
        "O aceite dos Termos de Uso não deve ser confundido com consentimento genérico para todo tratamento de dados. Quando consentimento específico for necessário, ele será solicitado de forma destacada.",
      ],
    },
    {
      title: "5. Evidências de aceite e contratação",
      paragraphs: [
        "Para preservar prova auditável da relação contratual, registramos o aceite no servidor e vinculamos a versão exata dos documentos aplicáveis ao usuário. O registro pode incluir data e hora em UTC, endereço IP resolvido por infraestrutura confiável, user-agent, origem da ação, versão e referência imutável do conteúdo legal.",
        "No início de uma compra, também podemos registrar um snapshot da oferta selecionada, incluindo plano, periodicidade, preço, moeda, certificação e identificadores da transação. Esses registros não substituem os direitos do consumidor; servem para segurança, transparência, prevenção a fraude e exercício regular de direitos.",
      ],
    },
    {
      title: "6. Pagamentos e Stripe",
      paragraphs: [
        "Os pagamentos são processados por provedores especializados, atualmente incluindo a Stripe. Dados completos de cartão e CVC são tratados pelo ambiente de pagamento aplicável e não precisam ser armazenados pela Cloud Study.",
        "Recebemos e conservamos identificadores e estados necessários, como Customer, Checkout Session, assinatura, fatura, Payment Intent, cobrança, meio de pagamento em nível não sensível, valores, moeda, datas e status.",
      ],
    },
    {
      title: "7. Cookies, sessão e armazenamento local",
      paragraphs: [
        "Podemos utilizar cookies e armazenamento local para autenticação, segurança, preferências, experiência e cache controlado. Cookies estritamente necessários podem ser usados para funcionamento e proteção do serviço. Tecnologias opcionais de analytics ou marketing, quando adotadas, deverão ser inventariadas e tratadas de acordo com a base legal e os controles aplicáveis.",
      ],
    },
    {
      title: "8. Compartilhamento com prestadores",
      paragraphs: [
        "Dados podem ser compartilhados, de forma limitada à finalidade, com provedores que sustentam autenticação, infraestrutura, hospedagem, banco de dados, segurança, e-mail, suporte, analytics e pagamentos. Esses terceiros recebem apenas os dados necessários para executar seus serviços ou cumprir obrigações legais próprias.",
        "Também poderemos compartilhar informações quando houver obrigação legal, ordem válida de autoridade competente, necessidade de defesa de direitos ou investigação de fraude e incidentes.",
      ],
    },
    {
      title: "9. Transferências internacionais",
      paragraphs: [
        "Alguns fornecedores de tecnologia podem processar dados fora do Brasil. Quando houver transferência internacional de dados pessoais, a Cloud Study adotará mecanismos e salvaguardas compatíveis com a LGPD e a regulamentação aplicável.",
      ],
    },
    {
      title: "10. Retenção",
      paragraphs: [
        "Conservamos dados pelo tempo necessário às finalidades informadas e, quando aplicável, por períodos adicionais exigidos ou permitidos para obrigações legais, fiscais, contábeis, prevenção a fraude, segurança, resolução de disputas e exercício regular de direitos.",
        "A exclusão de uma conta não implica necessariamente eliminação imediata de todos os registros quando houver fundamento legal para retenção. Quando a identificação direta deixar de ser necessária, podemos adotar anonimização, dissociação ou minimização compatível com a finalidade residual.",
      ],
    },
    {
      title: "11. Segurança",
      paragraphs: [
        "Adotamos medidas técnicas e organizacionais compatíveis com o risco, incluindo autenticação, controles de autorização e ownership, proteção de credenciais, registros de segurança, limitação de abuso e uso de provedores especializados para dados sensíveis de pagamento. Nenhum sistema é absolutamente imune a incidentes, e procedimentos de resposta serão aplicados quando necessários.",
      ],
    },
    {
      title: "12. Direitos do titular",
      paragraphs: [
        `O titular pode solicitar, conforme os requisitos e limites legais, confirmação da existência de tratamento, acesso, correção, informações sobre compartilhamento, portabilidade quando aplicável, oposição, anonimização, bloqueio ou eliminação de dados tratados em desconformidade, revogação de consentimento quando essa for a base aplicável e revisão de decisões automatizadas nos termos legais. Solicitações devem ser enviadas para ${LEGAL_OPERATOR.privacyEmail}.`,
        "Poderemos solicitar informações adicionais para verificar a identidade do solicitante e proteger os dados contra acesso indevido.",
      ],
    },
    {
      title: "13. Recursos automatizados",
      paragraphs: [
        "A plataforma pode usar dados de estudo para gerar recomendações, priorização de conteúdos, indicadores de prontidão e outras personalizações. Esses recursos são voltados ao apoio educacional. Quando uma decisão exclusivamente automatizada produzir efeitos juridicamente relevantes sobre interesses do titular, serão observados os direitos previstos na legislação aplicável.",
      ],
    },
    {
      title: "14. Crianças e adolescentes",
      paragraphs: [
        "A Cloud Study não é dirigida prioritariamente a crianças. Caso identifiquemos tratamento que exija salvaguardas específicas para crianças ou adolescentes, adotaremos as medidas legalmente necessárias e poderemos restringir o cadastro até que os requisitos sejam atendidos.",
      ],
    },
    {
      title: "15. Alterações desta Política",
      paragraphs: [
        "Cada versão possui número e data de vigência. Mudanças relevantes serão comunicadas de forma adequada. O histórico técnico preserva qual versão estava vigente e qual foi apresentada em cada aceite registrado.",
      ],
    },
    {
      title: "16. Contato",
      paragraphs: [
        `Para exercer direitos ou esclarecer dúvidas sobre dados pessoais, escreva para ${LEGAL_OPERATOR.privacyEmail}. Para suporte geral, utilize ${LEGAL_OPERATOR.supportEmail}.`,
      ],
    },
  ],
};

export const REFUND_DOCUMENT: LegalDocument = {
  slug: "cancelamento-e-reembolso",
  title: "Política de Cancelamento e Reembolso",
  shortTitle: "Cancelamento e Reembolso",
  description: "Regras de cancelamento, renovação, direito de arrependimento, estornos e cobranças indevidas.",
  version: LEGAL_VERSION,
  effectiveDate: LEGAL_EFFECTIVE_DATE_LABEL,
  sections: [
    {
      title: "1. Transparência antes da compra",
      paragraphs: [
        "Antes do pagamento, a Cloud Study apresenta a certificação ou produto, periodicidade, preço total, moeda e condições relevantes da contratação. Em plano anual, o equivalente mensal é mera referência; o total anual informado é o valor da cobrança do ciclo anual.",
      ],
    },
    {
      title: "2. Assinaturas mensais",
      paragraphs: [
        "Assinaturas mensais são renovadas a cada ciclo no valor vigente informado ao usuário até que sejam canceladas, salvo se a oferta específica indicar modalidade diferente. O cancelamento impede a renovação futura após o período já contratado.",
      ],
    },
    {
      title: "3. Assinaturas anuais",
      paragraphs: [
        "Assinaturas anuais são cobradas pelo valor total anual indicado no resumo da contratação e, quando a oferta indicar renovação automática, renovam-se no ciclo anual até cancelamento. O usuário deve considerar o valor total anual, não apenas o equivalente mensal exibido para comparação.",
      ],
    },
    {
      title: "4. Modalidades pré-pagas",
      paragraphs: [
        "Quando uma oferta for identificada como pré-paga e sem renovação automática, o acesso vigora pelo período contratado e não gera nova cobrança automática ao final, salvo nova contratação pelo usuário.",
      ],
    },
    {
      title: "5. Direito de arrependimento",
      paragraphs: [
        "Quando aplicável o art. 49 do Código de Defesa do Consumidor às compras realizadas fora do estabelecimento comercial, inclusive pela internet, o consumidor poderá exercer o direito de arrependimento no prazo legal de 7 (sete) dias, contado na forma prevista em lei, sem necessidade de justificar a desistência.",
        "Recebida a solicitação válida dentro do prazo legal, serão adotadas as providências de cancelamento e restituição de acordo com a legislação e com os procedimentos do meio de pagamento utilizado.",
      ],
    },
    {
      title: "6. Cancelamento após o prazo de arrependimento",
      paragraphs: [
        "Após o prazo legal de arrependimento, o cancelamento de uma assinatura interrompe renovações futuras. Ele não gera automaticamente reembolso proporcional do período já contratado e disponibilizado, ressalvadas as hipóteses legais, descumprimento da oferta, falha relevante atribuível à Cloud Study ou condição promocional expressa mais favorável ao consumidor.",
      ],
    },
    {
      title: "7. Cobrança indevida, duplicada ou divergente",
      paragraphs: [
        "Se o usuário identificar cobrança duplicada, valor divergente do resumo contratado, renovação depois de cancelamento efetivo ou outra cobrança potencialmente indevida, deve comunicar o suporte com as informações necessárias para localização da transação. A Cloud Study analisará os registros e adotará correção ou restituição quando devida.",
      ],
    },
    {
      title: "8. Falha relevante do serviço",
      paragraphs: [
        "Indisponibilidades relevantes ou descumprimento material da oferta serão avaliados conforme a extensão do problema, o período afetado e os direitos legais aplicáveis. Esta Política não limita remédios previstos em normas obrigatórias de proteção do consumidor.",
      ],
    },
    {
      title: "9. Como cancelar ou solicitar reembolso",
      paragraphs: [
        `O usuário pode utilizar as ferramentas de gerenciamento disponibilizadas na conta ou entrar em contato pelo e-mail ${LEGAL_OPERATOR.supportEmail}. A solicitação deve permitir a identificação segura da conta e da cobrança.`,
        "Solicitações de arrependimento receberão confirmação de recebimento pelo canal aplicável e serão processadas conforme as regras do meio de pagamento e a legislação vigente.",
      ],
    },
    {
      title: "10. Prazos bancários e processamento",
      paragraphs: [
        "Depois que a Cloud Study autorizar um estorno ou reembolso, o prazo de visualização do crédito pode depender da instituição financeira, bandeira, processador e fechamento da fatura. A confirmação de processamento não significa necessariamente crédito instantâneo na conta do usuário.",
      ],
    },
    {
      title: "11. Chargebacks e disputas",
      paragraphs: [
        "O usuário não perde o direito de contestar cobrança legítima e adequadamente. Antes de abrir uma disputa, recomendamos contato com o suporte para resolução mais rápida quando possível.",
        "Em disputas, a Cloud Study poderá encaminhar ao processador evidências pertinentes da contratação, incluindo versão dos termos, timestamp de aceite, resumo da oferta, histórico de cancelamento, uso do serviço e eventos de pagamento, sempre com observância à legislação de proteção de dados.",
      ],
    },
    {
      title: "12. Versão e contato",
      paragraphs: [
        `Esta Política integra as condições da contratação e está na versão ${LEGAL_VERSION}, vigente desde ${LEGAL_EFFECTIVE_DATE_LABEL}. Dúvidas devem ser encaminhadas para ${LEGAL_OPERATOR.supportEmail}.`,
      ],
    },
  ],
};

export const LEGAL_DOCUMENTS = [TERMS_DOCUMENT, PRIVACY_DOCUMENT, REFUND_DOCUMENT] as const;
