import {ReactiveController} from 'lit';
import {connect, disconnect, init} from "./dispatcher";

export class DispatcherController implements ReactiveController {

    private readonly _dispatch_callback: (st: any) => void;

    constructor(dispatch_callback: (st: any) => void) {
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
