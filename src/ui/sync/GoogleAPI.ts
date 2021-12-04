import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { IState } from "../../stores/state";
import { DispatcherController } from "../../stores/lit_controller";
import { action_synchro_sign_in } from "../../actions/actions";

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

  script() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.crossOrigin = "anonymous";
    script.onload = action_synchro_sign_in;
    return script;
  }
}

export default GoogleAPI;