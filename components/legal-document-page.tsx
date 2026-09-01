import Image from "next/image";
import Link from "next/link";

import {
  LEGAL_DOCUMENTS,
  LEGAL_OPERATOR,
  type LegalDocument,
} from "@/content/legal/v1.1";

export function LegalDocumentPage({ document }: { document: LegalDocument }) {
  return (
    <main className="page-shell min-h-screen bg-white text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="section-shell flex min-h-20 items-center justify-between gap-5 py-4">
          <Link href="/" aria-label="Voltar para a página inicial da CloudStudy">
            <Image
              src="/logo-blue-sem-fundo.png"
              alt="CloudStudy"
              width={900}
              height={600}
              className="h-auto w-[160px] sm:w-[180px]"
              priority
            />
          </Link>
          <Link href="/" className="text-sm font-semibold text-slate-600 transition hover:text-slate-950">
            Voltar ao início
          </Link>
        </div>
      </header>

      <div className="section-shell grid gap-10 py-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:py-16">
        <aside className="h-fit border-b border-slate-200 pb-6 lg:sticky lg:top-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-7">
          <p className="text-xs font-bold uppercase text-blue-700">Central legal</p>
          <nav aria-label="Documentos legais" className="mt-4 grid gap-1 text-sm">
            {LEGAL_DOCUMENTS.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                aria-current={item.slug === document.slug ? "page" : undefined}
                className={
                  item.slug === document.slug
                    ? "border-l-2 border-blue-600 py-2 pl-3 font-semibold text-slate-950"
                    : "border-l-2 border-transparent py-2 pl-3 font-medium text-slate-500 transition hover:text-slate-950"
                }
              >
                {item.shortTitle}
              </Link>
            ))}
          </nav>
          <div className="mt-6 text-xs leading-5 text-slate-500">
            <p className="font-semibold text-slate-800">Versão {document.version}</p>
            <p>Vigente desde {document.effectiveDate}</p>
          </div>
        </aside>

        <article className="mx-auto w-full max-w-3xl">
          <p className="text-xs font-bold uppercase text-blue-700">{document.shortTitle}</p>
          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{document.title}</h1>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            Versão {document.version} · Vigência: {document.effectiveDate}
          </p>
          <p className="mt-7 text-base leading-8 text-slate-600">{document.description}</p>

          <div className="mt-8 border-y border-slate-200 py-5 text-sm leading-7 text-slate-600">
            <p className="font-semibold text-slate-900">Fornecedor responsável pela operação</p>
            <p>{LEGAL_OPERATOR.legalName}</p>
            <p>CNPJ {LEGAL_OPERATOR.cnpj} · {LEGAL_OPERATOR.cityState}</p>
            <p>
              Suporte: <a className="font-semibold text-blue-700 hover:underline" href={`mailto:${LEGAL_OPERATOR.supportEmail}`}>{LEGAL_OPERATOR.supportEmail}</a>
            </p>
          </div>

          <div className="mt-10 space-y-10">
            {document.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold text-slate-950 sm:text-2xl">{section.title}</h2>
                <div className="mt-4 space-y-4 text-[0.95rem] leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets?.length ? (
                    <ul className="list-disc space-y-2 pl-6">
                      {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>

          <footer className="mt-12 border-t border-slate-200 py-8 text-xs leading-6 text-slate-500">
            <p>Este documento é disponibilizado em formato web para leitura, conservação e reprodução pelo usuário.</p>
            <p className="mt-2">Dúvidas podem ser encaminhadas para {LEGAL_OPERATOR.supportEmail}.</p>
          </footer>
        </article>
      </div>
    </main>
  );
}
