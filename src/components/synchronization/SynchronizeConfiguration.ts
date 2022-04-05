import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { IState, IStateSynchronization } from "../../lib/state";
import "./SynchronizationConfigurationActivated";
import "./SynchronizationConfigurationDeactivated";
import { localized, msg } from "@lit/localize";
import { buttonStyles, modalStyles } from "../styles";
import { actionSynchronizationConfigurationClose } from "./actions";
import { DispatcherController } from "../../lib/lit_controller";

@localized()
@customElement("synchronize-configuration")
class SynchronizeConfiguration extends LitElement {
  static styles = [buttonStyles, modalStyles];

  constructor() {
    super();
    const cb = (st: IState) => {
      this.synchronization = st.synchronization;
    };
    this.addController(new DispatcherController(cb.bind(this)));
  }

  @state()
  synchronization: IStateSynchronization | undefined;

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
        <button
          tabindex="-1"
          class="btn-primary _close"
          ontouchstart=""
          @click="${actionSynchronizationConfigurationClose}"
        >
          ${msg("Close")}
        </button>
      </div>
    `;
  }
}

export default SynchronizeConfiguration;
