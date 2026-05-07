"use client";

import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

import { leadCertificationOptions } from "../lib/launch-data";

type LaunchLeadFormProps = {
  buttonLabel: string;
  className?: string;
  description?: string;
  emailPlaceholder?: string;
  helperText?: string;
  showCertificationField?: boolean;
  source?: string;
  title?: string;
  tone?: "dark" | "light";
};

type LeadFormValues = {
  certificationInterest: string;
  email: string;
};

type LeadFormStatus =
  | { tone: "idle"; message: string }
  | { tone: "error" | "success"; message: string };

type WaitlistApiResponse = {
  code?: "duplicate_email" | "invalid_body" | "invalid_email" | "server_error" | "waitlist_created";
  message?: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

const initialValues: LeadFormValues = {
  certificationInterest: "",
  email: "",
};

const toneStyles = {
  dark: {
    button:
      "bg-[linear-gradient(135deg,#7dd3fc_0%,#38bdf8_40%,#fde68a_100%)] text-slate-950 shadow-[0_20px_50px_rgba(56,189,248,0.22)]",
    field:
      "border-white/12 bg-white/6 text-white placeholder:text-slate-400 focus:border-cyan-300/70 focus:bg-white/10",
    helper: "text-slate-400",
    panel:
      "border-white/12 bg-slate-950/68 text-white shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl",
    text: "text-slate-300",
  },
  light: {
    button:
      "bg-[linear-gradient(135deg,#111827_0%,#1e40af_58%,#38bdf8_100%)] text-white shadow-[0_20px_40px_rgba(15,23,42,0.22)]",
    field:
      "border-slate-900/10 bg-slate-900/[0.04] text-slate-950 placeholder:text-slate-500 focus:border-sky-500/70 focus:bg-white",
    helper: "text-slate-500",
    panel:
      "border-slate-950/10 bg-white text-slate-950 shadow-[0_28px_60px_rgba(15,23,42,0.08)]",
    text: "text-slate-600",
  },
} as const;

export function LaunchLeadForm({
  buttonLabel,
  className,
  description,
  emailPlaceholder = "voce@empresa.com",
  helperText = "Receba acesso antecipado, novidades do lancamento e condicoes especiais para os primeiros usuarios.",
  showCertificationField = false,
  source = "landing_pre_launch",
  title,
  tone = "dark",
}: LaunchLeadFormProps) {
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [status, setStatus] = useState<LeadFormStatus>({ tone: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const storageKey = `lead-form-${source}`;

  // Restaurar dados do localStorage ao montar o componente
  useEffect(() => {
    const savedValues = localStorage.getItem(storageKey);
    if (savedValues) {
      try {
        setValues(JSON.parse(savedValues));
      } catch {
        // Ignorar se houver erro ao fazer parse
      }
    }
  }, [storageKey]);

  // Salvar dados no localStorage sempre que os valores mudam
  useEffect(() => {
    if (!values.email && !values.certificationInterest) {
      localStorage.removeItem(storageKey);
      return;
    }

    localStorage.setItem(storageKey, JSON.stringify(values));
  }, [values, storageKey]);

  const normalizedEmail = useMemo(() => values.email.trim().toLowerCase(), [values.email]);
  const styles = toneStyles[tone];
  const baseFieldClassName = `w-full rounded-[1rem] border px-4 py-3 text-sm outline-none transition ${styles.field}`;

  function updateValue<Key extends keyof LeadFormValues>(field: Key, value: LeadFormValues[Key]) {
    if (status.tone !== "idle") {
      setStatus({ tone: "idle", message: "" });
    }

    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function validateValues() {
    if (!normalizedEmail) {
      return "Informe seu email para entrar na lista de espera.";
    }

    if (!emailRegex.test(normalizedEmail)) {
      return "Informe um email valido.";
    }

    if (
      showCertificationField &&
      values.certificationInterest &&
      !leadCertificationOptions.some(
        (option) => option.value === values.certificationInterest,
      )
    ) {
      return "Selecione uma certificacao valida.";
    }

    return null;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const validationMessage = validateValues();

    if (validationMessage) {
      setStatus({ tone: "error", message: validationMessage });
      return;
    }

    setIsSubmitting(true);
    setStatus({ tone: "idle", message: "" });

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | WaitlistApiResponse
        | null;

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error(
            payload?.message || "Este email ja esta na lista de espera da CloudStudy.",
          );
        }

        if (response.status === 400) {
          throw new Error(
            payload?.message || "Informe um email valido para entrar na lista de espera.",
          );
        }

        throw new Error(
          payload?.message || "Nao foi possivel concluir seu cadastro agora. Tente novamente em instantes.",
        );
      }

      setValues(initialValues);
      localStorage.removeItem(storageKey);
      setStatus({
        tone: "success",
        message:
          payload?.message ||
          "Cadastro confirmado. Voce entrou na lista de espera da CloudStudy.",
      });
    } catch (error) {
      setStatus({
        tone: "error",
        message:
          error instanceof Error
            ? error.message
            : "Tivemos um problema ao enviar. Tente novamente em instantes.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={`rounded-[1.75rem] border p-5 md:p-6 ${styles.panel} ${className ?? ""}`}>
      {title ? (
        <h3 className="text-xl font-semibold tracking-[-0.04em] md:text-2xl">{title}</h3>
      ) : null}
      {description ? <p className={`mt-3 text-sm leading-7 ${styles.text}`}>{description}</p> : null}

      <form className="mt-5 space-y-3" onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
        <div>
          <label className="sr-only" htmlFor={`lead-email-${source}`}>
            Email
          </label>
          <input
            id={`lead-email-${source}`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            disabled={isSubmitting}
            placeholder={emailPlaceholder}
            className={baseFieldClassName}
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
          />
        </div>

        {showCertificationField ? (
          <div>
            <label className="sr-only" htmlFor={`lead-certification-${source}`}>
              Qual certificacao AWS voce quer tirar
            </label>
            <select
              id={`lead-certification-${source}`}
              name="certification_interest"
              disabled={isSubmitting}
              className={baseFieldClassName}
              value={values.certificationInterest}
              onChange={(event) => updateValue("certificationInterest", event.target.value)}
            >
              <option value="">Qual certificacao AWS voce quer tirar? (opcional)</option>
              {leadCertificationOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className={tone === "dark" ? "bg-slate-950 text-white" : "bg-white text-slate-950"}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-[1rem] px-5 py-3 text-sm font-semibold transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70 ${styles.button}`}
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              {buttonLabel}
              <Send className="h-4 w-4" />
            </>
          )}
        </button>

        <p className={`text-xs leading-6 ${styles.helper}`}>{helperText}</p>

        {status.tone !== "idle" ? (
          <div
            className={`flex items-start gap-3 rounded-[1rem] border px-4 py-3 text-sm leading-6 ${
              status.tone === "success"
                ? tone === "light"
                  ? "border-slate-950 bg-slate-950 text-white shadow-[0_14px_30px_rgba(15,23,42,0.18)]"
                  : "border-emerald-400/25 bg-emerald-500/10 text-emerald-100"
                : tone === "light"
                  ? "border-rose-300 bg-rose-50 text-rose-900"
                  : "border-rose-400/25 bg-rose-500/10 text-rose-100"
            }`}
            aria-live="polite"
          >
            {status.tone === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            <span>{status.message}</span>
          </div>
        ) : null}
      </form>
    </div>
  );
}
