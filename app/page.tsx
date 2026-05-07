import Image from "next/image";

import { LaunchLeadForm } from "../components/launch-lead-form";
import { ScrollFrameSequence } from "../components/ScrollFrameSequence";

import image3 from "../Image3.png";
import image4 from "../Image4.png";

const systemBullets = [
  "Plano adaptativo",
  "Simulados com diagnóstico",
  "Tutor IA contextual",
] as const;

const launchCertifications = [
  {
    description: "Fundamentos de cloud e AWS para iniciar sua jornada.",
    image: "/api/certification-badges/cloud-practitioner",
    title: "Cloud Practitioner",
  },
  {
    description: "Introdução prática à IA generativa, modelos e serviços AWS.",
    image: "/api/certification-badges/ai-practitioner",
    title: "AI Practitioner",
  },
  {
    description:
      "Arquitetura de soluções escaláveis e preparação para a certificação associate.",
    image: "/api/certification-badges/solutions-architect",
    title: "Solutions Architect",
  },
] as const;

const navItems = [
  { href: "#posicionamento", label: "Posicionamento" },
  { href: "#tutor-ia", label: "Tutor IA" },
  { href: "#sistema", label: "Sistema" },
  { href: "#certificacoes", label: "Certificações" },
] as const;

export default function HomePage() {
  return (
    <main className="page-shell min-h-screen bg-[var(--color-bg-body)] text-[var(--color-text)]">
      <header className="site-header">
        <div className="section-shell">
          <div className="site-header__bar">
            <a href="#top" className="site-header__brand" aria-label="CloudStudy">
              <Image
                src="/Logo-CloudStudy (1).png"
                alt="CloudStudy"
                width={900}
                height={600}
                className="h-auto w-[170px] md:w-[210px]"
                priority
              />
            </a>

            <nav aria-label="Navegação principal" className="site-header__nav">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="site-header__pill">
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#lista-de-espera"
              className="primary-button rounded-full px-5 py-3 text-sm font-semibold text-white"
            >
              Entrar na lista
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="section-shell pb-20 pt-6 md:pb-24 md:pt-8">
        <div className="hero-surface grid gap-12 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-[0.76fr_1.24fr] lg:items-center lg:px-14">
          <div className="hero-copy max-w-xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-200/90">
              STARTUP BRASILEIRA
            </div>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.08em] text-white md:text-6xl md:leading-[0.95]">
              O futuro do estudo AWS começa aqui.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/90 md:text-xl">
              Uma plataforma brasileira criada para transformar aprendizado em evolução contínua.
            </p>
            <a
              href="#lista-de-espera"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B2A6F] shadow-[0_16px_40px_rgba(0,0,0,0.22)] transition hover:translate-y-[-1px]"
            >
              Entrar na lista
            </a>
          </div>

          <div className="hero-media soft-panel aspect-[16/10] overflow-hidden rounded-[2.85rem] lg:aspect-[1.55/1]">
            <Image
              src={image4}
              alt="Xícara com marca da CloudStudy ao lado de anotações."
              className="h-full w-full object-cover object-center"
              priority
            />
          </div>
        </div>
      </section>

      <section id="posicionamento" className="section-shell py-12 md:py-16">
        <div className="section-tint mx-auto max-w-5xl px-6 py-10 text-center md:px-10 md:py-12">
          <div className="mx-auto max-w-3xl">
            <div className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Posicionamento
            </div>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.06em] text-[var(--color-accent-dark)] md:text-5xl md:leading-[0.98]">
              Construída no Brasil para organizar o estudo AWS com mais clareza.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[var(--color-text-soft)]">
              A CloudStudy nasce com ambição de ser a referência brasileira para quem quer estudar
              certificações AWS com estrutura, continuidade e uma experiência pensada desde o início
              para esse objetivo.
            </p>
          </div>
        </div>
      </section>

      <section id="tutor-ia" className="relative bg-white">
        <div className="section-shell grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-24 lg:gap-20">
          <div className="max-w-xl">
            <div
              className="pointer-events-none absolute -left-10 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 40%, rgba(20,121,255,0.12), transparent 50%)",
              }}
            />
            <div className="relative max-w-xl">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1479FF]">
                INTELIGÊNCIA ARTIFICIAL
              </div>
              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.06em] text-[#0B2A6F] md:text-5xl md:leading-[0.98]">
                Um tutor 24/7 que estuda com você.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[var(--color-text-soft)]">
                Você não estuda sozinho. A CloudStudy terá um tutor de IA disponível 24 horas por dia,
                que te acompanha na preparação, explica conteúdos, resolve dúvidas e te guia com base
                em experiências reais de provas AWS.
              </p>
              <a
                href="#lista-de-espera"
                className="secondary-button mt-7 inline-flex rounded-full border border-[var(--color-border)] px-5 py-3 text-sm font-semibold text-[#0B2A6F] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Falar com o tutor
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <ScrollFrameSequence />
          </div>
        </div>
      </section>

      <section id="sistema" className="section-shell py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="soft-panel aspect-[16/10] overflow-hidden">
            <Image
              src={image3}
              alt="Painel da CloudStudy exibido em monitor widescreen."
              className="h-full w-full object-cover"
            />
          </div>

          <div className="max-w-md">
            <div className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
              A virada
            </div>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.06em] text-[var(--color-accent-dark)] md:text-5xl md:leading-[0.98]">
              E se sua preparação tivesse um sistema?
            </h2>
            <p className="mt-6 text-lg leading-8 text-[var(--color-text-soft)]">
              Em vez de abrir materiais aleatórios, você seguiria uma trilha que entende sua meta,
              mede seus pontos fracos e ajusta o próximo passo.
            </p>

            <ul className="mt-8 space-y-3">
              {systemBullets.map((item) => (
                <li
                  key={item}
                  className="rounded-[1.2rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,#FFFFFF_0%,#F8FBFF_100%)] px-4 py-4 text-base text-slate-900 shadow-[0_8px_24px_rgba(20,121,255,0.05)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="certificacoes" className="section-shell py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center justify-center text-center">
            <div className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Como a CloudStudy entra
            </div>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.06em] text-[var(--color-accent-dark)] md:text-5xl md:leading-[0.98]">
              Certificações disponíveis no lançamento.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[var(--color-text-soft)]">
              Comece sua preparação com trilhas estruturadas para as certificações mais procuradas da AWS.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {launchCertifications.map((certification) => (
              <article
                key={certification.title}
                className="group flex flex-col items-center rounded-[28px] border border-blue-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(244,249,255,0.92)_100%)] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_12px_40px_rgba(20,121,255,0.12)]"
              >
                <div className="mb-8 flex h-[180px] items-center justify-center rounded-[24px] bg-gradient-to-b from-[#F8FBFF] to-white px-4 pt-4">
                  <Image
                    src={certification.image}
                    alt={certification.title}
                    width={150}
                    height={150}
                    className="mx-auto h-[140px] w-auto object-contain"
                    unoptimized
                  />
                </div>

                <h3 className="text-center text-xl font-semibold tracking-[-0.04em] text-slate-950">
                  {certification.title}
                </h3>
                <p className="mt-3 text-center text-base leading-7 text-[var(--color-text-soft)]">
                  {certification.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="lista-de-espera" className="section-shell pb-20 pt-12 md:pb-24 md:pt-16">
        <div className="soft-panel grid gap-8 p-6 md:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="max-w-sm">
            <div className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Lista de espera
            </div>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.06em] text-[var(--color-accent-dark)] md:text-5xl md:leading-[0.98]">
              Entre na lista de espera.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--color-text-soft)]">
              Receba novidades do lançamento e acesso antecipado quando a primeira versão estiver pronta.
            </p>
          </div>

          <LaunchLeadForm
            title="Quero acesso antecipado"
            buttonLabel="Quero acesso antecipado"
            helperText="Pré-lançamento. Sem spam."
            source="landing_pre_launch"
            tone="light"
            className="rounded-[1.5rem]"
          />
        </div>
      </section>

      <footer className="border-t border-blue-100 bg-[#EEF3FA]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-6 md:flex-row">
          <p className="text-center text-sm text-slate-600 md:text-left">
            © 2026 CloudStudy. Todos os direitos reservados.
          </p>

          <Image
            src="/Logo-CloudStudy (1).png"
            alt="CloudStudy"
            width={170}
            height={52}
            className="h-auto w-[150px] md:w-[170px]"
          />

          <a
            href="https://www.linkedin.com/company/cloudstudy-ai/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CloudStudy no LinkedIn"
            className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white p-3 text-[#0A66C2] transition hover:border-blue-300 hover:bg-blue-50"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46 2.48 2.48 0 0 0 4.98 3.5ZM3 9h4v12H3zM9 9h3.83v1.64h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14V21h-4v-5.55c0-1.32-.03-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.93V21H9z" />
            </svg>
          </a>
        </div>
      </footer>
    </main>
  );
}
