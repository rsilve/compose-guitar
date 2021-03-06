import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../icons";

import { localized, msg } from "@lit/localize";
import { actionHelpOpen } from "./actions";
import { galleryOpenKey } from "../gallery";
import { zoomDecrKey, zoomIncrKey } from "../zoom";
import { DispatcherController } from "../../lib/lit_controller";
import { IState } from "../../lib/state";
import { songEditKey } from "../song";
import { newSongKey, saveAsStartKey, songCopyKey, songPasteKey } from "../createAndSave";
import { closeModalKey } from "../modals";

@localized()
@customElement("compose-keys")
class ComposeKeys extends LitElement {
  private readonly _listener_handler: (e: KeyboardEvent) => void;

  constructor() {
    super();
    const cb = (st: IState) => {
      this._state = { ...st };
    };
    this.addController(new DispatcherController(cb.bind(this)));
    this._listener_handler = this._listener.bind(this);
  }

  @state()
  _state: IState | undefined;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("keydown", this._listener_handler);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("keydown", this._listener_handler);
  }

  _listener(e: KeyboardEvent): void {
    songEditKey(e, this._state);

    saveAsStartKey(e, this._state);

    galleryOpenKey(e, this._state);

    newSongKey(e, this._state);

    zoomIncrKey(e, this._state);

    zoomDecrKey(e, this._state);

    songCopyKey(e, this._state);

    songPasteKey(e, this._state);

    closeModalKey(e);
  }

  render(): unknown {
    const color = getComputedStyle(this).getPropertyValue("--theme-help");
    return html` <help-icon @click="${actionHelpOpen}" .fill="${color}" title="${msg("Shortcut help")}"></help-icon> `;
  }
}

export default ComposeKeys;
