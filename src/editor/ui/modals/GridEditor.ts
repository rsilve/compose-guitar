import {css, html, LitElement, PropertyValues} from 'lit';
import {customElement, query, state} from "lit/decorators.js";
import {buttonStyles} from "../styles/button";
import {modalStyles} from "../styles/modals";
import {inputStyles} from "../styles/input";
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';

import "../../../icons/info_icon"
import {DispatcherController} from "../../../stores/lit_controller";
import {IState} from "../../stores/state";
import Grid from "../../parser/Grid";
import {exists_in_gallery} from "../../stores/register/gallery_tools";
import {action_track_edit_apply, action_track_edit_cancel} from "../../actions/actions";

@customElement('grid-editor')
class GridEditor extends LitElement {
    static styles = [
        buttonStyles,
        modalStyles,
        inputStyles,
        css`
       .grid-editor-body {
            display: flex;
            flex-direction: row;
       }
       
       .grid-editor-body-form {
            position: relative;
       }
       
       .grid-editor-body-form-error {
            position: absolute;
            box-sizing: border-box;
            width: 100%;
            padding: 1ex;
            bottom: 0;
            background-color: hsla(var(--color-error-h),var(--color-error-s),var(--color-error-l), 0.9);
            color: var(--color-background);
            border-radius: 0 0 var(--border-radius) var(--border-radius);
       }
       
       .grid-editor-body-form-error-title {
            position: absolute;
            box-sizing: border-box;
            bottom: 2px;
            right: 2px;
            padding: .5ex 1.5ex;
            background-color: var(--color-background-secondary);
            color: var(--color-text);
            border-radius: var(--border-radius) 0 var(--border-radius) 0;
       }
       
       .grid-editor-body-help {
            display: none;
            margin-left: 1em;
            margin-top: 1px;
            box-sizing: border-box;
            min-width: 20em;
            padding: .5em;
            background-color: var(--color-background);
            border: 1px solid var(--color-headline);
            border-radius: 4px;
       }
       
       .grid-editor-body-help.open {
            display: block;
       }
       
       .grid-editor-body-help chords-grid {
            font-size: .5em;
       }
        
        .grid-editor-body-help-example {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }
        
        input, textarea {
            display: block;
            font-family: monospace;
            font-size: 2em;
            width: 30em;
        }
        
        textarea {
            height: 20em;
        }
        
        h2 {
            margin: 0;
            padding: 0;
        }
       
        .help_toggle {
            display: block;
            position: absolute;
            line-height: 0;
            cursor: pointer;
        }
        
        button:active {
            transform: scale(1.2);
        }
    `]

    @query("#title_input")
    _el_title: HTMLInputElement | undefined

    @state()
    _value: string | undefined;

    @state()
    _grid_valid = true;

    @state()
    _grid_error_reason: string | undefined = undefined;

    @state()
    _grid_title: string | undefined;
    _original_title: string | undefined = undefined

    @state()
    _grid_title_already_exists = false

    @state()
    _help_pane_open = false

    constructor() {
        super();
        const cb = ({editor}: IState): void => {
            this._update_grid(editor?.grid_text)
            this._grid_title = editor?.title
            this._original_title = this._grid_title
        }
        new DispatcherController(this, cb.bind(this))
    }


    protected firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);
        this._el_title?.focus()
    }

    _update_grid(raw: string | undefined): void {
        if (raw) {
            const parsed = new Grid(raw)
            this._grid_valid = parsed.valid
            this._grid_error_reason = parsed.reason
        } else {
            this._grid_valid = true
        }
        this._value = raw
    }

    _handle_change_title(e: Event): void {
        let value = (e.target as HTMLInputElement).value
        value = value.trim()
        this._grid_title_already_exists = exists_in_gallery(value, this._original_title)
        this._grid_title = value
    }

    _handle_change_grid(e: Event): void {
        let value = (e.target as HTMLTextAreaElement).value
        value = value.replace(/([^:|\s])\|/g, "$1 |").replace(/\|([^:|\s])/g, "| $1")
        value = value.trim()
        this._update_grid(value)
    }

    _handle_apply(): void {
        if (this._value) {
            action_track_edit_apply({
                title: this._grid_title,
                grid_text: this._value,
                updated_at: new Date().toISOString()
            })
        } else {
            console.log("grid text is empty: close")
            action_track_edit_cancel()
        }
    }

    _toggle_help(): void {
        this._help_pane_open = !this._help_pane_open
    }

    render(): unknown {
        return html`
            <div class="grid-editor-body">
                <div class="grid-editor-body-form">
                    <div class="form-item">
                        ${this.title_error_pane()}
                        <input id="title_input" type="text" .value="${ifDefined(this._grid_title)}"
                               class="${classMap({"invalid": this._grid_title_already_exists})}"
                               required placeholder="Title (required)"
                               @input="${this._handle_change_title}">
                       
                    </div>
                    <div class="form-item">
                        <textarea .value="${ifDefined(this._value)}" class="${classMap({"invalid": !this._grid_valid})}"
                                  required placeholder="Chords (required)"
                                  @input="${this._handle_change_grid}"></textarea>
                        ${this.grid_error_pane()}
                    </div>

                </div>
                ${this.help_pane()}

            </div>
            ${this.footer_pane()}
        `;
    }

    footer_pane(): unknown {
        let disabled = ""
        if (!this._grid_valid || !this._grid_title || !this._value) {
            disabled = "disabled"
        }
        return html`
            <div class="modal-footer">
                <div class="help_toggle" @click="${this._toggle_help}">
                    <info-icon></info-icon>
                    See examples
                </div>

                <button class="btn-secondary" tabindex="-1" ontouchstart=""
                        @click="${action_track_edit_cancel}">Cancel
                </button>
                <button .disabled="${disabled}" ontouchstart=""
                        @click="${this._handle_apply}">Apply
                </button>
            </div>`
    }

    grid_error_pane(): unknown {
        if (!this._grid_valid) {
            return html`
                <div class="grid-editor-body-form-error">Invalid syntax : ${this._grid_error_reason}</div>`
        } else {
            return html``
        }
    }

    title_error_pane(): unknown {
        if (this._grid_title_already_exists) {
            return html`
                <div class="grid-editor-body-form-error-title">This title already exists</div>`
        } else {
            return html``
        }
    }

    help_pane(): unknown {
        const classes = classMap({"grid-editor-body-help": true, open: this._help_pane_open})
        return html`
            <div class="${classes}">
                <h2>Examples</h2>
                <p>Chord : <strong>A</strong>, <strong>Em</strong>, <strong>F#</strong>, <strong>Cb</strong>,
                    <strong>G7</strong>, <strong>D9</strong>, <strong>Asus2</strong>, <strong>Bm57b</strong>,
                    <strong>Bø</strong>, <strong>C/E</strong></p>
                <p>Measure : <strong>| A |</strong>, <strong>| D C |</strong>, <strong>| G Em _ _ |</strong>
                <div class="grid-editor-body-help-example">
                    <chords-grid>| A |</chords-grid>
                    <chords-grid>| D C |</chords-grid>
                    <chords-grid>| G Em _ _ |</chords-grid>
                    <chords-grid>| G _ _ Em |</chords-grid>
                    <chords-grid>| G Em D7 G |</chords-grid>
                </div>
                </p>
                <p>Measure row : <strong>| F | G | Em | G Em |</strong>
                <div class="grid-editor-body-help-example">
                    <chords-grid>| F | G | Em | G Em |</chords-grid>
                </div>
                </p>
                <p>Measure modifier : <strong>|(a) A |</strong>, <strong>|: D :|</strong>
                <div class="grid-editor-body-help-example">
                    <chords-grid> |(a) A |</chords-grid>
                    <chords-grid>|: D :|</chords-grid>
                </div>
                </p>
            </div>`
    }
}

export default GridEditor
