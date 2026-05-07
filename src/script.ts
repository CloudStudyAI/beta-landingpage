const form = document.getElementById("lead-form") as HTMLFormElement | null;
const emailInput = document.getElementById("email") as HTMLInputElement | null;
const submitButton = document.getElementById("submit-button") as HTMLButtonElement | null;
const statusElement = document.getElementById("form-status") as HTMLDivElement | null;
const header = document.querySelector(".site-header") as HTMLElement | null;
const introReveal = document.getElementById("intro-reveal") as HTMLElement | null;
const scrollProgressBar = document.getElementById("scroll-progress-bar") as HTMLSpanElement | null;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
const submitLabel = "Entrar na lista";
const introStorageKey = "cloudstudy_intro_seen";
let lastSubmittedEmail = "";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.documentElement.classList.add("motion-ready");

function safeGetSessionItem(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetSessionItem(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    return;
  }
}

function removeIntro() {
  introReveal?.remove();
}

function setupIntroReveal() {
  if (!introReveal || reduceMotion || safeGetSessionItem(introStorageKey) === "true") {
    document.documentElement.classList.add("intro-complete");
    removeIntro();
    return;
  }

  document.documentElement.classList.add("intro-active");
  document.body.style.overflow = "hidden";
  safeSetSessionItem(introStorageKey, "true");

  window.setTimeout(() => {
    introReveal.classList.add("is-exiting");
    document.documentElement.classList.remove("intro-active");
    document.documentElement.classList.add("intro-complete");
    document.body.style.overflow = "";
  }, 1800);

  window.setTimeout(removeIntro, 2500);
}

function setStatus(tone: "success" | "error", message: string) {
  if (!statusElement) {
    return;
  }

  form?.classList.toggle("is-success", tone === "success");
  form?.classList.toggle("has-error", tone === "error");
  statusElement.textContent = message;
  statusElement.className = `status-message ${tone}`;
}

function clearStatus() {
  if (!statusElement) {
    return;
  }

  statusElement.textContent = "";
  statusElement.className = "status-message hidden";
  form?.classList.remove("is-success");
  form?.classList.remove("has-error");
}

if (form && emailInput && submitButton) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const normalizedEmail = emailInput.value.trim().toLowerCase();

    if (!normalizedEmail) {
      setStatus("error", "Informe seu email.");
      return;
    }

    if (!emailRegex.test(normalizedEmail)) {
      setStatus("error", "Email inválido.");
      return;
    }

    if (lastSubmittedEmail && lastSubmittedEmail === normalizedEmail) {
      setStatus("success", "Email já cadastrado nesta sessão.");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
    form.classList.add("is-loading");
    clearStatus();

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          origin: "landing_pre_launch",
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(payload?.message || "Não foi possível enviar agora.");
      }

      lastSubmittedEmail = normalizedEmail;
      emailInput.value = "";
      setStatus("success", payload?.message || "Cadastro recebido.");
    } catch (error) {
      setStatus(
        "error",
        error instanceof Error ? error.message : "Tente novamente em instantes.",
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = submitLabel;
      form.classList.remove("is-loading");
    }
  });
}

function setupHeaderScroll() {
  if (!header) {
    return;
  }

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function setupScrollProgress() {
  if (!scrollProgressBar) {
    return;
  }

  let ticking = false;

  const updateProgress = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
    scrollProgressBar.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
    ticking = false;
  };

  const requestProgressUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateProgress);
  };

  updateProgress();
  window.addEventListener("scroll", requestProgressUpdate, { passive: true });
  window.addEventListener("resize", requestProgressUpdate, { passive: true });
}

function setupScrollReveal() {
  const selectors = [
    ".section-shell",
    ".hero-copy h1",
    ".hero-copy p",
    ".secondary-button",
    ".hero-visual",
    ".centered-copy",
    ".audience-card",
    ".media-panel",
    ".text-column h2",
    ".text-column p",
    ".feature-list li",
    ".certification-spoiler",
    ".certification-card",
    ".launch-grid .text-column",
    ".form-panel",
    ".site-footer",
  ];

  const elements = Array.from(document.querySelectorAll<HTMLElement>(selectors.join(",")));
  const premiumCards = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".audience-card, .certification-card, .feature-list li, .card-panel, .form-panel",
    ),
  );
  const maskedImages = Array.from(
    document.querySelectorAll<HTMLElement>(".hero-image-panel, .media-panel"),
  );

  elements.forEach((element, index) => {
    element.classList.add("reveal-item");
    element.style.setProperty("--reveal-delay", `${Math.min((index % 6) * 70, 350)}ms`);
  });

  premiumCards.forEach((card) => card.classList.add("premium-interactive"));
  maskedImages.forEach((panel) => panel.classList.add("mask-reveal"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.16,
    },
  );

  elements.forEach((element) => observer.observe(element));
}

function setupImageMotion() {
  const imagePanels = Array.from(
    document.querySelectorAll<HTMLElement>(".hero-image-panel, .media-panel"),
  );

  imagePanels.forEach((panel) => panel.classList.add("parallax-panel"));

  if (reduceMotion || !imagePanels.length) {
    return;
  }

  let ticking = false;

  const updateParallax = () => {
    const viewportMiddle = window.innerHeight / 2;
    const cloudOffset = Math.min(window.scrollY * 0.025, 32);

    document.documentElement.style.setProperty("--brand-cloud-y", `${cloudOffset.toFixed(2)}px`);

    imagePanels.forEach((panel) => {
      const rect = panel.getBoundingClientRect();

      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        return;
      }

      const distanceFromCenter = rect.top + rect.height / 2 - viewportMiddle;
      const offset = Math.max(-12, Math.min(12, distanceFromCenter * -0.025));
      panel.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
    });

    ticking = false;
  };

  const requestParallaxUpdate = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(updateParallax);
  };

  updateParallax();
  window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
  window.addEventListener("resize", requestParallaxUpdate, { passive: true });
}

setupIntroReveal();
setupHeaderScroll();
setupScrollProgress();
setupScrollReveal();
setupImageMotion();
