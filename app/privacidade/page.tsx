import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/legal-document-page";
import { PRIVACY_DOCUMENT } from "@/content/legal/v1.1";

export const metadata: Metadata = {
  title: "Política de Privacidade | CloudStudy",
  description: PRIVACY_DOCUMENT.description,
};

export default function PrivacyPage() {
  return <LegalDocumentPage document={PRIVACY_DOCUMENT} />;
}
