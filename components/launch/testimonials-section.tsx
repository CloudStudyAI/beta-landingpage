import { Quote } from "lucide-react";

// Depoimentos enviados espontaneamente por membros da comunidade e liberados para uso.
// Regras (docs do plano de conversão):
//  - texto literal; só se corta o começo/fim e se censura palavrão (c*****);
//  - telefone sempre mascarado, deixando apenas o DDD; nunca colocar dígitos reais aqui;
//  - sem foto de perfil.
type Testimonial = {
  author: string;
  ddd?: string;
  quote: string;
};

const featured: Testimonial = {
  author: "Leonardo",
  quote:
    "Confesso que fiquei receoso em assinar a CloudStudy, porque estava bem distante da TI e tinha perdido o ritmo dos estudos. Mas a plataforma é tão intuitiva que está me ajudando a voltar à área. E, por coincidência, já consegui até uma entrevista para estágio! 😅🚀",
};

const others: readonly Testimonial[] = [
  {
    author: "Bruno Barreto",
    ddd: "11",
    quote:
      "…já dei uma olhada prévia e visualmente está bem bacana além de parecer bastante funcional também. Agora é testar na prática. Mas, já deu pra perceber que está com uma maturidade bem legal.",
  },
  {
    author: "Membro da comunidade",
    ddd: "11",
    quote: "Parabéns, caraca véi, tá irado. Ficou show, muito intuitivo… tá massa demais...",
  },
  {
    author: "Membro da comunidade",
    quote: "Isso de trilha personalizada é do c*****",
  },
  {
    author: "Membro da comunidade",
    quote: "…eu amei esse visual ficou top demais",
  },
];

function Author({ author, ddd }: { author: string; ddd?: string }) {
  return (
    <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
      <span className="font-bold text-[#0b2a6f]">{author}</span>
      {ddd ? (
        <span className="text-xs font-semibold text-slate-400">
          <span className="sr-only">Telefone ocultado, DDD {ddd}</span>
          <span aria-hidden="true">{`+55 ${ddd} •••••-••••`}</span>
        </span>
      ) : null}
    </figcaption>
  );
}

export function TestimonialsSection() {
  return (
    <section id="depoimentos" aria-labelledby="testimonials-title" className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="testimonials-title" className="text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">
            O que diz quem já testou.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Mensagens reais de membros da comunidade CloudStudy, com os telefones ocultados.
          </p>
        </div>

        <figure className="mx-auto mt-12 max-w-3xl rounded-3xl border-2 border-blue-100 bg-[#f6f9fe] p-6 sm:mt-14 sm:p-9">
          <Quote aria-hidden="true" className="h-7 w-7 text-[#1479ff]" />
          <blockquote className="mt-4 text-lg font-semibold leading-8 text-[#0b2a6f] sm:text-xl sm:leading-9">
            “{featured.quote}”
          </blockquote>
          <Author author={featured.author} ddd={featured.ddd} />
        </figure>

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((item) => (
            <li key={item.quote}>
              <figure className="h-full rounded-2xl border-2 border-slate-100 bg-white p-5">
                <blockquote className="text-sm leading-6 text-slate-700 sm:text-[0.9375rem] sm:leading-7">“{item.quote}”</blockquote>
                <Author author={item.author} ddd={item.ddd} />
              </figure>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-slate-500 sm:text-sm">
          Relatos individuais.
        </p>
      </div>
    </section>
  );
}
