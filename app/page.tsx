import Image from "next/image";

import { LaunchLeadForm } from "../components/launch-lead-form";

import image3 from "../Image3.png";
import image4 from "../Image4.png";

const launchCertifications = [
  {
    description: "Base de cloud, segurança e custos para começar do zero com clareza.",
    image: "/cert-cloud-practitioner-sem-fundo.png",
    title: "Cloud Practitioner",
  },
  {
    description: "Fundamentos de IA generativa na AWS com foco prático para certificação.",
    image: "/cert-ai-practitioner-sem-fundo.png",
    title: "AI Practitioner",
  },
  {
    description:
      "Arquitetura de soluções escaláveis, resilientes e prontas para a prova Associate.",
    image: "/cert-solutions-architect-sem-fundo.png",
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
    <main className="page-shell min-h-screen overflow-x-clip bg-[var(--color-bg-body)] text-[var(--color-text)]">
      <header className="site-header">
        <div className="section-shell">
          <div className="site-header__bar">
            <a href="#top" className="site-header__brand" aria-label="CloudStudy">
              <Image
                src="/logo-blue-sem-fundo.png"
                alt="CloudStudy"
                width={900}
                height={600}
                className="h-auto w-[150px] sm:w-[170px] md:w-[210px]"
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
              className="primary-button shrink-0 whitespace-nowrap rounded-full px-4 py-3 text-xs font-semibold text-white sm:px-5 sm:text-sm"
            >
              Entrar na lista
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="section-shell pb-16 pt-6 md:pb-24 md:pt-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="hero-surface px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-14 lg:px-14">
            <div className="hero-copy max-w-xl">
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.06em] text-slate-900 sm:text-5xl md:text-[3.35rem] md:leading-[0.98]">
              Seu caminho guiado para a certificação AWS.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700 sm:text-xl md:text-[1.4rem]">
              Foque no que mais cai na prova. Siga uma trilha clara e evolua sem se perder.
            </p>
            </div>
          </div>

          <div className="hero-media flex items-center justify-end">
            <Image
              src={image4}
              alt="Xícara com marca da CloudStudy ao lado de anotações."
              className="h-auto w-full max-w-[760px] rounded-[2.4rem] sm:rounded-[2.8rem] object-cover object-center"
              priority
            />
          </div>
        </div>
      </section>

      <section id="posicionamento" className="section-shell py-12 md:py-16">
        <div className="section-tint mx-auto max-w-5xl px-6 py-10 text-center md:px-10 md:py-12">
          <div className="mx-auto max-w-3xl">
            <div className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Metodologia CloudStudy
            </div>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.06em] text-[var(--color-accent-dark)] md:text-5xl md:leading-[0.98]">
              Uma metodologia guiada para você estudar AWS com foco no que mais cai na prova.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[var(--color-text-soft)]">
              Com base em trilhas completas de certificação AWS, organizamos o estudo por módulos, domínios e simulados. Você recebe um plano progressivo, revisões direcionadas pelos seus erros e acompanhamento contínuo para evoluir com consistência até a aprovação. E conta com o Mentor IA da CloudStudy, treinado com memória real de preparação e prova, para orientar seu próximo passo com contexto prático de quem já passou pelo exame.
            </p>
          </div>
        </div>
      </section>

      <section id="tutor-ia" className="relative overflow-hidden bg-white">
        <div className="section-shell grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 sm:px-6 md:grid-cols-2 md:gap-12 md:py-24 lg:gap-20">
          <div className="max-w-xl">            <div className="relative overflow-visible bg-transparent p-0 shadow-none">
              <Image
                src="/robo-novo.png"
                alt="Tutor IA da CloudStudy."
                width={820}
                height={820}
                className="mentor-robot-image h-full w-full object-contain"
                priority
              />
              <div className="mt-4 text-center">
                <p className="text-base font-semibold tracking-[-0.01em] text-slate-900">Mentor IA CloudStudy</p>
                <p className="mt-1 text-sm text-slate-500">Memória real aplicada em exames AWS</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-full max-w-[540px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_14px_30px_rgba(15,23,42,0.08)] md:p-6">
              <div className="rounded-[1.2rem] border border-slate-200 bg-white shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
                <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 overflow-hidden rounded-full border border-cyan-200 bg-cyan-50">
                      <Image
                        src="/robo-novo.png"
                        alt="Avatar do agente."
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Mentor IA</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 bg-slate-50 px-4 py-4">
                  <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-md border border-slate-200 bg-white px-3 py-2.5 text-sm leading-6 text-slate-700">
                    Sou iniciante e tenho pouco tempo. Como eu começo sem me perder?
                    <div className="mt-1 text-[10px] text-slate-400">Você · agora</div>
                  </div>

                  <div className="max-w-[92%] rounded-2xl rounded-tl-md border border-slate-300 bg-slate-100 px-3 py-2.5 text-sm leading-6 text-slate-700">
                    A gente analisa onde você está errando ou tendo mais dificuldade. Eu já passei por isso e vou te guiar no que realmente destrava.
                    <div className="mt-1 text-[10px] text-slate-500">Mentor IA · agora</div>
                  </div>

                  <div className="mt-4 ml-auto max-w-[88%] rounded-2xl rounded-tr-md border border-slate-200 bg-white px-3 py-2.5 text-sm leading-6 text-slate-700">
                    Em qual área estou tendo mais dificuldade?
                    <div className="mt-1 text-[10px] text-slate-400">Você · agora</div>
                  </div>

                  <div className="max-w-[92%] rounded-2xl rounded-tl-md border border-slate-300 bg-slate-100 px-3 py-2.5 text-sm leading-6 text-slate-700">
                    Você está errando mais questões de segurança. No exame que eu fiz, cerca de 30% das questões caíram sobre segurança, então vamos focar nisso agora.
                    <div className="mt-1 text-[10px] text-slate-500">Mentor IA · agora</div>
                  </div>
                </div>

                <div className="border-t border-slate-200 px-4 py-3">
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                    <span className="text-xs text-slate-400">Pergunte algo sobre sua trilha...</span>
                    <span className="ml-auto rounded-md bg-cyan-500 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
                      Enviar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-3 md:py-4">
        <div className="soft-panel mx-auto max-w-2xl p-3 sm:p-3 md:p-3">
          <div className="mx-auto max-w-xl text-center">
            <h3 className="text-xl font-semibold tracking-[-0.03em] text-[var(--color-accent-dark)] md:text-2xl">
              Quer receber o acesso antecipado?
            </h3>
          </div>

          <div className="mx-auto mt-2 max-w-lg">
            <LaunchLeadForm
              title=""
              buttonLabel="Entrar na lista"
              helperText="Sem spam. Apenas atualizações importantes."
              source="landing_tutor_ia"
              tone="light"
              className="rounded-[0.95rem] !p-2.5 md:!p-2.5 [&_form]:mt-2 [&_form]:space-y-1.5 [&_input]:py-2 [&_button]:py-2 [&_button]:text-xs [&_p.text-xs]:leading-4"
            />
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

      <section id="certificacoes" className="section-shell py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center justify-center text-center md:mb-14">
            <div className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              Certificações AWS
            </div>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.05em] text-[var(--color-accent-dark)] md:text-5xl md:leading-[1]">
              Escolha sua trilha e avance com direção
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--color-text-soft)] md:text-lg">
              A CloudStudy está construindo trilhas guiadas para diferentes certificações AWS, com aulas, revisão e simulados.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {launchCertifications.map((certification) => (
              <article
                key={certification.title}
                className="group rounded-[20px] p-2 text-left transition-all duration-300"
              >

                <div className="mb-3 flex h-[118px] w-full items-center justify-center">
                  <Image
                    src={certification.image}
                    alt={certification.title}
                    width={132}
                    height={132}
                    className="h-[102px] w-[102px] object-contain object-center mix-blend-multiply"
                  />
                </div>

                <h3 className="text-lg font-semibold tracking-[-0.02em] text-slate-950 md:text-xl">
                  {certification.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)] md:text-[15px]">
                  {certification.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="lista-de-espera" className="section-shell pb-20 pt-12 md:pb-24 md:pt-16">
        <div className="soft-panel grid gap-8 p-5 sm:p-6 md:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
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
            src="/logo-blue-sem-fundo.png"
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
