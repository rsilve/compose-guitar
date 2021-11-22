import {html, LitElement} from 'lit';
import {customElement} from "lit/decorators.js";


@customElement('synchronize-configuration')
class SynchronizeConfiguration extends LitElement {

    private _dispatch_close() {
        const options = {
            bubbles: true,
            composed: true
        };
        this.dispatchEvent(new CustomEvent('close', options));
    }


    render(): unknown {
        return html`
            <div class="modal-footer">
                <button tabindex="-1" class="btn-primary _close" @click="${this._dispatch_close}">Close</button>
            </div>
        `
    }

}

export default SynchronizeConfiguration
