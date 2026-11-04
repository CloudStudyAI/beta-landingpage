import { NextResponse } from "next/server";

import { CONSENT_METRICS, type ConsentMetric } from "../../../lib/landing-tracking";

export const dynamic = "force-dynamic";

// Anonymous count of the consent notice: one fixed log line, without IP, cookie or user
// agent, so it says how many people decide without measuring any of them.
export async function POST(request: Request) {
  const body = (await request.text()).slice(0, 16);
  if (!CONSENT_METRICS.includes(body as ConsentMetric)) {
    return new NextResponse(null, { status: 400 });
  }
  console.log(`consent_metric value=${body}`);
  return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
