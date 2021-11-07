import {html, LitElement} from 'lit';
import {customElement, state} from "lit/decorators.js";

import '../../icons/help_icon'
import {IState} from "../stores/state";
import {DispatcherController} from "../../stores/lit_controller";
import {
    action_gallery_open, action_help_open, action_modals_close,
    action_save_as_start,
    action_track_copy,
    action_track_edit, action_track_new, action_track_paste,
    action_zoom_change
} from "../actions/actions";


@customElement('compose-keys')
class ComposeKeys extends LitElement {

    constructor() {
        super()
        const cb = (st: IState) => {
            this._state = {...st}
        }
        this.addController(new DispatcherController(cb.bind(this)));
    }

    @state()
    _state: IState | undefined

    connectedCallback(): void {
        super.connectedCallback()
        document.addEventListener("keydown", (e) => {
            this.edit_key(e);

            this.save_as_start_key(e);

            this.gallery_open_key(e);

            this.track_new_key(e);

            this.zoom_incr_key(e);

            this.zoom_decr_key(e);

            this.cpoy_key(e);

            this.paste_key(e);

            this.close_modal_key(e);
        })
    }

    private close_modal_key(e: KeyboardEvent) {
        if (e.key === "Escape") {
            action_modals_close();
            e.preventDefault()
        }
    }

    private paste_key(e: KeyboardEvent) {
        if (e.ctrlKey && e.key === "v" && this._state) {
            action_track_paste()
        }
    }

    private cpoy_key(e: KeyboardEvent) {
        if (e.ctrlKey && e.key === "c" && this._state) {
            const {track: {title, grid_text} = {}} = this._state
            action_track_copy({title, grid_text})
        }
    }

    private zoom_decr_key(e: KeyboardEvent) {
        if (e.altKey && (e.key === "—" || e.key === "-") && this._state) {
            action_zoom_change(this._state.zoom - 10)
        }
    }

    private zoom_incr_key(e: KeyboardEvent) {
        if (e.altKey && (e.key === "≠" || e.key === "+") && this._state) {
            action_zoom_change(this._state.zoom + 10)
        }
    }

    private track_new_key(e: KeyboardEvent) {
        if (e.ctrlKey && e.key === "n" && this._state) {
            action_track_new()
        }
    }

    private gallery_open_key(e: KeyboardEvent) {
        if (e.ctrlKey && e.key === "l" && this._state) {
            action_gallery_open()
            e.preventDefault()
        }
    }

    private save_as_start_key(e: KeyboardEvent) {
        if (e.ctrlKey && e.key === "s" && this._state) {
            action_save_as_start()
            e.preventDefault()
        }
    }

    private edit_key(e: KeyboardEvent) {
        if (e.ctrlKey && e.key === "e" && this._state) {
            const {track = {}} = this._state
            action_track_edit(track)
        }
    }

    render(): unknown {
        return html`
            <help-icon @click="${action_help_open}" title="Shortcut help"></help-icon>
        `
    }

}

export default ComposeKeys
