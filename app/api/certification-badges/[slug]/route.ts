import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

const badgeFiles = {
  "ai-practitioner": "IaPractitioner.png",
  "cloud-practitioner": "CloudPractitioner.png",
  "solutions-architect": "Solution Architect.png",
} as const;

type BadgeSlug = keyof typeof badgeFiles;

function isBadgeSlug(value: string): value is BadgeSlug {
  return value in badgeFiles;
}

export async function GET(
  _request: Request,
  context: { params: { slug: string } },
) {
  const { slug } = context.params;

  if (!isBadgeSlug(slug)) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = path.resolve(
    process.cwd(),
    "..",
    "certificações",
    badgeFiles[slug],
  );

  try {
    const file = await readFile(filePath);

    return new Response(file, {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Content-Type": "image/png",
      },
      status: 200,
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
