import {ReactiveController, ReactiveControllerHost} from 'lit';
import {connect, disconnect, init} from "./dispatcher";

export class DispatcherController implements ReactiveController {
    host: ReactiveControllerHost;

    private readonly _dispatch_callback: (st: any) => void;

    constructor(host: ReactiveControllerHost, dispatch_callback: (st: any) => void) {
        (this.host = host).addController(this);
        this._dispatch_callback = dispatch_callback
    }

    hostConnected(): void {
        init(this._dispatch_callback)
        connect(this._dispatch_callback)
    }

    hostDisconnected(): void {
        disconnect(this._dispatch_callback)
    }

}
