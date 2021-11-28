import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles } from "../styles/button";
import { modalStyles } from "../styles/modals";
import { IStateSynchronization } from "../../stores/state";
import "./synchro/SynchronizeConfigurationActivate";
import "./synchro/SynchronizeConfigurationDeactivate";

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
    let body = html` <synchronize-configuration-deactivate
      .synchronization="${this.synchronization}"
    ></synchronize-configuration-deactivate>`;
    if (this.synchronization?.enabled && !this.synchronization?.inProgress) {
      body = html` <synchronize-configuration-activate
        .synchronization="${this.synchronization}"
      ></synchronize-configuration-activate>`;
    }
    return html`
      <h1>Synchronization</h1>
      ${body}
      <div class="modal-footer">
        <button tabindex="-1" class="btn-primary _close" @click="${this._dispatch_close}">Close</button>
      </div>
    `;
  }
}

export default SynchronizeConfiguration;
