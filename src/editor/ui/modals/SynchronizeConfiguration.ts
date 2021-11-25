import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { action_synchronization_activation, action_synchronization_deactivation } from "../../actions/actions";
import { buttonStyles } from "../styles/button";
import { modalStyles } from "../styles/modals";

@customElement("synchronize-configuration")
class SynchronizeConfiguration extends LitElement {
  static styles = [buttonStyles, modalStyles];

  @property()
  enabled = false;

  private _dispatch_close() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("close", options));
  }

  render(): unknown {
    let body = html` <div>
      Do you want to activate synchronization ?
      <button class="_activate" @click="${action_synchronization_activation}">activate</button>
    </div>`;
    if (this.enabled) {
      body = html` <div>
        Do you want to deactivate synchronization ?
        <button class="_deactivate" @click="${action_synchronization_deactivation}">deactivate</button>
      </div>`;
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
