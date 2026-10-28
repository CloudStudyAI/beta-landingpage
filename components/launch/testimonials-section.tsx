import Image from "next/image";

import { SideWave } from "./side-wave";

// Prints de mensagens enviadas espontaneamente por membros da comunidade e liberadas para uso.
// Tratamento aplicado às imagens em public/testimonials (ver docs do plano de conversão):
//  - recorte só da mensagem, sem foto de perfil nem o restante do grupo;
//  - telefone coberto, restando apenas o DDD; menções a terceiros cobertas;
//  - palavrão censurado (c*****, s***); nenhum outro trecho foi alterado.
// Nunca adicionar aqui um print sem tratamento nem escrever telefone completo em texto.
type Testimonial = {
  alt: string;
  height: number;
  src: string;
  width: number;
};

const testimonials: readonly Testimonial[] = [
  {
    alt: "Mensagem de Leonardo: Confesso que fiquei receoso em assinar a CloudStudy, porque estava bem distante da TI e tinha perdido o ritmo dos estudos. Mas a plataforma é tão intuitiva que está me ajudando a voltar à área. E, por coincidência, já consegui até uma entrevista para estágio!",
    height: 779,
    src: "/testimonials/leonardo.webp",
    width: 882,
  },
  {
    alt: "Mensagem de Bruno Barreto: já dei uma olhada prévia e visualmente está bem bacana além de parecer bastante funcional também. Agora é testar na prática. Mas, já deu pra perceber que está com uma maturidade bem legal.",
    height: 966,
    src: "/testimonials/bruno.webp",
    width: 882,
  },
  {
    alt: "Mensagem de um membro da comunidade sobre o mapa da trilha: eu amei esse visual ficou top demais.",
    height: 1032,
    src: "/testimonials/visual-trilha.webp",
    width: 688,
  },
  {
    alt: "Mensagem de um membro da comunidade: Parabéns, tá irado. Ficou show, muito intuitivo, tá massa demais.",
    height: 835,
    src: "/testimonials/membro-intuitivo.webp",
    width: 882,
  },
  {
    alt: "Mensagem de um membro da comunidade sobre a trilha personalizada: Isso de trilha personalizada é do c*****.",
    height: 1217,
    src: "/testimonials/trilha-personalizada.webp",
    width: 754,
  },
];

// Rendered twice back-to-back so the marquee can loop seamlessly (see
// .testimonials-track in globals.css, which shifts exactly -50%).
const trackTestimonials = [...testimonials, ...testimonials];

function TestimonialCard({ item, duplicate }: { item: Testimonial; duplicate: boolean }) {
  return (
    <div
      aria-hidden={duplicate || undefined}
      className="flex aspect-[3/4] w-64 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#e1ecfb] bg-white p-2 shadow-[0_12px_22px_rgba(11,42,111,0.16)] sm:w-72"
    >
      <Image
        src={item.src}
        alt={duplicate ? "" : item.alt}
        width={item.width}
        height={item.height}
        sizes="288px"
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="depoimentos" aria-labelledby="testimonials-title" className="relative isolate scroll-mt-24 overflow-x-clip bg-white py-16 sm:py-20 lg:py-24">
      <SideWave id="wave-c" side="right" className="top-16 h-[34rem] lg:h-[40rem]" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="testimonials-title" className="text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">
            O que diz quem já testou.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Mensagens reais de membros da comunidade CloudStudy, com os dados pessoais ocultados.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-12 overflow-hidden motion-reduce:overflow-x-auto sm:mt-14">
        <ul className="testimonials-track flex w-max gap-5 px-5 will-change-transform motion-reduce:gap-5 sm:gap-6 sm:px-8">
          {trackTestimonials.map((item, index) => (
            <li key={`${item.src}-${index}`}>
              <TestimonialCard item={item} duplicate={index >= testimonials.length} />
            </li>
          ))}
        </ul>
      </div>

      <p className="relative z-10 mx-auto mt-10 max-w-2xl px-5 text-center text-xs leading-5 text-slate-500 sm:px-8 sm:text-sm">
        Relatos individuais.
      </p>
    </section>
  );
}
