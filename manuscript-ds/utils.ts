/** Tiny classname joiner so the design system has zero external deps. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ")
}
