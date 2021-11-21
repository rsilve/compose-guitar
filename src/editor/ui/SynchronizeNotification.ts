import {html, LitElement} from 'lit';
import {customElement} from "lit/decorators.js";


@customElement('synchronize-notification')
class SynchronizeNotification extends LitElement {

    render(): unknown {
        return html`
            <div>sync</div>
            `
    }

}

export default SynchronizeNotification
