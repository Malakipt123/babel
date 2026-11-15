/** Longest customer message we pass on to the AI provider. */
export const MAX_MESSAGE_LENGTH = 4000;

/** Clean up text selected on a page: trim, collapse whitespace, cap the length. */
export function normalizeSelection(text: string, maxLength = MAX_MESSAGE_LENGTH): string {
  const cleaned = text
    .replace(/[ \t\u00a0]+/g, ' ')
    .replace(/ ?\n ?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return cleaned.length > maxLength ? cleaned.slice(0, maxLength).trimEnd() : cleaned;
}
