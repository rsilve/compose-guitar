const chord_regexp = /^([ABCDEFG])([b#])?(m)?([^\s/]{0,20})(\/([ABCDEFG])([b#])?)?$/;
const chord_extension_regexp = /^(-|\+|ø|°|5|b|6|7|9|add|sus2|sus4|dim|Maj7|M){0,5}$/;

const base_score: Record<string, number> = {
  A: 0,
  'A#': 1,
  Ab: 11,
  B: 2,
  Bb: 1,
  C: 3,
  'C#': 4,
  Cb: 2,
  D: 5,
  'D#': 6,
  Db: 4,
  E: 7,
  Eb: 6,
  F: 8,
  'F#': 9,
  Fb: 7,
  G: 10,
  'G#': 11,
  Gb: 9,
};

class Chord {
  private readonly _name: string;

  private _base: string | null = null;

  private _base_modifier: string | null = null;

  private _color: string | null = null;

  private _extension: string | null = null;

  private _external_base: string | null = null;

  private _external_base_modifier: string | null = null;

  private _valid = false;

  private readonly _same: boolean = false;

  private readonly _empty: boolean = false;

  private _duration = 1;

  constructor(name: string, duration?: number) {
    this._name = name.trim();
    const match = this.name.match(chord_regexp);
    if (match) {
      const extension_match = this._parse_extension(match[4] || null);
      if (extension_match) {
        this.base = match[1];
        this.base_modifier = match[2] || null;
        this.color = match[3] || null;
        this.external_base = match[6] || null;
        this.external_base_modifier = match[7] || null;
        this.valid = true;
      }
    }
    if (this.name === '%') {
      this._same = true;
      this.base = '%';
      this.valid = true;
    }
    if (this.name === 'X') {
      this._empty = true;
      this.valid = true;
    }

    if (duration) {
      this.duration = duration;
    }
  }

  _parse_extension(extension: string | null): boolean {
    if (!extension) {
      return true;
    }
    const match = extension.match(chord_extension_regexp);
    if (match) {
      this.extension = match[0];
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

  get base_modifier(): string | null {
    return this._base_modifier;
  }

  set base_modifier(value: string | null) {
    this._base_modifier = value;
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

  get external_base(): string | null {
    return this._external_base;
  }

  set external_base(value: string | null) {
    this._external_base = value;
  }

  get external_base_modifier(): string | null {
    return this._external_base_modifier;
  }

  set external_base_modifier(value: string | null) {
    this._external_base_modifier = value;
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
      const note = `${this.base}${this.base_modifier ? this.base_modifier : ''}`;
      const score = base_score[note];
      if (score >= 0) {
        return score;
      }
    }
    return -1;
  }

  transpose(tone: number): Chord {
    if (this.base) {
      const note = `${this.base}${this.base_modifier ? this.base_modifier : ''}`;
      let raw = this.name.replace(note, this._transpose(note, tone));
      if (this.external_base) {
        const external_base = `${this.external_base}${this.external_base_modifier ? this.external_base_modifier : ''}`;
        raw = raw.replace(external_base, this._transpose(external_base, tone));
      }
      return new Chord(raw);
    }
    return this;
  }

  _transpose(orig: string, tone: number): string {
    let score = 0;
    for (const n of Object.keys(base_score)) {
      if (orig === n) {
        score = base_score[n];
      }
    }
    score += tone;
    score %= 12;
    for (const n of Object.keys(base_score)) {
      if (score === base_score[n]) {
        return n;
      }
    }
    return orig;
  }
}

export default Chord;
