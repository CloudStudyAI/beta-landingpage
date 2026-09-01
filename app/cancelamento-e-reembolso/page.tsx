import type { Metadata } from "next";

import { LegalDocumentPage } from "@/components/legal-document-page";
import { REFUND_DOCUMENT } from "@/content/legal/v1.1";

export const metadata: Metadata = {
  title: "Cancelamento e Reembolso | CloudStudy",
  description: REFUND_DOCUMENT.description,
};

export default function RefundPage() {
  return <LegalDocumentPage document={REFUND_DOCUMENT} />;
}
