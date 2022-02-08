import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import buttonStyles from "../styles/buttonStyles";
import { modalStyles } from "../styles/modals";
import { IStateFeatureFlag } from "../../stores/state";

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

  @property()
  featureFlags: IStateFeatureFlag | undefined;

  private dispatchClose() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("close", options));
  }

  private dispatchToggleSyncEnable() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("toggleSyncEnable", options));
  }

  render(): unknown {
    return html`
      <h1>Keyboard shortcuts</h1>
      <div class="shortcuts">
        <table>
          <tr>
            <td><code>Ctrl+e</code></td>
            <td>Edit the current song</td>
          </tr>
          <tr>
            <td><code>Ctrl+s</code></td>
            <td>Save the current song to the library</td>
          </tr>
          <tr>
            <td><code>Esc</code></td>
            <td>Close the current open modal</td>
          </tr>
          <tr>
            <td><code>Ctrl+n</code></td>
            <td>New song</td>
          </tr>
          <tr>
            <td><code>Alt+=/Alt++</code></td>
            <td>Zoom in</td>
          </tr>
          <tr>
            <td><code>Alt+-</code></td>
            <td>Zoom out</td>
          </tr>
          <tr>
            <td><code>Ctrl+l</code></td>
            <td>open library</td>
          </tr>
          <tr>
            <td><code>Ctrl+c</code></td>
            <td>Copy the current song to the clipboard</td>
          </tr>
          <tr>
            <td><code>Ctrl+v</code></td>
            <td>Replace the current song with the one from the clipboard</td>
          </tr>
        </table>
      </div>
      <h1>Synchronization</h1>
      <div class="google-sync">
        <label for="featureSynchronizationEnabled">Save your song on google drive</label>
        <input
          data-testid="featureSynchronizationEnabled"
          id="featureSynchronizationEnabled"
          type="checkbox"
          .checked="${this.featureFlags?.synchro_enabled}"
          @change="${this.dispatchToggleSyncEnable}"
        />
      </div>
      <div class="modal-footer">
        <button tabindex="-1" class="btn-primary _close" @click="${this.dispatchClose}">Close</button>
      </div>
    `;
  }
}

export default HelpModal;
