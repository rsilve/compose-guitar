export default class Action {
  readonly actionType: string;

  readonly payload: unknown;

  constructor(actionType: string, payload: unknown = null) {
    this.actionType = actionType;
    this.payload = payload;
  }
}
