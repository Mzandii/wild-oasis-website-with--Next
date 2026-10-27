export function safeNext(
  value: FormDataEntryValue | string | null | undefined,
  fallback = "/account",
): string {
  if (typeof value !== "string") return fallback;
  // Must be an in-app path: "/x" yes, "//evil.com" and "/\evil.com" no
  if (
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.startsWith("/\\")
  ) {
    return fallback;
  }
  return value;
}
