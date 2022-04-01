import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { IStateSynchronization } from "../../stores/state";
import "./SynchronizationConfigurationActivated";
import "./SynchronizationConfigurationDeactivated";
import { localized, msg } from "@lit/localize";
import { buttonStyles, modalStyles } from "../styles";

@localized()
@customElement("synchronize-configuration")
class SynchronizeConfiguration extends LitElement {
  static styles = [buttonStyles, modalStyles];

  @property()
  synchronization: IStateSynchronization | undefined;

  private dispatchClose() {
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
      <h1>${msg("Synchronization")}</h1>
      ${body}
      <div class="modal-footer">
        <button tabindex="-1" class="btn-primary _close" ontouchstart="" @click="${this.dispatchClose}">
          ${msg("Close")}
        </button>
      </div>
    `;
  }
}

export default SynchronizeConfiguration;
