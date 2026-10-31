import { APP_BASE_URL } from "./launch-links";

export const PIXEL_ID = "2212407896359341";
export const UTM_STORAGE_KEY = "cloudstudy_landing_utm_v1";
export const CONSENT_COOKIE_NAME = "cloudstudy_landing_marketing_consent";
export const UTM_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_id"] as const;
type UtmKey = (typeof UTM_KEYS)[number];

export type MetaClickIds = { fbc?: string; fbp?: string };

export type Attribution = {
  capturedAt: number;
  utms: Partial<Record<UtmKey, string>>;
  meta?: MetaClickIds;
};

// Formats Meta documents for the _fbc and _fbp cookies. Anything else is dropped, so a
// tampered value never travels to the app or to the Conversions API.
const FBC_PATTERN = /^fb\.[0-2]\.\d{10,13}\.[A-Za-z0-9_-]{8,500}$/;
const FBP_PATTERN = /^fb\.[0-2]\.\d{10,13}\.\d{5,20}$/;
const FBCLID_PATTERN = /^[A-Za-z0-9_-]{8,500}$/;

function cleanMetaClickIds(input: Record<string, unknown> | undefined): MetaClickIds | undefined {
  if (!input) return undefined;
  const ids: MetaClickIds = {};
  if (typeof input.fbc === "string" && FBC_PATTERN.test(input.fbc)) ids.fbc = input.fbc;
  if (typeof input.fbp === "string" && FBP_PATTERN.test(input.fbp)) ids.fbp = input.fbp;
  return ids.fbc || ids.fbp ? ids : undefined;
}

function readCookie(cookie: string, name: string): string | null {
  return cookie.split(";").map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1) ?? null;
}

/**
 * Meta click identifiers for a visitor who accepted marketing. The Pixel writes `_fbc`
 * (from the ad's `fbclid`) and `_fbp` as first-party cookies; when `_fbc` is not there yet,
 * the `fbclid` in the current URL becomes an `fbc` in Meta's documented format.
 */
export function readMetaClickIds(cookie: string, search: string, nowMs: number): MetaClickIds | undefined {
  const fbclid = new URLSearchParams(search).get("fbclid");
  const fromUrl = fbclid && FBCLID_PATTERN.test(fbclid) ? `fb.1.${nowMs}.${fbclid}` : undefined;
  return cleanMetaClickIds({
    fbc: readCookie(cookie, "_fbc") ?? fromUrl,
    fbp: readCookie(cookie, "_fbp") ?? undefined,
  });
}

type StorageLike = Pick<Storage, "getItem" | "setItem"> & Partial<Pick<Storage, "removeItem">>;

export function readMarketingConsent(cookie: string): "accepted" | "rejected" | null {
  const value = cookie.split(";").map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE_NAME}=`))
    ?.slice(CONSENT_COOKIE_NAME.length + 1);
  return value === "1" ? "accepted" : value === "0" ? "rejected" : null;
}

export function marketingConsentCookie(choice: "accepted" | "rejected", hostname: string, secure: boolean): string {
  const domain = hostname === "cloudstudy.com.br" || hostname.endsWith(".cloudstudy.com.br")
    ? "; Domain=.cloudstudy.com.br"
    : "";
  return `${CONSENT_COOKIE_NAME}=${choice === "accepted" ? "1" : "0"}; Path=/; Max-Age=15552000; SameSite=Lax${secure ? "; Secure" : ""}${domain}`;
}

function safeUtm(value: unknown): value is string {
  return typeof value === "string" &&
    /^[a-z][a-z0-9_-]{0,79}$/i.test(value) &&
    !/\d{7,}/.test(value);
}

function cleanUtms(input: URLSearchParams | Record<string, unknown>): Attribution["utms"] {
  const utms: Attribution["utms"] = {};
  for (const key of UTM_KEYS) {
    const value = input instanceof URLSearchParams ? input.get(key) : input[key];
    if (safeUtm(value)) utms[key] = value;
  }
  return utms;
}

export type CtaKind = "criar_conta" | "experimentar";

const CTA_POSITION = /^[a-z0-9][a-z0-9_-]{0,39}$/;

// Classifica o clique de um botão que leva ao cadastro. Atributos explícitos
// (data-cta / data-cta-position) têm prioridade; o texto do botão fica só como
// reserva para links antigos. A posição é validada para nunca carregar texto livre.
export function resolveCta(
  label: string,
  kind?: string | null,
  position?: string | null,
): { cta: CtaKind; position: string | null } | null {
  const safePosition = position && CTA_POSITION.test(position) ? position : null;
  if (kind === "experimentar" || kind === "criar_conta") return { cta: kind, position: safePosition };
  const text = label.trim().toLowerCase();
  if (text.includes("experimentar")) return { cta: "experimentar", position: safePosition };
  if (text.includes("criar conta")) return { cta: "criar_conta", position: safePosition };
  return null;
}

export function readAttribution(storage: StorageLike, nowSeconds: number): Attribution | null {
  try {
    const raw = storage.getItem(UTM_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    const candidate = parsed as { capturedAt?: unknown; utms?: unknown; meta?: unknown };
    if (!Number.isInteger(candidate.capturedAt) ||
        (candidate.capturedAt as number) > nowSeconds ||
        nowSeconds - (candidate.capturedAt as number) > UTM_MAX_AGE_SECONDS ||
        !candidate.utms || typeof candidate.utms !== "object") {
      storage.removeItem?.(UTM_STORAGE_KEY);
      return null;
    }
    const utms = cleanUtms(candidate.utms as Record<string, unknown>);
    const meta = cleanMetaClickIds(candidate.meta && typeof candidate.meta === "object" ? candidate.meta as Record<string, unknown> : undefined);
    return Object.keys(utms).length || meta ? { capturedAt: candidate.capturedAt as number, utms, ...(meta ? { meta } : {}) } : null;
  } catch {
    return null;
  }
}

export function captureAttribution(
  storage: StorageLike,
  search: string,
  nowSeconds: number,
  meta?: MetaClickIds,
): Attribution | null {
  const utms = cleanUtms(new URLSearchParams(search));
  const stored = readAttribution(storage, nowSeconds);
  const cleanMeta = cleanMetaClickIds(meta);
  // The same ad click keeps the fbc first stored, so its creation time stays the first visit.
  const clickId = (fbc?: string) => fbc?.split(".").slice(3).join(".");
  if (cleanMeta?.fbc && stored?.meta?.fbc && clickId(cleanMeta.fbc) === clickId(stored.meta.fbc)) {
    cleanMeta.fbc = stored.meta.fbc;
  }
  if (!Object.keys(utms).length && !cleanMeta) return stored;
  // A new campaign replaces the stored one; click ids refresh without resetting the UTM clock.
  const attribution: Attribution = Object.keys(utms).length
    ? { capturedAt: nowSeconds, utms, ...(cleanMeta ? { meta: cleanMeta } : {}) }
    : { capturedAt: stored?.capturedAt ?? nowSeconds, utms: stored?.utms ?? {}, meta: { ...stored?.meta, ...cleanMeta } };
  try {
    storage.setItem(UTM_STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // The current navigation still carries attribution when storage is unavailable.
  }
  return attribution;
}

export function attributionFromSearch(search: string, nowSeconds: number): Attribution | null {
  const utms = cleanUtms(new URLSearchParams(search));
  return Object.keys(utms).length ? { capturedAt: nowSeconds, utms } : null;
}

export function authHref(
  href: string,
  attribution: Attribution | null,
  nowSeconds = Math.floor(Date.now() / 1000),
): string {
  const source = new URL(href);
  const isStart = source.pathname === "/comecar";
  const destination = new URL(isStart ? "/comecar" : "/auth", APP_BASE_URL);
  if (!isStart && source.searchParams.get("mode") === "login") destination.searchParams.set("mode", "login");
  if (attribution && attribution.capturedAt <= nowSeconds &&
      nowSeconds - attribution.capturedAt <= UTM_MAX_AGE_SECONDS) {
    for (const key of UTM_KEYS) {
      const value = attribution.utms[key];
      if (value) destination.searchParams.set(key, value);
    }
    // Click ids exist only after marketing consent; the app re-validates them before storing.
    if (attribution.meta?.fbc) destination.searchParams.set("fbc", attribution.meta.fbc);
    if (attribution.meta?.fbp) destination.searchParams.set("fbp", attribution.meta.fbp);
    destination.searchParams.set("utm_captured_at", String(attribution.capturedAt));
  }
  return destination.toString();
}
