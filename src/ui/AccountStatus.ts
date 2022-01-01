import { html, LitElement, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { DispatcherController } from "../stores/lit_controller";
import { IState } from "../stores/state";
import {
  action_notification_open,
  action_synchro_force,
  action_synchro_force_start,
  action_synchronization_activation_request,
  action_synchronization_deactivation_request,
} from "../actions/actions";

import "../icons/PersonOffIcon";
import "../icons/AccountCircleIcon";
import "./sync/SynchronizationStatus";

@customElement("account-status")
class AccountStatus extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
        top: 0.3em;
        right: 0.3em;
        padding: 0.5ex;
      }

      :host(:active) {
        background-color: var(--theme-surface);
        border-radius: 5px;
      }

      div {
        cursor: pointer;
      }

      .dot::after {
        font-family: "Open Sans", sans-serif;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        content: "●";
        font-size: 1.2em;
        color: var(--theme-error);
      }
    `,
  ];

  constructor() {
    super();
    const cb = (st: IState) => {
      this.enabled = st.synchronization?.enabled;
      this.valid = st.synchronization?.signInValid && !st.synchronization.error;
      this.syncInProgress = st.synchronization?.syncInProgress;
    };
    this.addController(new DispatcherController(cb.bind(this)));
  }

  @state()
  enabled = false;

  @state()
  valid: boolean | undefined = false;

  @state()
  syncInProgress: boolean | undefined = false;

  dispatchSynchroEvent(): void {
    if (!this.syncInProgress) {
      action_synchro_force_start()
        .then(action_synchro_force)
        .then(() => action_notification_open("Synchronisation completed"))
        .catch((reason) => {
          console.info(reason);
        });
    }
  }

  render(): unknown {
    if (this.enabled) {
      const className = classMap({ dot: !this.valid });
      const message = this.valid ? "" : "(not working)";
      return html` <div @click="${action_synchronization_deactivation_request}" class="${className}">
          <account-circle-icon title="Synchronization on ${message}"></account-circle-icon>
        </div>
        <synchronization-status
          .active="${this.syncInProgress}"
          @click="${this.dispatchSynchroEvent}"
        ></synchronization-status>`;
    }
    return html` <div @click="${action_synchronization_activation_request}">
      <person-off-icon title="Synchronization off"></person-off-icon>
    </div>`;
  }
}

export default AccountStatus;
