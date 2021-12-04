export function normalize(value: string): string {
  return value
    .replace(/([^:|\s])\|/g, "$1 |")
    .replace(/\|([^:|\s])/g, "| $1")
    .replace(/\n\s*\|\s*$/s, "")
    .trim();
}

export function auto_correct(value: string): string {
  return value
    .replace(/,/g, "|")
    .replace(/^\s*([^|])/, "|$1")
    .replace(/\n([^|])/, "\n|$1")
    .replace(/([^|])\n/, "$1|\n")
    .replace(/\b\.\s*/g, " _ ")
    .replace(/\b([a-g])/g, (substring) => substring.toUpperCase());
}
