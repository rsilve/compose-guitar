import {html, LitElement} from 'lit';
import {customElement} from "lit/decorators.js";
import {modalStyles} from "../styles/modals";
import {buttonStyles} from "../styles/button";

@customElement('confirm-save')
class ConfirmSave extends LitElement {

    static styles = [
        modalStyles,
        buttonStyles,
    ]

    private _dispatch_cancel() {
        const options = {
            bubbles: true,
            composed: true
        };
        this.dispatchEvent(new CustomEvent('cancel', options));
    }

    private _dispatch_continue() {
        const options = {
            bubbles: true,
            composed: true
        };
        this.dispatchEvent(new CustomEvent('continue', options));
    }

    private _dispatch_save() {
        const options = {
            bubbles: true,
            composed: true
        };
        this.dispatchEvent(new CustomEvent('save', options));
    }

    render(): unknown {
        return html`
            <p>Some changes have not been recorded. Do you want to continue anyway?</p>
            <div class="modal-footer">
                <button tabindex="-1" class="btn-secondary _cancel" @click="${this._dispatch_cancel}">Cancel</button>
                <button tabindex="-1" class="btn-secondary _continue" @click="${this._dispatch_continue}">Continue</button>
                <button class="_save" @click="${this._dispatch_save}">Save and continue</button>
            </div>
        `;
    }

}

export default ConfirmSave
