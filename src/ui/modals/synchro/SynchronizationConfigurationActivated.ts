import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import buttonStyles from "../../styles/buttonStyles";
import { IStateSynchronization } from "../../../stores/state";

@customElement("synchronization-configuration-activated")
class SynchronizationConfigurationActivated extends LitElement {
  static styles = [
    buttonStyles,
    css`
      .btn-deactivate {
        display: block;
        width: 100%;
        margin: 2em 0;
      }

      .error {
        padding: 0.5em 0 0.8em 0;
      }

      .error-message {
        margin-top: 0.3em;
        padding: 0.5em 1em;
        border-radius: var(--border-radius);
        background-color: var(--theme-error);
        border: 1px solid var(--theme-error);
      }
    `,
  ];

  @property()
  synchronization: IStateSynchronization | undefined;

  private _dispatch_deactivate() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("deactivate", options));
  }

  render(): unknown {
    let errorStatus = html``;
    let signInStatus = html`<div>
      You are not connected. <a href="" @click="${this._dispatch_deactivate}">Retry ?</a>
    </div>`;
    let workingStatus = html` but does not work ⚠️`;
    if (this.synchronization?.signInValid || this.synchronization?.inProgress) {
      signInStatus = html`<div>You are connected</div>`;
      workingStatus = html``;
    }

    if (this.synchronization?.error) {
      const error = this.synchronization?.error as { error: string };
      errorStatus = html`<div class="error">
        The error message was
        <div class="error-message">${error.error}</div>
      </div>`;
    }

    return html`
      <div>Synchronization between devices is enabled${workingStatus}.</div>
      ${errorStatus} ${signInStatus}
      <button class="btn-secondary btn-deactivate _deactivate" @click="${this._dispatch_deactivate}">deactivate</button>
    `;
  }
}

export default SynchronizationConfigurationActivated;
