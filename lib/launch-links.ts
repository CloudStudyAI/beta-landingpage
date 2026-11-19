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
// Free start: the visitor picks a certification and sees the plan before creating the account.
export const START_URL: string = `${APP_BASE_URL}/comecar`;
export const LOGIN_URL: string = `${SIGNUP_URL}?mode=login`;
// App Store campaign link (ct=www) so App Analytics separates downloads that came from the site.
export const APP_STORE_URL: string = "https://apps.apple.com/br/app/apple-store/id6833570271?pt=129783435&ct=www&mt=8";
