import {html, LitElement, css} from 'lit';
import {customElement} from "lit/decorators.js";


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

    render(): unknown {
        return html`
            <div>sync</div>
            `
    }

}

export default SynchronizeNotification
