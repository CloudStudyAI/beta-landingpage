const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

function loadModule(file, dependencies = {}) {
  const source = ts.transpileModule(
    fs.readFileSync(path.join(__dirname, "../", file), "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
  ).outputText;
  const context = {
    exports: {},
    require: (name) => dependencies[name],
    URL,
    URLSearchParams,
    Date,
    process: { env: {} },
  };
  vm.runInNewContext(source, context);
  return context.exports;
}

const links = loadModule("lib/launch-links.ts");
const tracking = loadModule("lib/landing-tracking.ts", { "./launch-links": links });

function storage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
}

test("captures only allowlisted, bounded UTMs without URL, email or phone", () => {
  const store = storage();
  const attribution = tracking.captureAttribution(
    store,
    "?utm_source=meta&utm_medium=paid_social&utm_campaign=launch-2026" +
      "&utm_content=alice%40example.com&utm_id=11999999999&utm_term=ignored&email=alice%40example.com" +
      "&redirect=https%3A%2F%2Fexample.com%2Fprivate",
    1_700_000_000,
  );
  assert.deepEqual({ ...attribution.utms }, {
    utm_source: "meta",
    utm_medium: "paid_social",
    utm_campaign: "launch-2026",
  });
  const persisted = store.getItem(tracking.UTM_STORAGE_KEY);
  assert.equal(persisted.includes("alice"), false);
  assert.equal(persisted.includes("http"), false);
  assert.equal(persisted.includes("redirect"), false);
  assert.equal(persisted.includes("utm_term"), false);
});

test("preserves timestamp across visits, expires after 30 days and replaces on a new campaign", () => {
  const store = storage();
  const first = tracking.captureAttribution(store, "?utm_source=meta", 1_700_000_000);
  assert.equal(tracking.captureAttribution(store, "", 1_700_000_000 + 29 * 86400).capturedAt, first.capturedAt);
  assert.equal(tracking.readAttribution(store, 1_700_000_000 + 30 * 86400).capturedAt, first.capturedAt);
  assert.equal(tracking.readAttribution(store, 1_700_000_000 + 30 * 86400 + 1), null);
  assert.equal(store.getItem(tracking.UTM_STORAGE_KEY), null);
  const second = tracking.captureAttribution(store, "?utm_source=search", 1_700_000_000 + 31 * 86400);
  assert.equal(second.utms.utm_source, "search");
  assert.equal(second.capturedAt, 1_700_000_000 + 31 * 86400);
});

test("auth links carry UTMs and capture time without implying app consent", () => {
  const attribution = { capturedAt: 1_700_000_000, utms: { utm_source: "meta", utm_campaign: "launch", utm_id: "ad-123" } };
  const anonymous = new URL(tracking.authHref(links.SIGNUP_URL, attribution, 1_700_000_001));
  assert.equal(anonymous.origin, "https://app.cloudstudy.com.br");
  assert.equal(anonymous.pathname, "/auth");
  assert.equal(anonymous.searchParams.get("utm_source"), "meta");
  assert.equal(anonymous.searchParams.get("utm_id"), "ad-123");
  assert.equal(anonymous.searchParams.get("utm_captured_at"), "1700000000");
  assert.equal(anonymous.searchParams.has("marketing_consent"), false);
  assert.equal(anonymous.searchParams.has("email"), false);

  const accepted = new URL(tracking.authHref(links.LOGIN_URL, attribution, 1_700_000_001));
  assert.equal(accepted.searchParams.get("mode"), "login");
  assert.equal(accepted.searchParams.has("marketing_consent"), false);
  assert.equal(accepted.searchParams.get("utm_captured_at"), "1700000000");
  assert.equal(accepted.searchParams.has("marketing_checkbox"), false);
});

test("expired attribution is never sent to auth even from an already-open page", () => {
  const attribution = { capturedAt: 1_700_000_000, utms: { utm_source: "meta" } };
  const url = new URL(tracking.authHref(links.SIGNUP_URL, attribution, 1_700_000_000 + 30 * 86400 + 1));
  assert.equal(url.searchParams.has("utm_source"), false);
  assert.equal(url.searchParams.has("utm_captured_at"), false);
});

test("unconsented attribution can pass the current URL without persistent storage", () => {
  const attribution = tracking.attributionFromSearch("?utm_source=meta&utm_campaign=user%40example.com", 1_700_000_000);
  assert.deepEqual({ ...attribution.utms }, { utm_source: "meta" });
});

test("landing Pixel consent uses its own cookie without setting app consent", () => {
  const accepted = tracking.marketingConsentCookie("accepted", "landing.cloudstudy.com.br", true);
  assert.match(accepted, /^cloudstudy_landing_marketing_consent=1;/);
  assert.match(accepted, /Domain=\.cloudstudy\.com\.br/);
  assert.match(accepted, /Secure/);
  assert.equal(tracking.readMarketingConsent("other=x; cloudstudy_landing_marketing_consent=1"), "accepted");
  assert.equal(tracking.readMarketingConsent("cloudstudy_landing_marketing_consent=0"), "rejected");
  assert.equal(tracking.readMarketingConsent("cloudstudy_marketing_consent=1"), null);
  assert.equal(tracking.readMarketingConsent("other=x"), null);

  const local = tracking.marketingConsentCookie("rejected", "localhost", false);
  assert.match(local, /^cloudstudy_landing_marketing_consent=0;/);
  assert.equal(local.includes("Domain="), false);
});

test("the supplementary marketing notice discloses Pixel, CAPI and revocation without editing accepted policy", () => {
  const disclosure = fs.readFileSync(path.join(__dirname, "../app/privacidade/marketing/page.tsx"), "utf8");
  for (const detail of ["Pixel da Meta", "API de Conversões", "30 dias", "Configurações", "desmarcada inicialmente"]) {
    assert.match(disclosure, new RegExp(detail));
  }
});

test("CTA clicks prefer explicit attributes and only accept safe position labels", () => {
  assert.deepEqual({ ...tracking.resolveCta("Qualquer texto", "experimentar", "hero") }, { cta: "experimentar", position: "hero" });
  assert.deepEqual({ ...tracking.resolveCta("Experimentar grátis", "criar_conta", "planos-all-access") }, { cta: "criar_conta", position: "planos-all-access" });
  // posição com texto livre, e-mail ou tamanho excessivo nunca chega ao Pixel
  assert.equal(tracking.resolveCta("x", "experimentar", "alice@example.com").position, null);
  assert.equal(tracking.resolveCta("x", "experimentar", "A".repeat(80)).position, null);
  assert.equal(tracking.resolveCta("x", "experimentar", "Hero Section").position, null);
  // sem atributo, o texto antigo ainda classifica; links de login não são CTA
  assert.equal(tracking.resolveCta("Experimentar grátis").cta, "experimentar");
  assert.equal(tracking.resolveCta("Criar conta").cta, "criar_conta");
  assert.equal(tracking.resolveCta("Entrar"), null);
  assert.equal(tracking.resolveCta("Entrar", "outro", "hero"), null);
});

test("public prices on the landing match the commercial catalog", () => {
  const pricing = loadModule("lib/launch-pricing.ts");
  assert.equal(pricing.ALL_ACCESS_MONTHLY_CENTS, 4990);
  assert.equal(pricing.LIFETIME_PRICES_CENTS["CLF-C02"], 12990);
  assert.equal(pricing.LIFETIME_PRICES_CENTS["AIF-C01"], 12990);
  assert.equal(pricing.LIFETIME_PRICES_CENTS["SAA-C03"], 15990);
  assert.match(pricing.formatBrl(4990).replace(/\s/g, " "), /^R\$ 49,90$/);
  assert.match(pricing.formatBrl(15990).replace(/\s/g, " "), /^R\$ 159,90$/);
});

test("landing copy keeps the free-experience promise and never publishes real phone numbers", () => {
  const read = (file) => fs.readFileSync(path.join(__dirname, "../", file), "utf8");
  // a promessa do anúncio não pode voltar a dizer que toda aula exige contratação
  assert.equal(read("components/launch/final-cta-section.tsx").includes("depende de uma contratação ativa"), false);
  assert.equal(read("components/launch/faq-section.tsx").includes("é necessário ter acesso comercial ativo"), false);
  assert.match(read("components/launch/launch-hero.tsx"), /Experimentar grátis/);
  // depoimentos: nenhum telefone completo no código e todas as imagens tratadas existem
  const testimonials = read("components/launch/testimonials-section.tsx");
  assert.equal(/\d{4,5}[-\s]?\d{4}/.test(testimonials), false);
  const sources = [...testimonials.matchAll(/src: "(\/testimonials\/[a-z0-9-]+\.webp)"/g)].map((m) => m[1]);
  assert.ok(sources.length >= 5);
  for (const src of sources) {
    assert.ok(fs.existsSync(path.join(__dirname, "../public", src)), `${src} não existe em public/`);
  }
});

test("every launch CTA carries a safe position label and no placeholder data ships", () => {
  const dir = path.join(__dirname, "../components/launch");
  const positions = [];
  for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".tsx"))) {
    const source = fs.readFileSync(path.join(dir, file), "utf8");
    for (const match of source.matchAll(/data-cta-position="([^"]+)"/g)) positions.push(match[1]);
    assert.equal(/\[N\]|\[%\]/.test(source), false, `${file} contém dado de exemplo não preenchido`);
  }
  for (const label of ["menu", "hero", "produto", "final"]) assert.ok(positions.includes(label), `falta posição ${label}`);
  for (const position of positions) assert.match(position, /^[a-z0-9][a-z0-9_-]{0,39}$/);
});
