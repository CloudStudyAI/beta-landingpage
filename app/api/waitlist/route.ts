import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function waitlistUnavailable() {
  return NextResponse.json(
    { message: "A lista de espera não está mais disponível." },
    { status: 410, headers: { "Cache-Control": "no-store" } },
  );
}

export function GET() {
  return waitlistUnavailable();
}

export function POST() {
  return waitlistUnavailable();
}
