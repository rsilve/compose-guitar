import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import buttonStyles from "../styles/buttonStyles";
import { modalStyles } from "../styles/modals";
import { IStateSynchronization } from "../../stores/state";
import "./synchro/SynchronizationConfigurationActivated";
import "./synchro/SynchronizationConfigurationDeactivated";

@customElement("synchronize-configuration")
class SynchronizeConfiguration extends LitElement {
  static styles = [buttonStyles, modalStyles];

  @property()
  synchronization: IStateSynchronization | undefined;

  private _dispatch_close() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("close", options));
  }

  render(): unknown {
    let body = html` <synchronization-configuration-deactivated
      .synchronization="${this.synchronization}"
    ></synchronize-configuration-deactivate>`;
    if (this.synchronization?.enabled && !this.synchronization?.signInProgress) {
      body = html` <synchronization-configuration-activated
        .synchronization="${this.synchronization}"
      ></synchronization-configuration-activated>`;
    }
    return html`
      <h1>Synchronization</h1>
      ${body}
      <div class="modal-footer">
        <button tabindex="-1" class="btn-primary _close" ontouchstart="" @click="${this._dispatch_close}">Close</button>
      </div>
    `;
  }
}

export default SynchronizeConfiguration;
