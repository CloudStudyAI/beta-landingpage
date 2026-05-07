import {
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Compass,
  Gauge,
  GraduationCap,
  Layers3,
  LifeBuoy,
  LineChart,
  Route,
  SearchCheck,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

export const launchNavLinks = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Recursos", href: "#recursos" },
  { label: "Para quem e", href: "#para-quem-e" },
  { label: "Lancamento", href: "#lancamento" },
] as const;

export const heroBadges = [
  "Foco em AWS",
  "Trilha guiada por IA",
  "Simulados inteligentes",
  "Acesso antecipado",
] as const;

export const heroHighlights = [
  "Cloud Practitioner, Solutions Architect e AWS AI Practitioner no radar inicial.",
  "Produto em desenvolvimento com foco em clareza de estudo, diagnostico real e progresso mensuravel.",
] as const;

export const problemItems = [
  {
    title: "Conteudos espalhados",
    description:
      "Cursos, playlists, PDFs e anotacoes desconectadas tornam a preparacao mais lenta do que deveria.",
    icon: Layers3,
  },
  {
    title: "Falta de plano diario",
    description:
      "Sem uma trilha clara, fica dificil saber o que revisar hoje e qual etapa realmente aproxima da prova.",
    icon: Compass,
  },
  {
    title: "Simulados sem diagnostico real",
    description:
      "Muitas questoes mostram apenas acerto ou erro, sem priorizar lacunas ou guiar a proxima revisao.",
    icon: SearchCheck,
  },
  {
    title: "Duvidas dificeis sem contexto",
    description:
      "Perguntar para um chat generico ou procurar em foruns raramente considera o ponto exato da sua jornada.",
    icon: Bot,
  },
  {
    title: "Ansiedade antes da prova",
    description:
      "Sem visibilidade de progresso, a sensacao e estudar bastante e ainda nao saber se esta pronto.",
    icon: ShieldAlert,
  },
] as const;

export const solutionCards = [
  {
    title: "Onboarding inteligente",
    description:
      "Entende objetivo, nivel atual e tempo disponivel para iniciar a jornada com um plano mais realista.",
    icon: Sparkles,
  },
  {
    title: "Trilha adaptativa",
    description:
      "Ajusta o plano conforme sua evolucao para manter ritmo, foco e cobertura dos topicos mais relevantes.",
    icon: Route,
  },
  {
    title: "Simulados inteligentes",
    description:
      "Identificam fraquezas recorrentes e reforcam o que realmente precisa ser revisado antes da prova.",
    icon: BrainCircuit,
  },
  {
    title: "Tutor IA contextual",
    description:
      "Responde considerando o conteudo estudado, o objetivo da certificacao e o momento exato da trilha.",
    icon: Bot,
  },
  {
    title: "Dashboard de progresso",
    description:
      "Mostra visao clara do que ja foi consolidado, do que esta em risco e do proximo passo recomendado.",
    icon: Gauge,
  },
  {
    title: "Career Pathing",
    description:
      "Sugere proximas certificacoes e caminhos em cloud com base nos seus interesses e avancos tecnicos.",
    icon: BriefcaseBusiness,
  },
] as const;

export const audienceCards = [
  {
    title: "Iniciantes em cloud",
    description:
      "Para quem quer sair do estudo solto e ganhar uma trilha mais clara para a primeira certificacao AWS.",
    icon: GraduationCap,
  },
  {
    title: "Devs migrando para AWS",
    description:
      "Para profissionais de desenvolvimento que querem estruturar repertorio cloud com foco em certificacao.",
    icon: LineChart,
  },
  {
    title: "Suporte e infra buscando evolucao",
    description:
      "Para quem ja vive a operacao tecnica e quer transformar experiencia em progressao de carreira.",
    icon: LifeBuoy,
  },
  {
    title: "Estudantes entrando no mercado cloud",
    description:
      "Para quem precisa de direcao, consistencia e uma base pratica para comecar com mais seguranca.",
    icon: Compass,
  },
] as const;

export const certificationCards = [
  {
    title: "AWS Cloud Practitioner",
    description: "Base para construir repertorio cloud e criar uma entrada mais segura no ecossistema AWS.",
  },
  {
    title: "AWS Solutions Architect Associate",
    description: "Trilha para consolidar arquitetura, servicos centrais e tomada de decisao em cenarios reais.",
  },
  {
    title: "AWS AI Practitioner",
    description: "Preparacao inicial para quem quer aproximar cloud, IA generativa e servicos de machine learning.",
  },
  {
    title: "Futuramente",
    description: "DevOps, SysOps, Security e Machine Learning entram no roadmap conforme a plataforma evoluir.",
  },
] as const;

export const experienceSteps = [
  "Voce informa sua meta.",
  "O CLOUDSTUDY monta sua trilha.",
  "Voce estuda com modulos, labs e simulados.",
  "A IA identifica dificuldades.",
  "O plano se ajusta automaticamente.",
] as const;

export const leadCertificationOptions = [
  {
    value: "cloud-practitioner",
    label: "AWS Cloud Practitioner",
  },
  {
    value: "solutions-architect-associate",
    label: "AWS Solutions Architect Associate",
  },
  {
    value: "aws-ai-practitioner",
    label: "AWS AI Practitioner",
  },
  {
    value: "devops-sysops-security-ml",
    label: "DevOps, SysOps, Security ou Machine Learning",
  },
] as const;
