import Image from "next/image";

import { CertificationPathsSection } from "../components/launch/certification-paths-section";
import { LaunchHeader } from "../components/launch/launch-header";
import { LaunchHero } from "../components/launch/launch-hero";
import { StudyContinuitySection } from "../components/launch/study-continuity-section";
import { StudyCycleSection } from "../components/launch/study-cycle-section";
import { SIGNUP_URL } from "../lib/launch-links";

import image3 from "../Image3.png";

const faqItems = [
  {
    question: "Como a CloudStudy funciona na prática?",
    answer: "Trilha guiada por módulos e simulados, com foco no que mais cai.",
  },
  {
    question: "Preciso já ter experiência com AWS?",
    answer: "Não. Você começa do zero com uma trilha progressiva.",
  },
  {
    question: "Funciona para quem tem pouco tempo por dia?",
    answer: "Sim. Funciona com rotina corrida e passos curtos.",
  },
  {
    question: "O que diferencia o Mentor IA da CloudStudy?",
    answer: "Ele usa memória real de preparação e prova para guiar o próximo passo.",
  },
  {
    question: "Quando o acesso será liberado?",
    answer: "Você recebe novidades e acesso antecipado conforme as trilhas saem.",
  },
] as const;

const socialProofItems = [
  {
    handle: "@mariana.arqcloud",
    role: "Arquiteta de Soluções · LinkedIn",
    quote: "Finalmente uma trilha que mostra o que estudar primeiro. Parei de me perder em conteúdo aleatório.",
  },
  {
    handle: "@pedro.devopsjr",
    role: "DevOps Júnior · LinkedIn",
    quote: "O plano guiado e os simulados por domínio deixaram minha rotina muito mais objetiva.",
  },
  {
    handle: "@luiza.estudaaws",
    role: "Analista de Cloud · LinkedIn",
    quote: "A parte do mentor com memória real de prova dá confiança para saber qual é o próximo passo.",
  },
] as const;

export default function HomePage() {
  return (
    <main className="page-shell min-h-screen overflow-x-clip bg-[var(--color-bg-body)] text-[var(--color-text)]">
      <LaunchHeader />

      <LaunchHero />

      <StudyContinuitySection />

      <StudyCycleSection />

      <section className="section-shell py-3 md:py-4">
        <div className="soft-panel mx-auto max-w-2xl p-3 sm:p-3 md:p-3">
          <div className="mx-auto max-w-xl text-center">
            <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--color-accent-dark)] md:text-2xl">
              Crie sua conta na CloudStudy
            </h3>
          </div>

          <div className="mx-auto mt-2 max-w-lg">
            <div className="rounded-[0.95rem] border border-slate-950/10 bg-white p-2.5">
              <a href={SIGNUP_URL} className="primary-button inline-flex w-full items-center justify-center rounded-[1rem] px-5 py-2 text-xs font-semibold text-white">
                Criar conta
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="sistema" className="section-shell py-6 md:py-8">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="soft-panel aspect-[16/10] overflow-hidden">
            <Image
              src={image3}
              alt="Painel da CloudStudy exibido em monitor widescreen."
              className="h-full w-full object-cover"
            />
          </div>

          <div className="max-w-xl">
            <div className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
              A virada
            </div>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.06em] text-[var(--color-accent-dark)] md:text-5xl md:leading-[0.98]">
              Estudo solto vs. estudo com sistema
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--color-text-soft)] md:text-lg">
              Compare os dois cenários e veja por que a trilha guiada acelera sua evolução.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Sem sistema</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  <li>Conteúdo aleatório e sem prioridade.</li>
                  <li>Dificuldade para saber onde você erra.</li>
                  <li>Revisão sem método e sem sequência clara.</li>
                </ul>
              </div>

              <div className="rounded-[1.2rem] border border-sky-200 bg-[linear-gradient(135deg,#F8FBFF_0%,#EEF5FF_100%)] px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-dark)]">Com CloudStudy</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                  <li>Trilha por domínio, em ordem de impacto.</li>
                  <li>Diagnóstico contínuo com foco nos seus erros.</li>
                  <li>Mentor IA com memória real para guiar o próximo passo.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CertificationPathsSection />

      <section id="faq" className="section-shell py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-7 max-w-4xl text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">FAQ objetivo</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-accent-dark)] md:text-[3.2rem] md:leading-[1.02]">
              FAQ rápido
            </h2>
          </div>

          <div className="grid gap-2.5 md:grid-cols-2">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded-[0.9rem] border border-slate-200/80 bg-white p-3">
                <h3 className="text-[15px] font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-1.5 text-sm leading-5 text-[var(--color-text-soft)]">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="prova-social" className="section-shell py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-6 max-w-3xl text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">Prova social</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[var(--color-accent-dark)] md:text-5xl md:leading-[1]">
              Feedbacks dos conteúdos gratuitos no LinkedIn
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {socialProofItems.map((item) => (
              <article key={item.handle} className="flex h-full flex-col rounded-[1rem] border border-slate-200 bg-white p-3.5 shadow-[0_6px_16px_rgba(15,23,42,0.05)]">
                <p className="text-sm leading-7 text-slate-700">"{item.quote}"</p>
                <div className="mt-auto border-t border-slate-100 pt-2.5">
                                    <p className="text-sm font-semibold text-slate-900">{item.handle}</p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-7 text-center text-xs text-[var(--color-text-soft)]">
            Estes feedbacks são dos conteúdos gratuitos já publicados pela CloudStudy.
          </p>
        </div>
      </section>

      <section id="criar-conta" className="section-shell pb-20 pt-12 md:pb-24 md:pt-16">
        <div className="soft-panel grid gap-8 p-5 sm:p-6 md:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="max-w-sm">
            <div className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Sua conta
            </div>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.06em] text-[var(--color-accent-dark)] md:text-5xl md:leading-[0.98]">
              Crie sua conta.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--color-text-soft)]">
              Acesse a aplicação CloudStudy para criar sua conta.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-950/10 bg-white p-5 shadow-[0_28px_60px_rgba(15,23,42,0.08)] md:p-6">
            <a href={SIGNUP_URL} className="primary-button inline-flex w-full items-center justify-center rounded-[1rem] px-5 py-3 text-sm font-semibold text-white">
              Criar conta
            </a>
          </div>
        </div>
      </section>

      <footer className="mt-8 bg-white/90">
        <div className="section-shell py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <Image
                src="/logo-blue-sem-fundo.png"
                alt="CloudStudy"
                width={170}
                height={52}
                className="h-auto w-[152px] md:w-[172px]"
              />
              <p className="text-sm text-slate-600">
                Trilhas guiadas para certificações AWS com foco no que mais cai.
              </p>
            </div>

            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-600" aria-label="Links do rodapé">
              <a href="#top" className="transition hover:text-slate-900">Início</a>
              <a href="#certificacoes" className="transition hover:text-slate-900">Certificações</a>
              <a href="#faq" className="transition hover:text-slate-900">FAQ</a>
              <a href={SIGNUP_URL} className="transition hover:text-slate-900">Criar conta</a>
              <a href="/termos" className="transition hover:text-slate-900">Termos</a>
              <a href="/privacidade" className="transition hover:text-slate-900">Privacidade</a>
              <a href="/cancelamento-e-reembolso" className="transition hover:text-slate-900">Cancelamento e reembolso</a>
            </nav>

            <a
              href="https://www.linkedin.com/company/cloudstudy-ai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CloudStudy no LinkedIn"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46 2.48 2.48 0 0 0 4.98 3.5ZM3 9h4v12H3zM9 9h3.83v1.64h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14V21h-4v-5.55c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.93V21H9z" />
              </svg>
              LinkedIn
            </a>
          </div>

          <div className="mt-6 pt-4 text-center text-xs text-slate-500 md:text-left">
            © 2026 CloudStudy. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </main>
  );
}
