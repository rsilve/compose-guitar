import { html, LitElement, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { DispatcherController } from "../../stores/lit_controller";
import { IState } from "../stores/state";
import {
  action_synchronization_activation_request,
  action_synchronization_deactivation_request,
} from "../actions/actions";

import '../../icons/PersonOffIcon'
import '../../icons/AccountCircleIcon'

@customElement("account-status")
class AccountStatus extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
        top: 0.25em;
        right: .25em;
      }
      :active {
        transform: scale(1.2) translateX(-1ex);
        background-color: var(--color-background-secondary);
        border-radius: 5px;
      }
      div {
        cursor: pointer;
      }
    `,
  ];

  constructor() {
    super();
    const cb = (st: IState) => {
      this._enabled = st.synchronization?.enabled;
    };
    this.addController(new DispatcherController(cb.bind(this)));
  }

  @state()
  _enabled = false;

  render(): unknown {
    if (this._enabled) {
      return html`<div @click="${action_synchronization_deactivation_request}"><account-circle-icon></account-circle-icon></div>`;
    }
    return html`<div @click="${action_synchronization_activation_request}"><person-off-icon></person-off-icon></div>`;
  }
}

export default AccountStatus;
