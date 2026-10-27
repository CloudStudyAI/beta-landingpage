import Image from "next/image";

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

const columns: readonly (readonly Testimonial[])[] = [
  [
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
  ],
  [
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
  ],
  [
    {
      alt: "Mensagem de um membro da comunidade sobre a trilha personalizada: Isso de trilha personalizada é do c*****.",
      height: 1217,
      src: "/testimonials/trilha-personalizada.webp",
      width: 754,
    },
  ],
];

export function TestimonialsSection() {
  return (
    <section id="depoimentos" aria-labelledby="testimonials-title" className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#1479ff]">Depoimentos</p>
          <h2 id="testimonials-title" className="text-balance font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl mt-3">
            O que diz quem já testou.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Mensagens reais de membros da comunidade CloudStudy, com os dados pessoais ocultados.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-md gap-5 sm:mt-14 lg:max-w-none lg:grid-cols-3 lg:gap-6">
          {columns.map((column, index) => (
            <div key={index} className={`grid content-start gap-5 lg:gap-6 ${index === columns.length - 1 ? "lg:self-center" : ""}`}>
              {column.map((item) => (
                <Image
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1024px) 370px, (min-width: 448px) 448px, calc(100vw - 40px)"
                  className="h-auto w-full drop-shadow-[0_12px_22px_rgba(11,42,111,0.16)]"
                />
              ))}
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-5 text-slate-500 sm:text-sm">
          Relatos individuais.
        </p>
      </div>
    </section>
  );
}
