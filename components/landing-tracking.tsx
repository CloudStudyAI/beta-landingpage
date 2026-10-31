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
  readMetaClickIds,
  resolveCta,
  UTM_STORAGE_KEY,
  type Attribution,
  type CtaKind,
} from "../lib/landing-tracking";

type Choice = "accepted" | "rejected" | null;

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

// One PageView per page load, even if consent is toggled or the effect re-runs.
let pageViewSent = false;

// Meta's standard base code, written out so it only runs after marketing consent.
function loadPixel(): Fbq {
  if (window.fbq) return window.fbq;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  fbq("consent", "grant");
  fbq("init", PIXEL_ID);
  return fbq;
}

function trackPageView() {
  if (pageViewSent) return;
  pageViewSent = true;
  loadPixel()("track", "PageView");
}

function trackLandingCta(cta: CtaKind, position: string | null) {
  loadPixel()("trackCustom", "LandingCTA", position ? { cta, cta_position: position } : { cta });
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
        const meta = readMetaClickIds(document.cookie, window.location.search, Date.now());
        setAttribution(captureAttribution(window.localStorage, window.location.search, now, meta));
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
      trackPageView();
      lastPageView.current = pathname;
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || !isAuthLink(anchor)) return;
      const acceptedNow = readMarketingConsent(document.cookie) === "accepted";
      // The Pixel writes _fbp/_fbc asynchronously, so the click reads them fresh.
      let current = attribution;
      if (acceptedNow) {
        try {
          const meta = readMetaClickIds(document.cookie, window.location.search, Date.now());
          current = captureAttribution(window.localStorage, window.location.search, Math.floor(Date.now() / 1000), meta);
        } catch {
          // Storage blocked: the link keeps the attribution already on the page.
        }
      }
      anchor.href = authHref(anchor.href, current);
      if (!acceptedNow || pathname !== "/") return;
      const resolved = resolveCta(
        anchor.textContent ?? "",
        anchor.getAttribute("data-cta"),
        anchor.getAttribute("data-cta-position"),
      );
      if (!resolved) return;
      trackLandingCta(resolved.cta, resolved.position);
      // fbevents sends asynchronously; a short pause lets the request leave before navigation.
      if (event.button === 0 && !event.metaKey && !event.ctrlKey &&
          !event.shiftKey && !event.altKey && !anchor.target) {
        event.preventDefault();
        window.setTimeout(() => window.location.assign(anchor.href), 300);
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
    // Revoking stops the Pixel already loaded on this page from sending anything else.
    if (choice === "accepted" && next === "rejected") window.fbq?.("consent", "revoke");
    if (next === "accepted") window.fbq?.("consent", "grant");
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
