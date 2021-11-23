import { connect, initialize_state } from '../stores/dispatcher';
import { save_last_state } from './stores/register/gallery_tools';
import { action_init_app } from './actions/actions';
import { default_state } from './stores/state';

export default function init(): void {
  initialize_state(default_state());
  connect(save_last_state);
  action_init_app();
}
