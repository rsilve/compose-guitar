import Chord from "./Chord";

const measure_regexp = /^(\|{1,2})?(:)?(\((\w)\))?\s{0,5}(([^:|\s]{1,32}\s{0,5}){1,4})\s{0,5}(:)?(\|{1,2})?$/;

class Measure {
  private _raw: string;

  private _chords: Chord[] = [];

  private _part: string | undefined = undefined;

  private _repeat_start = false;

  private _repeat_end = false;

  private _valid = true;

  private _reason: string | undefined = undefined;

  private _type = 0;

  constructor(raw: string) {
    this._raw = raw.trim();
    const match = this.raw.match(measure_regexp);
    if (match) {
      this.extract_chords(match[5].trim().split(/\s+/));
      this.extract_part(match[4]);
      this.repeat_start = !!match[2];
      this.repeat_end = !!match[7];
      this.computeMeasureType();
    } else {
      this.valid = false;
    }
  }

  private extract_part(part: string | undefined): void {
    this.part = part;
  }

  private extract_chords(chords: string[]) {
    let raw_length = chords.length;
    if (raw_length === 2) {
      chords.splice(1, 0, "_");
      chords.push("_");
      raw_length = 4;
    }
    for (let i = 0; i < 4 - raw_length; i += 1) {
      chords.push("_");
    }
    let last_chord: Chord | null = null;
    chords.forEach((chord) => {
      if (last_chord && chord === "_") {
        last_chord.duration += 1;
      } else {
        last_chord = new Chord(chord);
        this.valid = this.valid && last_chord.valid;
        if (!last_chord.valid) {
          this.reason = last_chord.name;
        }
        this.chords.push(last_chord);
      }
    });
  }

  private computeMeasureType() {
    const count = this.chords.length;
    const { duration } = this.chords[0];
    let duration2 = 0;
    if (count === 1) {
      this.type = 1;
    }
    if (count === 2 && duration === 1) {
      this.type = 2;
    }
    if (count === 2 && duration === 2) {
      this.type = 3;
    }
    if (count === 2 && duration === 3) {
      this.type = 4;
    }
    if (count === 3) {
      duration2 = this.chords[1].duration;
    }
    if (count === 3 && duration === 1 && duration2 === 1) {
      this.type = 5;
    }
    if (count === 3 && duration === 1 && duration2 === 2) {
      this.type = 6;
    }
    if (count === 3 && duration === 2) {
      this.type = 7;
    }
    if (count === 4) {
      this.type = 8;
    }
  }

  get raw(): string {
    return this._raw;
  }

  get chords(): Chord[] {
    return this._chords;
  }

  get valid(): boolean {
    return this._valid;
  }

  set valid(value: boolean) {
    this._valid = value;
  }

  get reason(): string | undefined {
    return this._reason;
  }

  set reason(value: string | undefined) {
    this._reason = value;
  }

  get type(): number {
    return this._type;
  }

  set type(value: number) {
    this._type = value;
  }

  get part(): string | undefined {
    return this._part;
  }

  set part(value: string | undefined) {
    this._part = value;
  }

  get repeat_end(): boolean {
    return this._repeat_end;
  }

  set repeat_end(value: boolean) {
    this._repeat_end = value;
  }

  get repeat_start(): boolean {
    return this._repeat_start;
  }

  set repeat_start(value: boolean) {
    this._repeat_start = value;
  }
}

export default Measure;
