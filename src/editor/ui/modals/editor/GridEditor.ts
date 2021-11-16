import {css, html, LitElement} from 'lit';
import {customElement, property, state} from "lit/decorators.js";
import {ifDefined} from "lit/directives/if-defined.js";
import {classMap} from "lit/directives/class-map.js";
import Grid from "../../../parser/Grid";
import {inputStyles} from "../../styles/input";


@customElement('grid-editor')
class GridEditor extends LitElement {

    static styles = [
        inputStyles,
        css`
    input, textarea {
        display: block;
        font-family: monospace;
        font-size: 2em;
        width: 30em;
    }
    
    textarea {
        height: 20em;
    }
        
    .song-editor-body-form-error {
            position: absolute;
            box-sizing: border-box;
            width: 100%;
            padding: 1ex;
            bottom: 0;
            background-color: hsla(var(--color-error-h),var(--color-error-s),var(--color-error-l), 0.9);
            color: var(--color-background);
            border-radius: 0 0 var(--border-radius) var(--border-radius);
       }
    `]

    connectedCallback() {
        super.connectedCallback();
        this.validate(this.value)
    }

    @property()
    value: string | undefined

    @state()
    _grid_valid = true

    @state()
    _grid_error_reason: string | undefined = undefined;

    _handle_change_grid(e: Event): void {
        let raw = (e.target as HTMLTextAreaElement).value
        raw = raw.replace(/([^:|\s])\|/g, "$1 |").replace(/\|([^:|\s])/g, "| $1")
        raw = raw.trim()

        this.validate(raw)

        const options = {
            detail: {value: raw, valid: this._grid_valid},
            bubbles: true,
            composed: true
        };
        this.dispatchEvent(new CustomEvent('update-grid', options));

    }

    render(): unknown {
        return html`
            <textarea .value="${ifDefined(this.value)}" class="${classMap({"invalid": !this._grid_valid})}"
                      required placeholder="Chords (required)"
                      @input="${this._handle_change_grid}"></textarea>
            ${this.grid_error_pane()}
        `;
    }

    grid_error_pane(): unknown {
        if (!this._grid_valid) {
            return html`
                <div class="song-editor-body-form-error">Invalid syntax : ${this._grid_error_reason}</div>`
        } else {
            return html``
        }
    }


    private validate(raw: string | undefined): void {
        if (raw) {
            const parsed = new Grid(raw)
            this._grid_valid = parsed.valid
            this._grid_error_reason = parsed.reason
        } else {
            this._grid_valid = true
        }
    }
}

export default GridEditor
