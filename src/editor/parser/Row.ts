import Measure from "./Measure";

const row_regexp = /(\|{1,2})?[^|]+(\|{1,2})?/g
const row_invalid_regexp = new RegExp("\\|\\s\\||\\|\\|\\|")

class Row {

    private _raw: string
    private _measure: Measure[] = []
    private _valid = true
    private _reason: string | undefined = undefined

    constructor(raw: string) {
        this._raw = raw.trim();
        const match_invalid = this.raw.match(row_invalid_regexp);

        if (match_invalid) {
            this.valid = false
        } else {
            const matches = this.raw.matchAll(row_regexp);
            for (const m of matches) {
                const measure_object = new Measure(m[0]);
                this.valid = this.valid && measure_object.valid
                if (!measure_object.valid) {
                    this.reason = measure_object.reason
                }
                this.measure.push(measure_object);
            }
        }
    }

    get raw(): string {
        return this._raw;
    }

    set raw(value: string) {
        this._raw = value;
    }


    get measure(): Measure[] {
        return this._measure;
    }

    set measure(value: Measure[]) {
        this._measure = value;
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

export default Row
