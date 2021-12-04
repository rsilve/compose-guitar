export function normalize(value: string): string {
  return value.trim().replace(/\n\|$/s, "").trim();
}

export function auto_correct(value: string): string {
  return value
    .replace(/,|;/g, "|")
    .replace(/\|{3,}/g, "||")
    .replace(/^\s*([^:|])/, "|$1") // | at the begining
    .replace(/([^|])\n/g, "$1|\n") // | at end of line
    .replace(/\n([^|])/g, "\n|$1") // | at begining of line
    .replace(/\b\.\s*/g, " _ ") // . to insert _
    .replace(/\b([a-g])/g, (substring) => substring.toUpperCase()) // uppercase note
    .replace(/([^:|\s])(:?)\|/g, "$1 $2|") // space before |
    .replace(/\|(:?)([^:|\s])/g, "|$1 $2"); // space after |
}
