const faqItems = [
  {
    answer: "Para quem quer organizar a preparação para uma certificação AWS, desde quem está começando em cloud até quem já trabalha com tecnologia e busca uma trilha mais clara.",
    question: "Para quem é a CloudStudy?",
  },
  {
    answer: "Não. A jornada pode começar pelos fundamentos e avançar de forma progressiva, sem exigir experiência anterior com a plataforma AWS.",
    question: "Preciso já conhecer AWS?",
  },
  {
    answer: "Ao clicar em criar conta, você segue para a aplicação da CloudStudy, onde faz seu cadastro e acessa a experiência disponível.",
    question: "Como começo a estudar?",
  },
  {
    answer: "A plataforma organiza o próximo passo para facilitar sessões curtas ou mais longas. Você retoma de onde parou conforme a sua rotina.",
    question: "Funciona para quem tem pouco tempo?",
  },
  {
    answer: "A proposta é conectar conteúdo, prática e revisão em uma sequência visível, reduzindo a necessidade de decidir sozinho o que fazer a cada sessão.",
    question: "O que muda em relação ao estudo solto?",
  },
  {
    answer: "Não. A CloudStudy é uma plataforma independente de preparação educacional e não é afiliada, patrocinada ou endossada pela AWS.",
    question: "A CloudStudy é um produto oficial da AWS?",
  },
] as const;

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-8 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="faq-title" className="text-balance font-display text-3xl font-bold leading-[1.08] tracking-[-0.05em] text-[#0b2a6f] sm:text-5xl">
            Tire suas dúvidas e comece com clareza.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">O essencial para decidir se a CloudStudy faz sentido para o seu momento.</p>
        </div>

        <div className="mt-10 grid gap-3 sm:mt-12">
          {faqItems.map((item, index) => (
            <details key={item.question} open={index === 0} className="group rounded-2xl border-2 border-slate-100 bg-[#f8fbff] px-5 py-1 open:border-blue-200 open:bg-white sm:px-6">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-base font-bold text-[#0b2a6f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:text-lg [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl text-[#1479ff] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-3xl pb-5 pr-10 text-sm leading-7 text-slate-600 sm:text-base">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
