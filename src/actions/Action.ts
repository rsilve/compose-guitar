export default class Action {
  readonly action_type: string;

  readonly payload: unknown;

  constructor(action_type: string, payload: unknown = null) {
    this.action_type = action_type;
    this.payload = payload;
  }
}
