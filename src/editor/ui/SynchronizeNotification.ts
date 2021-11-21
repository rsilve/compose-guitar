import {html, LitElement, css} from 'lit';
import {customElement, state} from "lit/decorators.js";
import {DispatcherController} from "../../stores/lit_controller";
import {IState} from "../stores/state";


@customElement('synchronize-notification')
class SynchronizeNotification extends LitElement {

    static styles = [
        css`
        :host {
            position: absolute;
            bottom: 0;
            left: 25em;
            padding: 0 0 .5ex .5ex;
            align-items: center;
            height: 1.6em;
        }
        `
    ]

    constructor() {
        super();
        const cb = (st: IState) => {
            this._enabled = st.synchronization?.enabled
        }
        this.addController(new DispatcherController(cb.bind(this)))
    }

    @state()
    _enabled = false

    render(): unknown {
        if (this._enabled) {
            return html`<div>sync active</div>`
        } else {
            return html`<div>sync inactive</div>`
        }
    }

}

export default SynchronizeNotification
