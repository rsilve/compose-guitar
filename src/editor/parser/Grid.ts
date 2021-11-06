import Row from "./Row"

class Grid {
    private _raw: string | undefined
    private _rows: Row[] = []
    private _valid = true
    private _reason: string | undefined = undefined

    constructor(raw: string | undefined) {
        if (raw) {
            const trimmed = raw?.trim();
            this._raw = trimmed
            const rows = trimmed.split(/\n|;\s*?\n?/);
            for (const r of rows) {
                const row = new Row(r);
                this.rows.push(row)
                this.valid = this.valid && row.valid
                if (!row.valid) {
                    this.reason = row.reason
                }
            }
        } else {
            this._raw = undefined
        }
    }

    get raw(): string | undefined {
        return this._raw;
    }

    set raw(value: string | undefined) {
        this._raw = value;
    }

    get rows(): Row[] {
        return this._rows;
    }

    set rows(value: Row[]) {
        this._rows = value;
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

export default Grid
