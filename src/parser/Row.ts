import Measure from "./Measure";

const ROW_REGEXP = /(\|{1,2})?[^|]+(\|{1,2})?/g;
const ROW_INVALID_REGEXP = /\|\s\||\|\|\|/;

class Row {
  private readonly _raw: string;

  private _measure: Measure[] = [];

  private _valid = true;

  private _reason: string | undefined = undefined;

  constructor(raw: string) {
    this._raw = raw.trim();
    const matchInvalid = this.raw.match(ROW_INVALID_REGEXP);

    if (matchInvalid) {
      this.valid = false;
    } else {
      const matches = this.raw.matchAll(ROW_REGEXP);
      for (const m of matches) {
        const measureObject = new Measure(m[0]);
        this.valid = this.valid && measureObject.valid;
        if (!measureObject.valid) {
          this.reason = measureObject.reason;
        }
        this.measure.push(measureObject);
      }
    }
  }

  get raw(): string {
    return this._raw;
  }

  get measure(): Measure[] {
    return this._measure;
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
}

export default Row;
