import Chord from "./Chord";

const measureRegexp = /^(\|{1,2})?(:)?(\((\w)\))?\s{0,5}(([^:|\s]{1,32}\s{0,5}){1,4})\s{0,5}(:)?(\|{1,2})?$/;

class Measure {
  private readonly _raw: string;

  private _chords: Chord[] = [];

  private _part: string | undefined = undefined;

  private _repeatStart = false;

  private _repeatEnd = false;

  private _valid = true;

  private _reason: string | undefined = undefined;

  private _type = 0;

  constructor(raw: string) {
    this._raw = raw.trim();
    const match = this.raw.match(measureRegexp);
    if (match) {
      this.extractChords(match[5].trim().split(/\s+/));
      this.extractPart(match[4]);
      this.repeatStart = !!match[2];
      this.repeatEnd = !!match[7];
      this.computeMeasureType();
    } else {
      this.valid = false;
    }
  }

  private extractPart(part: string | undefined): void {
    this.part = part;
  }

  private extractChords(chords: string[]) {
    let rawLength = chords.length;
    if (rawLength === 2) {
      chords.splice(1, 0, "_");
      chords.push("_");
      rawLength = 4;
    }
    for (let i = 0; i < 4 - rawLength; i += 1) {
      chords.push("_");
    }
    let lastChord: Chord | null = null;
    chords.forEach((chord) => {
      if (lastChord && chord === "_") {
        lastChord.duration += 1;
      } else {
        lastChord = new Chord(chord);
        this.valid = this.valid && lastChord.valid;
        if (!lastChord.valid) {
          this.reason = lastChord.name;
        }
        this.chords.push(lastChord);
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

  get repeatEnd(): boolean {
    return this._repeatEnd;
  }

  set repeatEnd(value: boolean) {
    this._repeatEnd = value;
  }

  get repeatStart(): boolean {
    return this._repeatStart;
  }

  set repeatStart(value: boolean) {
    this._repeatStart = value;
  }
}

export default Measure;
