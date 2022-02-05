import { actionInitApp } from "./actions/actions";
import { connect, initialize_state } from "./stores/dispatcher";
import { save_last_state } from "./stores/register/gallery_tools";
import { default_state } from "./stores/state";

export default function init(): void {
  initialize_state(default_state());
  connect(save_last_state);
  actionInitApp().catch((reason) => console.info("initialization failed", reason));
}
