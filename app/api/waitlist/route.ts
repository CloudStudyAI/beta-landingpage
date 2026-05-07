import { NextResponse } from "next/server";

import { getWaitlistEnvStatus, getWaitlistPool } from "../../../lib/waitlist-db";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const duplicateEmailCode = "23505";

type WaitlistBody = {
  email?: unknown;
};

type WaitlistResponse = {
  code: "duplicate_email" | "invalid_body" | "invalid_email" | "server_error" | "waitlist_created";
  message: string;
};

type HealthResponse = {
  status: "online";
  env: ReturnType<typeof getWaitlistEnvStatus>;
  database: {
    connected: boolean;
    now: string | null;
    error: string | null;
  };
};

function buildResponse(body: WaitlistResponse, status: number) {
  return NextResponse.json(body, { status });
}

function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function isDuplicateError(error: unknown): error is { code: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === duplicateEmailCode
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}

function logWaitlistError(context: string, error: unknown) {
  const errorDetails =
    error instanceof Error
      ? {
          message: error.message,
          name: error.name,
          stack: error.stack,
          ...(typeof error === "object" && error !== null && "code" in error
            ? { code: (error as { code?: unknown }).code }
            : {}),
          ...(typeof error === "object" && error !== null && "detail" in error
            ? { detail: (error as { detail?: unknown }).detail }
            : {}),
        }
      : error;

  console.error(`[waitlist] ${context}`, errorDetails);
}

export async function GET() {
  const env = getWaitlistEnvStatus();
  const hasRequiredEnv = Object.values(env).every(Boolean);
  const response: HealthResponse = {
    status: "online",
    env,
    database: {
      connected: false,
      now: null,
      error: null,
    },
  };

  if (!hasRequiredEnv) {
    response.database.error = "Missing one or more required database environment variables.";
    return NextResponse.json(response);
  }

  try {
    const pool = getWaitlistPool();
    const result = await pool.query<{ now: Date | string }>("SELECT NOW() AS now");

    response.database.connected = true;
    response.database.now = new Date(result.rows[0].now).toISOString();

    return NextResponse.json(response);
  } catch (error) {
    logWaitlistError("Health check failed.", error);
    response.database.error = getErrorMessage(error);

    return NextResponse.json(response);
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as WaitlistBody | null;

  if (!body) {
    return buildResponse(
      {
        code: "invalid_body",
        message: "Nao foi possivel processar os dados enviados.",
      },
      400,
    );
  }

  const email = normalizeEmail(body.email);

  if (!email) {
    return buildResponse(
      {
        code: "invalid_email",
        message: "Informe um email valido para entrar na lista de espera.",
      },
      400,
    );
  }

  if (!emailRegex.test(email)) {
    return buildResponse(
      {
        code: "invalid_email",
        message: "Informe um email valido para entrar na lista de espera.",
      },
      400,
    );
  }

  try {
    const pool = getWaitlistPool();
    const existingEmail = await pool.query<{ id: number }>(
      "SELECT id FROM waitlist WHERE email = $1 LIMIT 1",
      [email],
    );

    if (existingEmail.rowCount && existingEmail.rowCount > 0) {
      return buildResponse(
        {
          code: "duplicate_email",
          message: "Este email ja esta na lista de espera da CloudStudy.",
        },
        409,
      );
    }

    await pool.query("INSERT INTO waitlist (email) VALUES ($1)", [email]);

    return buildResponse(
      {
        code: "waitlist_created",
        message: "Cadastro confirmado. Voce entrou na lista de espera da CloudStudy.",
      },
      201,
    );
  } catch (error) {
    if (isDuplicateError(error)) {
      return buildResponse(
        {
          code: "duplicate_email",
          message: "Este email ja esta na lista de espera da CloudStudy.",
        },
        409,
      );
    }

    logWaitlistError("Failed to persist email.", error);

    return buildResponse(
      {
        code: "server_error",
        message: "Nao foi possivel concluir seu cadastro agora. Tente novamente em instantes.",
      },
      500,
    );
  }
}
