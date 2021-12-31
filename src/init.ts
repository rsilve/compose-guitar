import {
  action_init_app,
  action_notification_open,
  action_synchro_force,
  action_synchro_force_start,
} from "./actions/actions";
import { connect, initialize_state } from "./stores/dispatcher";
import { save_last_state } from "./stores/register/gallery_tools";
import { default_state } from "./stores/state";

export default function init(): void {
  initialize_state(default_state());
  connect(save_last_state);
  action_init_app()
    .then(action_synchro_force_start)
    .then(action_synchro_force)
    .then(() => action_notification_open("Synchronisation completed"))
    .catch(() => console.info("initialization failed"));
}
