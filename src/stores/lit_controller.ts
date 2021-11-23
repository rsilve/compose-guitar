import { ReactiveController } from "lit";
import { connect, disconnect, init } from "./dispatcher";
import { IState } from "../editor/stores/state";

export class DispatcherController implements ReactiveController {
  private readonly _dispatch_callback: (st: IState) => void;

  constructor(dispatch_callback: (st: IState) => void) {
    this._dispatch_callback = dispatch_callback;
  }

  hostConnected(): void {
    init(this._dispatch_callback);
    connect(this._dispatch_callback);
  }

  hostDisconnected(): void {
    disconnect(this._dispatch_callback);
  }
}
