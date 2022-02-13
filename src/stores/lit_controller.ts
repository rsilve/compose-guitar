import { ReactiveController } from "lit";
import { connect, disconnect, init } from "./dispatcher";
import { IState } from "./state";

export class DispatcherController implements ReactiveController {
  private readonly dispatchCallback: (st: IState) => void;

  constructor(dispatchCallback: (st: IState) => void) {
    this.dispatchCallback = dispatchCallback;
  }

  hostConnected(): void {
    init(this.dispatchCallback);
    connect(this.dispatchCallback);
  }

  hostDisconnected(): void {
    disconnect(this.dispatchCallback);
  }
}
