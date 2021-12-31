import { dispatch } from "../stores/dispatcher";
import Action from "./Action";

export function publish_action(action: Action): Promise<void> {
  return dispatch(action).then(() => {
    console.info("action completed", action);
  });
}
