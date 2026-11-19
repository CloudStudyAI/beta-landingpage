// Valores públicos exibidos na landing.
//
// Fonte de verdade: catálogo comercial do backend (System_Dashboard,
// api/alembic: 20260928_0036, 20260930_0038, 20261030_0048, 20261103_0054 e 20261104_0059; código SAP-C03 em 20261105_0061; SOA-C03 em 20261108_0064; DOP-C02 em 20261109_0068; SCS-C03 em 20261110_0073; AIP-C01 em 20261110_0077; MLA-C02 em 20261110_0081; AIB-C01 na cadeia api/alembic/staged/aib_c01, que entra em versions na publicação). A landing não consulta o backend,
// então qualquer mudança de preço no catálogo precisa ser refletida aqui.
// O teste em tests/ fixa estes valores para que a divergência seja notada.

export const ALL_ACCESS_MONTHLY_CENTS = 4990;

export const LIFETIME_PRICES_CENTS = {
  "CLF-C02": 12990,
  "AIF-C01": 12990,
  "SAA-C03": 15990,
  "SAP-C03": 15990,
  "DVA-C03": 15990,
  "DEA-C01": 15990,
  "SOA-C03": 15990,
  "DOP-C02": 15990,
  "SCS-C03": 15990,
  "AIP-C01": 15990,
  "MLA-C02": 15990,
  "AIB-C01": 12990,
} as const;

export function formatBrl(cents: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

// Esquenta Black Friday 2026: 10% off on the web (System_Dashboard, api/alembic
// 20261119_0093). The regular prices above stay as the "de" price; set PROMO to null and
// empty PROMO_PRICES_CENTS when the backend restores the catalog. AIB-C01 has no promo
// price because it is not in the production catalog yet.
export const PROMO: { title: string; discountLabel: string } | null = {
  title: "Esquenta Black Friday",
  discountLabel: "10% off",
};

export const PROMO_PRICES_CENTS: Record<string, number> = {
  "all-access-monthly": 4490,
  "CLF-C02": 11690,
  "AIF-C01": 11690,
  "SAA-C03": 14390,
  "SAP-C03": 14390,
  "DVA-C03": 14390,
  "DEA-C01": 14390,
  "SOA-C03": 14390,
  "DOP-C02": 14390,
  "SCS-C03": 14390,
  "AIP-C01": 14390,
  "MLA-C02": 14390,
};

// What the visitor pays now: the promo price while the promo runs, else the regular price.
export function currentCents(key: string, regularCents: number): number {
  const promo = PROMO ? PROMO_PRICES_CENTS[key] : undefined;
  return typeof promo === "number" && promo < regularCents ? promo : regularCents;
}
