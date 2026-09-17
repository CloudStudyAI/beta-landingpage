"use client";

import Script from "next/script";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";

type FormStatus =
  | { kind: "idle"; message: "" }
  | { kind: "error" | "success"; message: string };

type TurnstileOptions = {
  action: string;
  callback: (token: string) => void;
  "error-callback": () => void;
  "expired-callback": () => void;
  "response-field": false;
  size: "compact" | "flexible";
  sitekey: string;
  theme: "light";
  "timeout-callback": () => void;
};

type TurnstileApi = {
  remove: (widgetId: string) => void;
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const TURNSTILE_SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WAITLIST_API_URL = process.env.NEXT_PUBLIC_WAITLIST_API_URL?.trim() ?? "";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

function getErrorMessage(status: number): string {
  if (status === 400) return "Revise o email informado e tente novamente.";
  if (status === 403) return "Não foi possível validar a verificação. Tente novamente.";
  if (status === 429) return "Muitas tentativas. Aguarde alguns instantes e tente novamente.";

  return "O cadastro está temporariamente indisponível. Tente novamente em instantes.";
}

export function LaunchLeadForm() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTurnstileReady, setIsTurnstileReady] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ kind: "idle", message: "" });
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const startedAtRef = useRef(Date.now());
  const submitInFlightRef = useRef(false);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken("");
    startedAtRef.current = Date.now();

    const widgetId = turnstileWidgetIdRef.current;
    if (widgetId && window.turnstile) window.turnstile.reset(widgetId);
  }, []);

  useEffect(() => {
    const container = turnstileContainerRef.current;
    const turnstile = window.turnstile;

    if (!isTurnstileReady || !container || !turnstile || !TURNSTILE_SITE_KEY) return;

    startedAtRef.current = Date.now();
    const widgetId = turnstile.render(container, {
      sitekey: TURNSTILE_SITE_KEY,
      action: "waitlist_submit",
      theme: "light",
      size: window.matchMedia("(max-width: 359px)").matches ? "compact" : "flexible",
      "response-field": false,
      callback: (token) => {
        setTurnstileToken(token);
        setStatus({ kind: "idle", message: "" });
      },
      "expired-callback": () => {
        setTurnstileToken("");
        startedAtRef.current = Date.now();
        const currentWidgetId = turnstileWidgetIdRef.current;
        if (currentWidgetId) turnstile.reset(currentWidgetId);
        setStatus({
          kind: "error",
          message: "A verificação expirou. Conclua-a novamente para continuar.",
        });
      },
      "error-callback": () => {
        setTurnstileToken("");
        setStatus({
          kind: "error",
          message: "Não foi possível carregar a verificação. Tente novamente.",
        });
      },
      "timeout-callback": () => {
        setTurnstileToken("");
        startedAtRef.current = Date.now();
        setStatus({
          kind: "error",
          message: "A verificação expirou. Conclua-a novamente para continuar.",
        });
      },
    });

    turnstileWidgetIdRef.current = widgetId;

    return () => {
      turnstile.remove(widgetId);
      if (turnstileWidgetIdRef.current === widgetId) turnstileWidgetIdRef.current = null;
    };
  }, [isTurnstileReady]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitInFlightRef.current) return;

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || normalizedEmail.length > 254 || !EMAIL_PATTERN.test(normalizedEmail)) {
      setStatus({ kind: "error", message: "Informe um email válido." });
      return;
    }

    if (!turnstileToken) {
      setStatus({ kind: "error", message: "Conclua a verificação antes de continuar." });
      return;
    }

    if (!WAITLIST_API_URL || !TURNSTILE_SITE_KEY) {
      setStatus({
        kind: "error",
        message: "O cadastro está temporariamente indisponível. Tente novamente em instantes.",
      });
      return;
    }

    submitInFlightRef.current = true;
    setIsSubmitting(true);
    setStatus({ kind: "idle", message: "" });

    try {
      const response = await fetch(WAITLIST_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: normalizedEmail,
          turnstile_token: turnstileToken,
          website,
          started_at: startedAtRef.current,
        }),
      });
      resetTurnstile();

      if (response.status === 200) {
        setEmail("");
        setWebsite("");
        setStatus({
          kind: "success",
          message: "Cadastro recebido. Avisaremos você sobre as novidades da CloudStudy.",
        });
        return;
      }

      setStatus({ kind: "error", message: getErrorMessage(response.status) });
    } catch {
      resetTurnstile();
      setStatus({
        kind: "error",
        message: "O cadastro está temporariamente indisponível. Tente novamente em instantes.",
      });
    } finally {
      submitInFlightRef.current = false;
      setIsSubmitting(false);
    }
  }

  const isConfigured = Boolean(WAITLIST_API_URL && TURNSTILE_SITE_KEY);

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        src={TURNSTILE_SCRIPT_URL}
        strategy="afterInteractive"
        onReady={() => setIsTurnstileReady(true)}
        onError={() => {
          setIsTurnstileReady(false);
          setStatus({
            kind: "error",
            message: "Não foi possível carregar a verificação. Tente novamente.",
          });
        }}
      />

      <form
        className="mt-8 w-full max-w-xl"
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSubmitting}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="min-w-0 flex-1">
            <label htmlFor="waitlist-email" className="sr-only">
              Seu email
            </label>
            <input
              id="waitlist-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              required
              disabled={isSubmitting}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status.kind !== "idle") setStatus({ kind: "idle", message: "" });
              }}
              placeholder="Seu melhor email"
              className="min-h-14 w-full rounded-2xl border-2 border-white/30 bg-white px-4 text-base font-semibold text-[#0b2a6f] outline-none placeholder:text-slate-400 focus:border-[#0b2a6f] focus:ring-4 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isConfigured}
            className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-2xl border-b-4 border-slate-200 bg-white px-6 py-3 text-base font-bold text-[#0b2a6f] transition-colors hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-70 sm:px-7"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Quero participar
                <Send aria-hidden="true" className="h-5 w-5" />
              </>
            )}
          </button>
        </div>

        <div
          aria-hidden="true"
          className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
        >
          <label htmlFor="waitlist-website">Website</label>
          <input
            id="waitlist-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        <div className="mt-4 min-h-[65px] w-full overflow-hidden">
          <div
            ref={turnstileContainerRef}
            aria-label="Verificação de segurança"
            className="inline-block w-full max-w-full overflow-hidden rounded-lg bg-white"
          />
        </div>

        <div aria-live="polite" aria-atomic="true" className="min-h-8 pt-3">
          {status.kind !== "idle" ? (
            <p
              className={`flex items-start gap-2 text-sm font-semibold leading-6 ${
                status.kind === "success" ? "text-emerald-100" : "text-white"
              }`}
            >
              {status.kind === "success" ? (
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
              ) : null}
              <span>{status.message}</span>
            </p>
          ) : null}
        </div>
      </form>
    </>
  );
}
