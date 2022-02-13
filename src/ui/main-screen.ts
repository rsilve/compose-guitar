import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

import "./screen/app-on-boarding";
import "./screen/app-main-preview";
import { DispatcherController } from "../stores/lit_controller";
import { IState } from "../stores/state";

@customElement("main-screen")
class MainScreen extends LitElement {
  @state()
  protected _on_boarding_enabled = false;

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
    this.addController(new DispatcherController(this.store_callback.bind(this)));
  }

  render(): unknown {
    if (this._on_boarding_enabled) {
      return html` <app-on-boarding></app-on-boarding>`;
    }
    return html` <app-main-preview
      zoom="${this._zoom}"
      songTitle="${this._title}"
      songGrid="${this._grid_text}"
      transpose="${this._transpose}"
    ></app-main-preview>`;
  }

  store_callback(st: IState): void {
    this._on_boarding_enabled = !st.track;
    this._title = st.track?.title;
    this._grid_text = st.track?.grid_text;
    this._zoom = st.zoom;
    this._transpose = st.transpose;
  }
}

export default MainScreen;
