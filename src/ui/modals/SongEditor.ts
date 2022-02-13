import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import buttonStyles from "../styles/buttonStyles";
import { modalStyles } from "../styles/modals";
import inputStyles from "../styles/inputStyles";

import "../../icons/info_icon";
import "./editor/GridEditor";
import "./editor/GridEditorTitle";
import "./editor/GridEditorHelp";

import { DispatcherController } from "../../stores/lit_controller";
import { IState } from "../../stores/state";
import { existsInGallery } from "../../stores/register/gallery_tools";
import { actionNotificationOpen, actionTrackEditApply, actionTrackEditCancel } from "../../actions/actions";
import { localized, msg } from "@lit/localize";

@localized()
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

      textarea {
        height: 20em;
      }

      h2 {
        margin: 0;
        padding: 0;
      }

      .help_toggle {
        float: left;
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
    this._grid_title_already_exists = existsInGallery(value, this._original_title);
    this._grid_title = value;
  }

  _handle_change_grid(e: CustomEvent): void {
    this._update_grid(e.detail.value);
    this._grid_valid = e.detail.valid;
  }

  _handle_apply(): void {
    if (this._value) {
      actionTrackEditApply({
        title: this._grid_title,
        grid_text: this._value,
        updated_at: new Date().toISOString(),
      }).then(() => actionNotificationOpen(msg("Track updated")));
    } else {
      console.info("grid text is empty: close");
      actionTrackEditCancel();
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
    let disabled = "disabled";
    if (this._grid_valid && this._grid_title && this._value && !this._grid_title_already_exists) {
      disabled = "";
    }
    const color = getComputedStyle(this).getPropertyValue("--theme-help");
    return html` <div class="modal-footer">
      <button class="btn-secondary help_toggle" @click="${this._toggle_help}">
        <info-icon .fill="${color}"></info-icon>
        ${msg("See examples")}
      </button>

      <button class="btn-secondary" tabindex="-1" ontouchstart="" @click="${actionTrackEditCancel}">
        ${msg("Cancel")}
      </button>
      <button .disabled="${disabled}" ontouchstart="" @click="${this._handle_apply}">${msg("Apply")}</button>
    </div>`;
  }

  help_pane(): unknown {
    return html`<grid-editor-help .open=${this._help_pane_open}></grid-editor-help>`;
  }
}

export default SongEditor;
