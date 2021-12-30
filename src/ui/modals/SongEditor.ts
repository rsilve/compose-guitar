import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import buttonStyles from "../styles/buttonStyles";
import { modalStyles } from "../styles/modals";
import inputStyles from "../styles/inputStyles";

import "../../icons/info_icon";
import "./editor/GridEditor";
import "./editor/GridEditorTitle";

import { DispatcherController } from "../../stores/lit_controller";
import { IState } from "../../stores/state";
import { exists_in_gallery } from "../../stores/register/gallery_tools";
import { action_notification_open, action_track_edit_apply, action_track_edit_cancel } from "../../actions/actions";

@customElement("song-editor")
class SongEditor extends LitElement {
  static styles = [
    buttonStyles,
    modalStyles,
    inputStyles,
    css`
      .song-editor-body {
        display: flex;
        flex-direction: row;
      }

      .song-editor-body-form {
        position: relative;
      }

      .song-editor-body-help {
        display: none;
        margin-left: 1em;
        margin-top: 1px;
        box-sizing: border-box;
        min-width: 20em;
        padding: 0.5em;
        background-color: var(--color-background);
        border: 1px solid var(--color-headline);
        border-radius: 4px;
      }

      .song-editor-body-help.open {
        display: block;
      }

      .song-editor-body-help chords-grid {
        font-size: 0.5em;
      }

      .song-editor-body-help-example {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
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
    `,
  ];

  @state()
  _value: string | undefined;

  @state()
  _grid_valid = true;

  @state()
  _grid_error_reason: string | undefined = undefined;

  @state()
  _grid_title: string | undefined;

  _original_title: string | undefined = undefined;

  @state()
  _grid_title_already_exists = false;

  @state()
  _help_pane_open = false;

  constructor() {
    super();
    const cb = ({ editor }: IState): void => {
      this._update_grid(editor?.grid_text);
      this._grid_title = editor?.title;
      this._original_title = this._grid_title;
    };
    this.addController(new DispatcherController(cb.bind(this)));
  }

  _update_grid(raw: string | undefined): void {
    this._value = raw;
  }

  _handle_change_title(e: CustomEvent): void {
    let { value } = e.detail;
    value = value.trim();
    this._grid_title_already_exists = exists_in_gallery(value, this._original_title);
    this._grid_title = value;
  }

  _handle_change_grid(e: CustomEvent): void {
    this._update_grid(e.detail.value);
    this._grid_valid = e.detail.valid;
  }

  _handle_apply(): void {
    if (this._value) {
      action_track_edit_apply({
        title: this._grid_title,
        grid_text: this._value,
        updated_at: new Date().toISOString(),
      }).then(() => action_notification_open("Track updated"));
    } else {
      console.info("grid text is empty: close");
      action_track_edit_cancel();
    }
  }

  _toggle_help(): void {
    this._help_pane_open = !this._help_pane_open;
  }

  render(): unknown {
    return html`
      <div class="song-editor-body">
        <div class="song-editor-body-form">
          <div class="form-item">
            <grid-editor-title
              .value="${ifDefined(this._grid_title)}"
              .invalid="${this._grid_title_already_exists}"
              @change-title="${this._handle_change_title}"
            ></grid-editor-title>
          </div>
          <div class="form-item">
            <grid-editor .value="${this._value}" @update-grid="${this._handle_change_grid}"></grid-editor>
          </div>
        </div>
        ${this.help_pane()}
      </div>
      ${this.footer_pane()}
    `;
  }

  footer_pane(): unknown {
    let disabled = "";
    if (!this._grid_valid || !this._grid_title || !this._value) {
      disabled = "disabled";
    }
    return html` <div class="modal-footer">
      <div class="help_toggle" @click="${this._toggle_help}">
        <info-icon></info-icon>
        See examples
      </div>

      <button class="btn-secondary" tabindex="-1" ontouchstart="" @click="${action_track_edit_cancel}">Cancel</button>
      <button .disabled="${disabled}" ontouchstart="" @click="${this._handle_apply}">Apply</button>
    </div>`;
  }

  help_pane(): unknown {
    const classes = classMap({
      "song-editor-body-help": true,
      open: this._help_pane_open,
    });
    return html`
            <div class="${classes}">
                <h2>Examples</h2>
                <p>Chord : <strong>A</strong>, <strong>Em</strong>, <strong>F#</strong>, <strong>Cb</strong>,
                    <strong>G7</strong>, <strong>D9</strong>, <strong>Asus2</strong>, <strong>Bm57b</strong>,
                    <strong>Bø</strong>, <strong>C/E</strong></p>
                <p>Measure : <strong>| A |</strong>, <strong>| D C |</strong>, <strong>| G Em _ _ |</strong>
                <div class="song-editor-body-help-example">
                    <chords-grid>| A |</chords-grid>
                    <chords-grid>| D C |</chords-grid>
                    <chords-grid>| G Em _ _ |</chords-grid>
                    <chords-grid>| G _ _ Em |</chords-grid>
                    <chords-grid>| G Em D7 G |</chords-grid>
                </div>
                </p>
                <p>Measure row : <strong>| F | G | Em | G Em |</strong>
                <div class="song-editor-body-help-example">
                    <chords-grid>| F | G | Em | G Em |</chords-grid>
                </div>
                </p>
                <p>Measure modifier : <strong>|(a) A |</strong>, <strong>|: D :|</strong>
                <div class="song-editor-body-help-example">
                    <chords-grid> |(a) A |</chords-grid>
                    <chords-grid>|: D :|</chords-grid>
                </div>
                </p>
            </div>`;
  }
}

export default SongEditor;
