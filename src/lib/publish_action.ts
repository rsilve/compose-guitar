import { dispatch } from "../lib/dispatcher";
import Action from "./Action";

export function publishAction(action: Action): Promise<void> {
  return dispatch(action).then(() => {
    console.info("action completed", action);
  });
}
