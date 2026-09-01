import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/legal-document-page";
import { TERMS_DOCUMENT } from "@/content/legal/v1.1";

export const metadata: Metadata = {
  title: "Termos de Uso | CloudStudy",
  description: TERMS_DOCUMENT.description,
};

export default function TermsPage() {
  return <LegalDocumentPage document={TERMS_DOCUMENT} />;
}
