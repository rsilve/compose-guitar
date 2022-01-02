export function normalize(value: string): string {
  return value.replace(/\n\|$/s, "").trim();
}

function auto_correct(value: string): string {
  return value
    .replace(/[,;]/g, "|")
    .replace(/\|{3,}/g, "||")
    .replace(/^\s*([^:|])/, "|$1") // | at the beginning
    .replace(/([^|])\n/g, "$1|\n") // | at end of line
    .replace(/\n([^|])/g, "\n|$1") // | at beginning of line
    .replace(/\b\s*\.\s*/g, " _ ") // . to insert _
    .replace(/([^:|\s])(:?)\|/g, "$1 $2|") // space before |
    .replace(/\|([a-gA-G])/g, "| $1") // space after |
    .replace(/\|(\([^)]\))([a-gA-G])/g, "|$1 $2") // space after |(x)
    .replace(/\s([a-g])/g, (substring) => substring.toUpperCase()); // uppercase note
}

export class AutoCorrect {
  private readonly _value: string;
  private readonly _position: number;

  constructor(value: string, pos: number) {
    let position = pos;
    if (position < 0) {
      position = value.length;
    }
    let head = value.slice(0, position);
    head = auto_correct(head);
    let tail = "";
    if (value.length > position) {
      tail = value.slice(position);
    }
    this._value = (head + tail)
      .replace(/[ \t]+/g, " ")
      .replace(/\| +\|/g, "|")
      .replace(/([^\n|])\s*$/, "$1 |");
    this._position = head.length;
  }

  get value(): string {
    return this._value;
  }

  get position(): number {
    return this._position;
  }
}
