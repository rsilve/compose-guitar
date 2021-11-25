import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { IState } from "../../stores/state";
import { DispatcherController } from "../../../stores/lit_controller";
import {action_synchronization_activation, action_synchronization_deactivation} from "../../actions/actions";

@customElement("synchronize-configuration")
class SynchronizeConfiguration extends LitElement {
  @state()
  _enabled = false;

  constructor() {
    super();
    const cb = (st: IState) => {
      this._enabled = st.synchronization.enabled;
    };
    this.addController(new DispatcherController(cb.bind(this)));
  }

  private _dispatch_close() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("close", options));
  }

  render(): unknown {
    let body = html`<div>Do you want to activate synchronization ? 
      <button class="_activate" @click="${action_synchronization_activation}">activate</button></div>`;
    if (this._enabled) {
      body = html`<div>Do you want to deactivate synchronization ?
        <button class="_deactivate" @click="${action_synchronization_deactivation}">deactivate</button></div>`;
    }
    return html`
      ${body}
      <div class="modal-footer">
        <button tabindex="-1" class="btn-primary _close" @click="${this._dispatch_close}">Close</button>
      </div>
    `;
  }
}

export default SynchronizeConfiguration;
