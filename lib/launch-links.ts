const DEFAULT_APP_URL = "https://app.cloudstudy.com.br";

function normalizeAppUrl(value: string | undefined): string {
  if (!value?.trim()) return DEFAULT_APP_URL;

  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || url.username || url.password) {
      return DEFAULT_APP_URL;
    }

    return url.origin;
  } catch {
    return DEFAULT_APP_URL;
  }
}

export const APP_BASE_URL: string = normalizeAppUrl(
  process.env.NEXT_PUBLIC_CLOUDSTUDY_APP_URL,
);
export const SIGNUP_URL: string = `${APP_BASE_URL}/auth`;
export const LOGIN_URL: string = `${SIGNUP_URL}?mode=login`;
