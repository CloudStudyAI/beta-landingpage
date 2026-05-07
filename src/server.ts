import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const PORT = Number(process.env.PORT || 3000);
const ROOT = path.resolve(__dirname, "..");
const DATA_PATH = path.join(ROOT, "data", "prelaunch-leads.ndjson");
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

const MIME_TYPES: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

type LeadPayload = {
  certification_interest: string | null;
  created_at: string;
  email: string;
  origin: "landing_pre_launch";
};

function sanitizeText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

async function sendFile(response: http.ServerResponse, filePath: string) {
  try {
    const content = await fs.readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": MIME_TYPES[extension] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

async function persistLead(lead: LeadPayload) {
  // TODO: substituir esta persistência local por um repository conectado ao AWS RDS.
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.appendFile(DATA_PATH, `${JSON.stringify(lead)}\n`, "utf8");
}

async function handleLeadRequest(
  request: http.IncomingMessage,
  response: http.ServerResponse,
) {
  let rawBody = "";

  for await (const chunk of request) {
    rawBody += chunk;
  }

  let payload: Record<string, unknown>;

  try {
    payload = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    response.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ message: "Não foi possível ler os dados." }));
    return;
  }

  const email = sanitizeText(payload.email, 160).toLowerCase();
  const origin = sanitizeText(payload.origin, 64);
  const certificationInterest = sanitizeText(payload.certification_interest, 80);

  if (!email) {
    response.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ message: "Informe seu email." }));
    return;
  }

  if (!EMAIL_REGEX.test(email)) {
    response.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ message: "Informe um email válido." }));
    return;
  }

  if (origin !== "landing_pre_launch") {
    response.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ message: "Origem do lead inválida." }));
    return;
  }

  const lead: LeadPayload = {
    certification_interest: certificationInterest || null,
    created_at: new Date().toISOString(),
    email,
    origin: "landing_pre_launch",
  };

  await persistLead(lead);

  response.writeHead(201, { "Content-Type": "application/json; charset=utf-8" });
  response.end(
    JSON.stringify({
      message:
        "Cadastro recebido.",
    }),
  );
}

function resolveStaticPath(urlPath: string) {
  if (urlPath === "/") {
    return path.join(ROOT, "index.html");
  }

  const sanitizedPath = path
    .normalize(decodeURIComponent(urlPath))
    .replace(/^[/\\]+/, "")
    .replace(/^(\.\.[/\\])+/, "");
  return path.join(ROOT, sanitizedPath);
}

function createServer() {
  return http.createServer(async (request, response) => {
    if (!request.url || !request.headers.host) {
      response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Bad request");
      return;
    }

    const url = new URL(request.url, `http://${request.headers.host}`);

    if (request.method === "POST" && url.pathname === "/api/leads") {
      await handleLeadRequest(request, response);
      return;
    }

    if (request.method !== "GET") {
      response.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Method not allowed");
      return;
    }

    const filePath = resolveStaticPath(url.pathname);
    await sendFile(response, filePath);
  });
}

async function main() {
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`CloudStudy landing running at http://localhost:${PORT}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
