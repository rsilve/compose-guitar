import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { localized, msg } from "@lit/localize";
import { IStateSynchronization } from "../../stores/state";
import { buttonStyles } from "../styles";
import { actionSynchronizationActivation } from "./actions";

@localized()
@customElement("synchronization-configuration-deactivated")
class SynchronizationConfigurationDeactivated extends LitElement {
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
  synchronization: IStateSynchronization | undefined;

  render(): unknown {
    let cta = html`<button class="btn-secondary btn-activate _activate" @click="${actionSynchronizationActivation}">
      ${msg("activate")}
    </button>`;
    if (this.synchronization?.signInProgress) {
      cta = html`<div class="btn-activate">${msg("Please wait during authentication...")}</div>`;
    }
    return html`<div>${msg("The synchronization between devices is not activated.")} ${cta}</div>`;
  }
}

export default SynchronizationConfigurationDeactivated;
