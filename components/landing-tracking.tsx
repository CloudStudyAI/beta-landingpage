"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { APP_BASE_URL } from "../lib/launch-links";
import {
  attributionFromSearch,
  authHref,
  captureAttribution,
  marketingConsentCookie,
  PIXEL_ID,
  readMarketingConsent,
  resolveCta,
  UTM_STORAGE_KEY,
  type Attribution,
  type CtaKind,
} from "../lib/landing-tracking";

type Choice = "accepted" | "rejected" | null;
const pixelImages = new Set<HTMLImageElement>();

function sendPixel(event: "PageView" | "LandingCTA", cta?: CtaKind, position?: string): Promise<void> {
  const url = new URL("https://www.facebook.com/tr/");
  url.searchParams.set("id", PIXEL_ID);
  url.searchParams.set("ev", event);
  url.searchParams.set("dl", `${window.location.origin}/`);
  if (cta) url.searchParams.set("cd[cta]", cta);
  if (position) url.searchParams.set("cd[cta_position]", position);

  return new Promise((resolve) => {
    const image = new Image(1, 1);
    image.referrerPolicy = "no-referrer";
    pixelImages.add(image);
    image.onload = image.onerror = () => {
      pixelImages.delete(image);
      resolve();
    };
    image.src = url.toString();
  });
}

function isAuthLink(anchor: HTMLAnchorElement): boolean {
  try {
    const url = new URL(anchor.href);
    return url.origin === APP_BASE_URL && (url.pathname === "/auth" || url.pathname === "/comecar");
  } catch {
    return false;
  }
}

export function LandingTracking() {
  const pathname = usePathname();
  const [choice, setChoice] = useState<Choice>(null);
  const [attribution, setAttribution] = useState<Attribution | null>(null);
  const [ready, setReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const lastPageView = useRef<string | null>(null);

  useEffect(() => {
    setChoice(readMarketingConsent(document.cookie));
    setReady(true);
  }, []);

  useEffect(() => {
    if (choice === null) return;
    const now = Math.floor(Date.now() / 1000);
    try {
      if (choice === "accepted") {
        setAttribution(captureAttribution(window.localStorage, window.location.search, now));
      } else {
        window.localStorage.removeItem(UTM_STORAGE_KEY);
        setAttribution(attributionFromSearch(window.location.search, now));
      }
    } catch {
      setAttribution(attributionFromSearch(window.location.search, now));
    }
  }, [choice]);

  useEffect(() => {
    const syncConsent = () => {
      if (document.visibilityState === "visible") {
        setChoice(readMarketingConsent(document.cookie));
      }
    };
    window.addEventListener("focus", syncConsent);
    document.addEventListener("visibilitychange", syncConsent);
    return () => {
      window.removeEventListener("focus", syncConsent);
      document.removeEventListener("visibilitychange", syncConsent);
    };
  }, []);

  useEffect(() => {
    const open = () => setPreferencesOpen(true);
    window.addEventListener("cloudstudy:marketing-preferences", open);
    return () => window.removeEventListener("cloudstudy:marketing-preferences", open);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (choice !== "accepted" || pathname !== "/") lastPageView.current = null;
    document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
      if (isAuthLink(anchor)) {
        anchor.href = authHref(anchor.href, attribution);
      }
    });
  }, [attribution, choice, pathname, ready]);

  useEffect(() => {
    if (!ready) return;
    if (choice === "accepted" && pathname === "/" && lastPageView.current !== pathname) {
      sendPixel("PageView");
      lastPageView.current = pathname;
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || !isAuthLink(anchor)) return;
      const acceptedNow = readMarketingConsent(document.cookie) === "accepted";
      anchor.href = authHref(anchor.href, attribution);
      if (!acceptedNow || pathname !== "/") return;
      const resolved = resolveCta(
        anchor.textContent ?? "",
        anchor.getAttribute("data-cta"),
        anchor.getAttribute("data-cta-position"),
      );
      if (!resolved) return;
      const delivery = sendPixel("LandingCTA", resolved.cta, resolved.position ?? undefined);
      if (event.button === 0 && !event.metaKey && !event.ctrlKey &&
          !event.shiftKey && !event.altKey && !anchor.target) {
        event.preventDefault();
        void Promise.race([
          delivery,
          new Promise<void>((resolve) => window.setTimeout(resolve, 300)),
        ]).then(() => window.location.assign(anchor.href));
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [attribution, choice, pathname, ready]);

  function saveChoice(next: Exclude<Choice, null>) {
    document.cookie = marketingConsentCookie(
      next,
      window.location.hostname,
      window.location.protocol === "https:",
    );
    setPreferencesOpen(false);
    if (choice === "accepted" && next === "rejected") {
      setChoice(next);
      return;
    }
    setChoice(next);
  }

  if (!ready || (choice && !preferencesOpen)) return null;

  return (
    <aside className="marketing-consent" role="dialog" aria-modal="false" aria-label="Preferências de marketing">
      <div>
        <strong>Privacidade e cookies</strong>
        <p>
          Usamos cookies para medir nossos anúncios. Opcional e não afeta seu acesso.{" "}
          <a href="/privacidade/marketing">Saiba mais</a>
        </p>
      </div>
      <div className="marketing-consent-actions">
        <button type="button" onClick={() => saveChoice("rejected")}>Recusar</button>
        <button type="button" onClick={() => saveChoice("accepted")}>Aceitar</button>
      </div>
    </aside>
  );
}
