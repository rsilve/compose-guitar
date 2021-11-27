import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles } from "../styles/button";
import { modalStyles } from "../styles/modals";
import { IStateSynchronisation } from "../../stores/state";

@customElement("synchronize-configuration")
class SynchronizeConfiguration extends LitElement {
  static styles = [buttonStyles, modalStyles];

  @property()
  synchronisation: IStateSynchronisation | undefined;

  private _dispatch_close() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("close", options));
  }

  private _dispatch_activate() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("activate", options));
  }

  private _dispatch_deactivate() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("deactivate", options));
  }

  render(): unknown {
    let body = html` <div>
      Do you want to activate synchronization ?
      <button class="_activate" @click="${this._dispatch_activate}">activate</button>
    </div>`;
    if (this.synchronisation?.enabled) {
      let signInStatus = html`<div>not connected</div>`;
      if (this.synchronisation?.signInValid) {
        signInStatus = html``;
      }
      body = html`
        <div>
          Do you want to deactivate synchronization ?
          <button class="_deactivate" @click="${this._dispatch_deactivate}">deactivate</button>
        </div>
        ${signInStatus}
      `;
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
