import {css, html, LitElement} from 'lit';
import {customElement, state} from "lit/decorators.js";
import './TrackGallery'
import './GridEditor';
import './HelpModal'
import './ConfirmSave'
import {DispatcherController} from "../../../stores/lit_controller";
import {
    action_gallery_close,
    action_gallery_remove,
    action_help_close, action_save_as_start_and_new, action_track_new_cancel, action_track_new_without_save,
    action_upload_from_gallery
} from "../../actions/actions";
import {gallery_dict} from "../../stores/register/gallery_tools";
import {IState} from "../../stores/state";

@customElement('compose-modals')
class Modals extends LitElement {

    static styles = css` 
        .modal {
            display: block;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            
            padding: 1em;
            background-color: var(--color-background-secondary);
            border: 1px solid var(--color-headline);
            border-radius: var(--border-radius);
            
            font-size: .7em;
        }
        
        .overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(255,255,255, 0.9);
        }
        
        .hide {
            display: none !important;
        }
    `
    @state()
    _gallery_activated = false

    @state()
    _editor_enabled = false

    @state()
    _help_open = false
    @state()
    _confirm_save_enabled = false


    constructor() {
        super();
        const cb = (st: IState) => {
            this._gallery_activated = st.gallery as boolean || false
            this._editor_enabled = st.editor !== undefined
            this._help_open = !!st.help_open
            this._confirm_save_enabled = !!st.confirm_save
        }
        this.addController(new DispatcherController(cb.bind(this)))
    }

    private _dispatch_library_select(e: CustomEvent): void {
        action_upload_from_gallery(e.detail.id)
    }

    private _dispatch_library_remove(e: CustomEvent): void {
        action_gallery_remove(e.detail.id)
    }

    render(): unknown {
        const overlay = html`
            <div class="overlay"></div>`

        if (this._gallery_activated) {
            return html`${overlay}
            <track-gallery
                    class="modal"
                    .list="${gallery_dict()}"
                    @select="${this._dispatch_library_select}"
                    @remove="${this._dispatch_library_remove}"
                    @close="${action_gallery_close}"
            ></track-gallery>`
        }
        if (this._editor_enabled) {
            return html`${overlay}
            <grid-editor class="modal"></grid-editor>`
        }
        if (this._help_open) {
            return html`${overlay}
            <help-modal class="modal"
                        @close="${action_help_close}"></help-modal>`
        }
        if (this._confirm_save_enabled) {
            return html`${overlay}
            <confirm-save
                    class="modal"
                    @cancel="${action_track_new_cancel}"
                    @continue="${action_track_new_without_save}"
                    @save="${action_save_as_start_and_new}"
            ></confirm-save>`
        }
        return html``
    }


}

export default Modals
