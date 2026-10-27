// Valores públicos exibidos na landing.
//
// Fonte de verdade: catálogo comercial do backend (System_Dashboard,
// api/alembic: 20260928_0036 e 20260930_0038). A landing não consulta o backend,
// então qualquer mudança de preço no catálogo precisa ser refletida aqui.
// O teste em tests/ fixa estes valores para que a divergência seja notada.

export const ALL_ACCESS_MONTHLY_CENTS = 4990;

export const LIFETIME_PRICES_CENTS = {
  "CLF-C02": 12990,
  "AIF-C01": 12990,
  "SAA-C03": 15990,
} as const;

export function formatBrl(cents: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}
