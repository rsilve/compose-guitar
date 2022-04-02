import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { IState, IStateFeatureFlag } from "../../stores/state";
import { msg } from "@lit/localize";
import { buttonStyles, modalStyles } from "../styles";
import { actionHelpClose } from "./actions";
import { actionSynchroToggleEnable } from "../../actions/actions";
import { DispatcherController } from "../../stores/lit_controller";

@customElement("help-modal")
class HelpModal extends LitElement {
  static styles = [
    buttonStyles,
    modalStyles,
    css`
      .shortcuts {
        padding-bottom: 1em;
      }
      .shortcuts p {
        margin: 0.6ex 0;
      }
      code {
        display: inline-block;
        padding: 0.2ex 0.6ex;
        border-radius: var(--border-radius);
        background-color: var(--theme-secondary);
      }
      td + td {
        padding-left: 1ex;
      }
    `,
  ];

  constructor() {
    super();
    const cb = (st: IState) => {
      this.featureFlags = st.featureFlags;
    };
    this.addController(new DispatcherController(cb.bind(this)));
  }

  @state()
  featureFlags: IStateFeatureFlag | undefined;

  private dispatchToggleSyncEnable() {
    actionSynchroToggleEnable().then(() => {
      if (import.meta.env?.PROD) {
        document.location.reload();
      }
    });
  }

  render(): unknown {
    return html`
      <h1>${msg("Keyboard shortcuts")}</h1>
      <div class="shortcuts">
        <table>
          <tr>
            <td><code>Ctrl+e</code></td>
            <td>${msg("Edit the current song")}</td>
          </tr>
          <tr>
            <td><code>Ctrl+s</code></td>
            <td>${msg("Save the current song to the library")}</td>
          </tr>
          <tr>
            <td><code>Esc</code></td>
            <td>${msg("Close the current open modal")}</td>
          </tr>
          <tr>
            <td><code>Ctrl+n</code></td>
            <td>${msg("New song")}</td>
          </tr>
          <tr>
            <td><code>Alt+=/Alt++</code></td>
            <td>${msg("Zoom in")}</td>
          </tr>
          <tr>
            <td><code>Alt+-</code></td>
            <td>${msg("Zoom out")}</td>
          </tr>
          <tr>
            <td><code>Ctrl+l</code></td>
            <td>${msg("Open library")}</td>
          </tr>
          <tr>
            <td><code>Ctrl+c</code></td>
            <td>${msg("Copy the current song to the clipboard")}</td>
          </tr>
          <tr>
            <td><code>Ctrl+v</code></td>
            <td>${msg("Replace the current song with the one from the clipboard")}</td>
          </tr>
        </table>
      </div>
      <h1>${msg("Synchronization")}</h1>
      <div class="google-sync">
        <label for="featureSynchronizationEnabled">${msg("Save your song on google drive")}</label>
        <input
          data-testid="featureSynchronizationEnabled"
          id="featureSynchronizationEnabled"
          type="checkbox"
          .checked="${this.featureFlags?.synchro_enabled}"
          @change="${this.dispatchToggleSyncEnable}"
        />
      </div>
      <div class="modal-footer">
        <button tabindex="-1" class="btn-primary _close" @click="${actionHelpClose}">${msg("Close")}</button>
      </div>
    `;
  }
}

export default HelpModal;
