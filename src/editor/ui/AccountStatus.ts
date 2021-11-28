import {html, LitElement, css} from "lit";
import {customElement, state} from "lit/decorators.js";
import {DispatcherController} from "../../stores/lit_controller";
import {IState} from "../stores/state";
import {
    action_synchronization_activation_request,
    action_synchronization_deactivation_request,
} from "../actions/actions";
import {classMap} from "lit/directives/class-map.js";

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
      
      .dot::after {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        content: "●";
        font-size: 1.2em;
        color: var(--color-error);
      }
    `,
    ];

    constructor() {
        super();
        const cb = (st: IState) => {
            this.enabled = st.synchronization?.enabled;
            this.valid = st.synchronization?.signInValid && !st.synchronization.error;
        };
        this.addController(new DispatcherController(cb.bind(this)));
    }

    @state()
    enabled = false;

    @state()
    valid: boolean | undefined = false;

    render(): unknown {
        if (this.enabled) {
            const className = classMap({dot: !this.valid})
            const message = this.valid ? '' : '(not working)'
            return html`
                <div @click="${action_synchronization_deactivation_request}" class="${className}">
                    <account-circle-icon title="Synchronization on ${message}"></account-circle-icon>
                </div>`;
        }
        return html`
            <div @click="${action_synchronization_activation_request}">
                <person-off-icon title="Synchronization off"></person-off-icon>
            </div>`;
    }
}

export default AccountStatus;
