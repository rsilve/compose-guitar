import {css, html, LitElement} from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles } from "../styles/button";
import { modalStyles } from "../styles/modals";
import { IStateSynchronisation } from "../../stores/state";

@customElement("synchronize-configuration")
class SynchronizeConfiguration extends LitElement {
  static styles = [
    buttonStyles,
    modalStyles,
    css`
      .btn-activate {
        display: block;
        width: 100%;
        margin: 2em 0;
      }
    `,
  ];

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
    let body = this.renderActivatePanel();
    if (this.synchronisation?.enabled &&  !this.synchronisation?.inProgress) {
      body = this.renderDeactivatePanel();
    }
    return html`
      <h1>Synchronization</h1>
      ${body}
      <div class="modal-footer">
        <button tabindex="-1" class="btn-primary _close" @click="${this._dispatch_close}">Close</button>
      </div>
    `;
  }

  private renderDeactivatePanel() {
    let errorStatus = html``;
    let signInStatus = html`<div>not connected</div>`;
    if (this.synchronisation?.signInValid || this.synchronisation?.inProgress) {
      signInStatus = html``;
    }

    if (this.synchronisation?.error) {
      const error = this.synchronisation?.error as { error: string };
      errorStatus = html`<div>${error.error}</div>`;
    }
    return html`
      <div>
        Do you want to deactivate synchronization ?
        <button class="btn-secondary _deactivate" @click="${this._dispatch_deactivate}">deactivate</button>
      </div>
      ${signInStatus} ${errorStatus}
    `;
  }

  private renderActivatePanel() {
    let cta = html`<button class="btn-secondary btn-activate _activate" @click="${this._dispatch_activate}">activate</button>`
    if (this.synchronisation?.inProgress) {
      cta = html`<div class="btn-activate">Please wait during authentication...</div>`
    }
    return html` <div>
      The synchronization between devices is not activated.
      ${cta}
    </div>`;
  }
}

export default SynchronizeConfiguration;
