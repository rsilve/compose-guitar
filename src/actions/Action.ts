import { dispatch } from "../stores/dispatcher";

export class Action {
  readonly action_type: string;

  readonly payload: unknown;

  constructor(action_type: string, payload: unknown = null) {
    this.action_type = action_type;
    this.payload = payload;
  }
}

export function publish_action(action: Action): Promise<void> {
  return dispatch(action).then(() => {
    console.log("action completed", action);
  });
}
