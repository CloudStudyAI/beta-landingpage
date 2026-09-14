import Image from "next/image";

import wavingRobot from "../../robos/1.svg";

const faqTopics = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#plataforma", label: "O que está incluído" },
  { href: "#faq", label: "Para quem é a plataforma" },
] as const;

export function PreFaqTransitionSection() {
  return (
    <section aria-labelledby="pre-faq-title" className="overflow-x-clip bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 pt-4 sm:pt-16 lg:grid-cols-[minmax(0,0.78fr)_minmax(18rem,0.45fr)] lg:gap-20 lg:pt-20">
        <div className="max-w-2xl text-center lg:text-left">
          <h2 id="pre-faq-title" className="text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.05em] text-[#0b2a6f] sm:text-4xl lg:text-[2.75rem]">
            Ainda com dúvidas antes de começar?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:mx-0">
            Abaixo você encontra respostas rápidas sobre acesso, funcionamento da plataforma e certificações.
          </p>

          <ul className="mt-8 grid gap-3">
            {faqTopics.map((topic) => (
              <li key={topic.label} className="flex justify-center lg:justify-start">
                <a href={topic.href} className="group inline-flex items-center gap-2 border-b border-blue-200 pb-1 text-sm font-bold text-[#0b2a6f] transition-colors hover:border-[#1479ff] hover:text-[#1479ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:text-base">
                  {topic.label}
                  <span aria-hidden="true" className="text-[#1479ff] transition-transform group-hover:translate-x-1">→</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto h-56 w-64 sm:h-64 sm:w-72 lg:mr-4 lg:h-72 lg:w-80">
          <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-44 w-56 -translate-x-1/2 -translate-y-1/2 -rotate-6 rounded-[55%_45%_52%_48%_/_46%_54%_44%_56%] bg-[#1877f2] sm:h-52 sm:w-64 lg:h-56 lg:w-72" />
          <Image
            src={wavingRobot}
            alt="Nimbo acenando antes da seção de perguntas frequentes."
            sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 224px"
            className="absolute left-1/2 top-1/2 h-52 w-56 -translate-x-1/2 -translate-y-1/2 object-contain sm:h-60 sm:w-64 lg:h-64 lg:w-72"
          />
        </div>
      </div>
    </section>
  );
}
