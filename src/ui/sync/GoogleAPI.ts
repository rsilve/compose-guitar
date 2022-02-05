import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { IState } from "../../stores/state";
import { DispatcherController } from "../../stores/lit_controller";
import {
  actionNotificationOpen,
  action_synchro_force,
  action_synchro_force_start,
  action_synchro_sign_in,
} from "../../actions/actions";

@customElement("google-api")
class GoogleAPI extends LitElement {
  constructor() {
    super();
    const cb = (st: IState) => {
      this.enabled = st.synchronization.enabled;
    };
    this.addController(new DispatcherController(cb.bind(this)));
  }

  @state()
  enabled = false;

  render(): unknown {
    if (this.enabled) {
      return html`${this.script()} `;
    }
    return html``;
  }

  dispatchSignIn(): void {
    action_synchro_sign_in()
      .then(action_synchro_force_start)
      .then(action_synchro_force)
      .then(() => actionNotificationOpen("Synchronisation completed"));
  }

  script() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.crossOrigin = "anonymous";
    script.onload = this.dispatchSignIn;
    return script;
  }
}

export default GoogleAPI;
