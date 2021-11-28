import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles } from "../../styles/button";
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
    let signInStatus = html`<div>You are not connected</div>`;
    let workingStatus = html` but does not work`
    if (this.synchronization?.signInValid || this.synchronization?.inProgress) {
      signInStatus = html`<div>You are connected</div>`;
      workingStatus = html``
    }

    if (this.synchronization?.error) {
      const error = this.synchronization?.error as { error: string };
      errorStatus = html`<div>${error.error}</div>`;
    }

    return html`
      <div>Synchronization between devices is enabled${workingStatus}.</div>
      ${signInStatus} ${errorStatus}
      <button class="btn-secondary btn-deactivate _deactivate" @click="${this._dispatch_deactivate}">deactivate</button>
    `;
  }
}

export default SynchronizationConfigurationActivated;
