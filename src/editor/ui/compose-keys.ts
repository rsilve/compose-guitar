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
        new DispatcherController(this, cb.bind(this));
    }

    @state()
    _state: IState | undefined

    connectedCallback(): void {
        super.connectedCallback()
        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key === "e" && this._state) {
                const {track = {}} = this._state
                action_track_edit(track)
            }

            if (e.ctrlKey && e.key === "s" && this._state) {
                action_save_as_start()
                e.preventDefault()
            }

            if (e.ctrlKey && e.key === "l" && this._state) {
                action_gallery_open()
                e.preventDefault()
            }

            if (e.ctrlKey && e.key === "n" && this._state) {
                action_track_new()
            }

            if (e.altKey && (e.key === "≠" || e.key === "+") && this._state) {
                action_zoom_change(this._state.zoom + 10)
            }

            if (e.altKey && (e.key === "—" || e.key === "-") && this._state) {
                action_zoom_change(this._state.zoom - 10)
            }

            if (e.ctrlKey && e.key === "c" && this._state) {
                const {track: {title, grid_text} = {}} = this._state
                action_track_copy({title, grid_text})
            }

            if (e.ctrlKey && e.key === "v" && this._state) {
                action_track_paste()
            }

            if (e.key === "Escape") {
                action_modals_close();
                e.preventDefault()
            }
        })
    }

    render(): unknown {
        return html`
            <help-icon @click="${action_help_open}" title="Shortcut help"></help-icon>
        `
    }

}

export default ComposeKeys
