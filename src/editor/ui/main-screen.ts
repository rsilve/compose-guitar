import {html, LitElement} from 'lit';
import {customElement, state} from "lit/decorators.js";

import './screen/app-on-boarding'
import './screen/app-main-preview'
import {DispatcherController} from "../../stores/lit_controller";
import {IState} from "../stores/state";

@customElement('main-screen')
class MainScreen extends LitElement {

    @state()
    protected _on_boarding_enabled = false

    @state()
    protected _title: string | undefined;

    @state()
    protected _grid_text: string | undefined;

    @state()
    protected _zoom = 100;

    @state()
    protected _transpose = 0;

    constructor() {
        super();
        this.addController(new DispatcherController(this.store_callback.bind(this)))
    }

    render(): unknown {
        if (this._on_boarding_enabled) {
            return html`
                <app-on-boarding></app-on-boarding>`
        } else {
            return html`
                <app-main-preview
                        zoom="${this._zoom}"
                        song_title="${this._title}"
                        song_grid="${this._grid_text}"
                        transpose="${this._transpose}"></app-main-preview>`
        }
    }

    store_callback(state: IState): void {
        this._on_boarding_enabled = !state.track
        this._title = state.track?.title
        this._grid_text = state.track?.grid_text
        this._zoom = state.zoom
        this._transpose = state.transpose
    }

}

export default MainScreen
