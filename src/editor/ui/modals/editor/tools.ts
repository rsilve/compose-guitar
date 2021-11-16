export function normalize(value: string): string {
    return value.replace(/([^:|\s])\|/g, "$1 |")
        .replace(/\|([^:|\s])/g, "| $1")
        .trim()
}

export function auto_correct(value: string): string {
    return value
        .replace(/,/g, '|')
        .replace(/\b([a-g])/g, substring => substring.toUpperCase())
}
