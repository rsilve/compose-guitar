import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../../components/gallery";
import "../song";
import "../../components/help";
import "../createAndSave";
import "../../components/synchronization";
import { DispatcherController } from "../../lib/lit_controller";
import { IState } from "../../lib/state";
import { localized } from "@lit/localize";

@localized()
@customElement("compose-modals")
class Modals extends LitElement {
  static styles = css`
    .modal {
      display: block;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      padding: 1em;
      background-color: var(--theme-surface);
      color: var(--theme-on-surface);
      border: 1px solid var(--theme-surface-lighter);
      border-radius: var(--border-radius);

      font-size: 0.7em;
    }

    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.85);
    }

    .hide {
      display: none !important;
    }
  `;

  @state()
  _gallery_activated = false;

  @state()
  _editor_enabled = false;

  @state()
  _help_open = false;

  @state()
  _confirm_save_enabled = false;

  @state()
  synchronizationConfigurationOpen = false;

  constructor() {
    super();
    const cb = (st: IState) => {
      this._gallery_activated = (st.gallery as boolean) || false;
      this._editor_enabled = st.editor !== undefined;
      this._help_open = !!st.help_open;
      this._confirm_save_enabled = !!st.confirm_save;
      this.synchronizationConfigurationOpen = st.synchronization.open || false;
    };
    this.addController(new DispatcherController(cb.bind(this)));
  }

  render(): unknown {
    const overlay = html` <div class="overlay"></div>`;

    if (this._gallery_activated) {
      return html`${overlay} <track-gallery class="modal"></track-gallery>`;
    }
    if (this._editor_enabled) {
      return html`${overlay} <song-editor class="modal"></song-editor>`;
    }
    if (this._help_open) {
      return html`${overlay} <help-modal class="modal"></help-modal>`;
    }
    if (this._confirm_save_enabled) {
      return html`${overlay} <confirm-save class="modal"></confirm-save>`;
    }

    if (this.synchronizationConfigurationOpen) {
      return html`${overlay} <synchronize-configuration class="modal"></synchronize-configuration>`;
    }
    return html``;
  }
}

export default Modals;
