const chordRegexp = /^([ABCDEFG])([b#])?(m)?([^\s/]{0,20})(\/([ABCDEFG])([b#])?)?$/;
const chordExtensionRegexp = /^(-|\+|ø|°|5|b|6|7|9|add|sus2|sus4|dim|Maj7|M){0,5}$/;

const baseScore: Record<string, number> = {
  A: 0,
  "A#": 1,
  Ab: 11,
  B: 2,
  Bb: 1,
  C: 3,
  "C#": 4,
  Cb: 2,
  D: 5,
  "D#": 6,
  Db: 4,
  E: 7,
  Eb: 6,
  F: 8,
  "F#": 9,
  Fb: 7,
  G: 10,
  "G#": 11,
  Gb: 9,
};

class Chord {
  private readonly _name: string;

  private _base: string | null = null;

  private _baseModifier: string | null = null;

  private _color: string | null = null;

  private _extension: string | null = null;

  private _externalBase: string | null = null;

  private _externalBaseModifier: string | null = null;

  private _valid = false;

  private readonly _same: boolean = false;

  private readonly _empty: boolean = false;

  private _duration = 1;

  constructor(name: string, duration?: number) {
    this._name = name.trim();
    const match = this.name.match(chordRegexp);
    if (match) {
      const extensionMatch = this.parseExtension(match[4] || null);
      if (extensionMatch) {
        // eslint-disable-next-line prefer-destructuring
        this.base = match[1];
        this.baseModifier = match[2] || null;
        this.color = match[3] || null;
        this.externalBase = match[6] || null;
        this.externalBaseModifier = match[7] || null;
        this.valid = true;
      }
    }
    if (this.name === "%") {
      this._same = true;
      this.base = "%";
      this.valid = true;
    }
    if (this.name === "X") {
      this._empty = true;
      this.valid = true;
    }

    if (duration) {
      this.duration = duration;
    }
  }

  private parseExtension(extension: string | null): boolean {
    if (!extension) {
      return true;
    }
    const match = extension.match(chordExtensionRegexp);
    if (match) {
      [this.extension] = match;
    }
    return !!match;
  }

  get name(): string {
    return this._name;
  }

  get base(): string | null {
    return this._base;
  }

  set base(value: string | null) {
    this._base = value;
  }

  get baseModifier(): string | null {
    return this._baseModifier;
  }

  set baseModifier(value: string | null) {
    this._baseModifier = value;
  }

  get color(): string | null {
    return this._color;
  }

  set color(value: string | null) {
    this._color = value;
  }

  get extension(): string | null {
    return this._extension;
  }

  set extension(value: string | null) {
    this._extension = value;
  }

  get externalBase(): string | null {
    return this._externalBase;
  }

  set externalBase(value: string | null) {
    this._externalBase = value;
  }

  get externalBaseModifier(): string | null {
    return this._externalBaseModifier;
  }

  set externalBaseModifier(value: string | null) {
    this._externalBaseModifier = value;
  }

  get valid(): boolean {
    return this._valid;
  }

  set valid(value: boolean) {
    this._valid = value;
  }

  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
  }

  get same(): boolean {
    return this._same;
  }

  get empty(): boolean {
    return this._empty;
  }

  tone(): number {
    if (this.base) {
      const note = `${this.base}${this.baseModifier ? this.baseModifier : ""}`;
      const score = baseScore[note];
      if (score >= 0) {
        return score;
      }
    }
    return -1;
  }

  transpose(tone: number): Chord {
    if (this.same) {
      return this;
    }
    if (this.base) {
      const note = `${this.base}${this.baseModifier ? this.baseModifier : ""}`;
      let raw = this.name.replace(note, this._transpose(note, tone));
      if (this.externalBase) {
        const externalBase = `${this.externalBase}${this.externalBaseModifier ? this.externalBaseModifier : ""}`;
        raw = raw.replace(externalBase, this._transpose(externalBase, tone));
      }
      return new Chord(raw);
    }
    return this;
  }

  _transpose(noteOrig: string, tone: number): string {
    let score = 0;
    score = Object.entries(baseScore)
      .filter((entry) => entry[0] === noteOrig)
      .reduce((_, entry) => entry[1], score);
    score += tone + 12;
    score %= 12;
    const notes = Object.entries(baseScore)
      .filter((entry) => score === entry[1])
      .map((entry) => entry[0]);
    return notes.length > 0 ? notes[0] : noteOrig;
  }
}

export default Chord;
