const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sulemansadat.com";

export function assetPath(path: string) {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}

export function absoluteUrl(path = "/") {
  return new URL(assetPath(path), siteUrl).toString();
}
