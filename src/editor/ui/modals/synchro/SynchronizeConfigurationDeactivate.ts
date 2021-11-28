import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import {buttonStyles} from "../../styles/button";
import {IStateSynchronisation} from "../../../stores/state";

@customElement("synchronize-configuration-deactivate")
class SynchronizeConfigurationDeactivate extends LitElement {
  static styles = [
    buttonStyles,
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

  private _dispatch_activate() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("activate", options));
  }

  render(): unknown {
    let cta = html`<button class="btn-secondary btn-activate _activate" @click="${this._dispatch_activate}">
      activate
    </button>`;
    if (this.synchronisation?.inProgress) {
      cta = html`<div class="btn-activate">Please wait during authentication...</div>`;
    }
    return html`<div>
      The synchronization between devices is not activated. 
      ${cta}
    </div>`;
  }
}

export default SynchronizeConfigurationDeactivate;
