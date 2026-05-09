/**
 * Public site origin for sitemap/robots and metadata.
 * During CI or early Vercel setup, `NEXT_PUBLIC_APP_URL` may be unset — fall back to `VERCEL_URL`.
 */
export function getSiteBaseUrl(): string {
  const nextPublic = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (nextPublic) return nextPublic.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel}`.replace(/\/$/, "");
  return "http://localhost:3000";
}
