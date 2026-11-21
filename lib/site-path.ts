export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sulemansadat.com";

export function assetPath(path: string) {
  return path;
}

export function absoluteUrl(path = "/") {
  return new URL(assetPath(path), siteUrl).toString();
}
