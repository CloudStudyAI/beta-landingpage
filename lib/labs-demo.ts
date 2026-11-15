// Regras da demonstração de laboratórios da landing.
//
// A landing não consulta o backend, então a demonstração é uma versão reduzida de um lab real
// do System_Dashboard (web/content/labs, ADR 0022): "Segure a Black Friday da Pipoca Store"
// (SAA-C03), sem a peça de escala automática. Horários, acessos, erros e custos são os mesmos
// que o motor do backend devolve; o teste em tests/ fixa esses números. Se o lab mudar no
// produto, a demonstração muda junto.

export type NimboMood = "idle" | "happy" | "worried" | "alarm";

export type DemoCheck = { id: string; label: string; passed: boolean; feedback: string };

export type BoardPieceId = "server" | "replica" | "cache";

export type BoardDemoState = Record<BoardPieceId, boolean>;

export const BOARD_DEMO_INITIAL: BoardDemoState = { server: false, replica: false, cache: false };

export const BOARD_BASE_COST = 485;
export const BOARD_BUDGET = 900;

export const BOARD_PIECES: readonly { id: BoardPieceId; name: string; service: string; cost: number; slot: string }[] = [
  { id: "server", name: "Servidor", service: "EC2", cost: 140, slot: "cabe um servidor" },
  { id: "replica", name: "Réplica do banco", service: "RDS Multi-AZ", cost: 210, slot: "cabe a réplica do banco" },
  { id: "cache", name: "Cache", service: "ElastiCache", cost: 70, slot: "cabe um cache" },
];

/** Os quatro momentos da noite, com os acessos por minuto do lab real. */
export const NIGHT: readonly { id: string; clock: string; title: string; demand: number; zoneADown: boolean }[] = [
  { id: "18h", clock: "18:00", title: "loja abre", demand: 2000, zoneADown: false },
  { id: "20h", clock: "20:00", title: "pico de acessos", demand: 12400, zoneADown: false },
  { id: "22h", clock: "22:00", title: "a Zona A cai", demand: 8000, zoneADown: true },
  { id: "00h", clock: "00:00", title: "fim da noite", demand: 3000, zoneADown: false },
];

export function boardDemoCost(state: BoardDemoState): number {
  return BOARD_PIECES.reduce((total, piece) => total + (state[piece.id] ? piece.cost : 0), BOARD_BASE_COST);
}

/** Percentual de pedidos com erro em cada momento da noite. */
export function nightErrors(state: BoardDemoState): number[] {
  return [0, state.server ? 0 : 31, state.server && state.replica ? 0 : 100, 0];
}

export function boardDemoGoals(state: BoardDemoState): DemoCheck[] {
  const cost = boardDemoCost(state);
  const survivesZone = state.server && state.replica;
  return [
    {
      id: "peak",
      label: "Aguentar o pico sem erro",
      passed: state.server,
      feedback: state.server ? "Dois servidores dividiram o pico das 20h." : "Às 20h um servidor só não deu conta: 31% dos pedidos falharam.",
    },
    {
      id: "zone-failure",
      label: "Sobreviver à queda de uma zona",
      passed: survivesZone,
      feedback: survivesZone
        ? "Às 22h a Zona A caiu e a Zona B assumiu servidor e banco."
        : state.server
          ? "Às 22h a Zona A caiu e levou o banco junto: faltou a réplica."
          : "Às 22h a Zona A caiu. Estava tudo nela e a loja saiu do ar.",
    },
    {
      id: "budget",
      label: `Gastar até R$ ${BOARD_BUDGET} por mês`,
      passed: cost <= BOARD_BUDGET,
      feedback: cost <= BOARD_BUDGET ? `A arquitetura custa R$ ${cost} por mês.` : `R$ ${cost} por mês passa do orçamento. Tem peça sobrando.`,
    },
  ];
}

// ---------- o que o visor mostra ----------

export type FlowTone = "ok" | "bad" | "off";
export type TickStatus = "wait" | "now" | "ok" | "bad";

export type LabView = {
  hud: string;
  live: "idle" | "run" | "alarm";
  clock: string;
  mood: NimboMood;
  caption: string;
  demand: number;
  /** null enquanto a noite não está rodando. */
  errorPercent: number | null;
  intensity: "calm" | "peak";
  zoneADown: boolean;
  serverHot: boolean;
  placed: BoardDemoState;
  flowA: FlowTone;
  flowB: FlowTone;
  cost: number;
  ticks: TickStatus[];
};

/**
 * Visor num instante: `at` é null antes de rodar, o índice do momento enquanto a noite roda,
 * ou "done" no fim. O Nimbo só comenta o que já aconteceu na noite.
 */
export function boardView(state: BoardDemoState, at: number | "done" | null, idleCaption = "Sua vez. Encaixe as peças e rode a noite."): LabView {
  const errors = nightErrors(state);
  const cost = boardDemoCost(state);
  const placed = { ...state };

  if (at === null) {
    return {
      hud: "pronto para rodar",
      live: "idle",
      clock: NIGHT[0].clock,
      mood: "idle",
      caption: idleCaption,
      demand: NIGHT[0].demand,
      errorPercent: null,
      intensity: "calm",
      zoneADown: false,
      serverHot: false,
      placed,
      flowA: "ok",
      flowB: state.server ? "ok" : "off",
      cost,
      ticks: NIGHT.map(() => "wait"),
    };
  }

  const index = at === "done" ? NIGHT.length - 1 : at;
  const moment = NIGHT[index];
  const error = errors[index];
  const ticks = NIGHT.map((_, tick): TickStatus => {
    if (tick > index) return "wait";
    if (tick === index && at !== "done") return errors[tick] > 0 ? "bad" : "now";
    return errors[tick] > 0 ? "bad" : "ok";
  });

  let mood: NimboMood = error >= 100 ? "alarm" : error > 0 ? "worried" : "idle";
  let caption: string;
  if (at === "done") {
    const missing = boardDemoGoals(state).filter((goal) => !goal.passed);
    mood = missing.length === 0 ? "happy" : "worried";
    caption =
      missing.length === 0
        ? `Fechou! A noite passou inteira por R$ ${cost} por mês.`
        : missing.length === 1 && missing[0].id === "budget"
          ? `A noite passou, mas R$ ${cost} estoura o orçamento. Tem peça sobrando.`
          : missing.length === 1
            ? "A noite terminou com 1 meta por cumprir."
            : `A noite terminou com ${missing.length} metas por cumprir.`;
  } else if (index === 0) {
    caption = "18h. Loja aberta, tudo tranquilo.";
  } else if (index === 1) {
    caption = error > 0 ? "20h. Um servidor só não aguenta: 31% dos pedidos falham." : "20h. O pico chegou e os dois servidores seguraram.";
  } else if (index === 2) {
    caption =
      error === 0
        ? "22h. A Zona A caiu e a Zona B assumiu tudo."
        : state.server
          ? "22h. A Zona A caiu e levou o banco junto. Falta a réplica."
          : "22h. A Zona A caiu. Estava tudo nela: a loja saiu do ar.";
  } else {
    caption = "00h. A zona voltou e o movimento baixou.";
  }

  const zoneADown = at !== "done" && moment.zoneADown;
  return {
    hud: at === "done" ? "noite encerrada" : "rodando a noite",
    live: error >= 100 ? "alarm" : at === "done" ? "idle" : "run",
    clock: moment.clock,
    mood,
    caption,
    demand: moment.demand,
    errorPercent: at === "done" ? null : error,
    intensity: index === 1 && at !== "done" ? "peak" : "calm",
    zoneADown,
    serverHot: index === 1 && at !== "done" && !state.server,
    placed,
    flowA: zoneADown ? (error > 0 ? "bad" : "off") : error > 0 ? "bad" : "ok",
    flowB: !state.server ? "off" : error > 0 && zoneADown ? "bad" : "ok",
    cost,
    ticks,
  };
}

// ---------- o filme da rolagem ----------

// Onde cada cena começa, em fração da rolagem da seção. A história: a noite dá errado com a
// loja como está, volta para as 18h, as peças entram e a mesma noite passa inteira.
const FILM_STARTS = [0, 0.2, 0.4, 0.58, 0.64, 0.7, 0.76, 0.82, 0.9] as const;

export const FILM_SCENES = FILM_STARTS.length;

export function filmScene(progress: number): number {
  let scene = 0;
  for (let index = 0; index < FILM_STARTS.length; index += 1) if (progress >= FILM_STARTS[index]) scene = index;
  return scene;
}

export function filmView(scene: number): LabView {
  const empty = BOARD_DEMO_INITIAL;
  const withServer: BoardDemoState = { server: true, replica: false, cache: false };
  const solved: BoardDemoState = { server: true, replica: true, cache: false };
  switch (scene) {
    case 0:
      return boardView(empty, 0);
    case 1:
      return boardView(empty, 1);
    case 2:
      return boardView(empty, 2);
    case 3:
      return { ...boardView(empty, null, "De volta às 18h. Agora monte a Zona B."), hud: "de volta às 18h" };
    case 4:
      return { ...boardView(withServer, null, "Um servidor na Zona B divide o pico."), hud: "montando a Zona B" };
    case 5:
      return { ...boardView(solved, null, "E a réplica guarda o banco fora da Zona A."), hud: "montando a Zona B" };
    case 6:
      return boardView(solved, 1);
    case 7:
      return boardView(solved, 2);
    default:
      return boardView(solved, "done");
  }
}

/** Legendas grandes que acompanham o filme, no mesmo esquema do filme do notebook. */
export const FILM_CAPTIONS: readonly { range: readonly [number, number, number, number]; title: string; body: string }[] = [
  { range: [-1, -0.5, 0.15, 0.19], title: "Pratique AWS dentro do visor do Nimbo.", body: "18h. A loja abre com um servidor e um banco, tudo na Zona A." },
  { range: [0.2, 0.23, 0.35, 0.39], title: "20h. O pico chega.", body: "Um servidor só não dá conta: 31% dos pedidos falham." },
  { range: [0.4, 0.43, 0.53, 0.57], title: "22h. A Zona A cai.", body: "Servidor e banco estavam no mesmo lugar. A loja sai do ar." },
  { range: [0.58, 0.61, 0.71, 0.75], title: "Agora monte a Zona B.", body: "Um servidor e a réplica do banco, sem passar de R$ 900 por mês." },
  { range: [0.76, 0.79, 1.5, 2], title: "A mesma noite, sem cair.", body: "A Zona A cai de novo e a Zona B assume tudo, por R$ 835 por mês." },
];
