import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../icons";

import { localized, msg } from "@lit/localize";
import { actionHelpOpen } from "./actions";
import { galleryOpenKey } from "../gallery";
import { zoomDecrKey, zoomIncrKey } from "../zoom";
import {
  actionModalsClose,
  actionNotificationOpen,
  actionSaveAsStart,
  actionTrackCopy,
  actionTrackPaste,
} from "../../actions/actions";
import { NotificationMessageEnum } from "../../ui/NotificationMessageEnum";
import { DispatcherController } from "../../stores/lit_controller";
import { IState } from "../../stores/state";
import { songEditKey } from "../song";
import { newSongKey } from "../createAndSave";

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

    this.save_as_start_key(e);

    galleryOpenKey(e, this._state);

    newSongKey(e, this._state);

    zoomIncrKey(e, this._state);

    zoomDecrKey(e, this._state);

    this.copy_key(e);

    this.paste_key(e);

    ComposeKeys.close_modal_key(e);
  }

  private static close_modal_key(e: KeyboardEvent) {
    if (e.key === "Escape") {
      actionModalsClose();
      e.preventDefault();
    }
  }

  private paste_key(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "v" && this._state) {
      actionTrackPaste().then(() => actionNotificationOpen(NotificationMessageEnum.NOTIFICATION_MESSAGE_PASTED));
    }
  }

  private copy_key(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "c" && this._state) {
      const { track: { title, grid_text } = {} } = this._state;
      actionTrackCopy({ title, grid_text }).then(() =>
        actionNotificationOpen(NotificationMessageEnum.NOTIFICATION_MESSAGE_SONG_COMPLETED)
      );
    }
  }

  private save_as_start_key(e: KeyboardEvent) {
    if (!e.altKey && e.ctrlKey && e.key === "s" && this._state) {
      actionSaveAsStart().then(() => actionNotificationOpen(NotificationMessageEnum.SAVE_COMPLETED));
      e.preventDefault();
    }
  }

  render(): unknown {
    const color = getComputedStyle(this).getPropertyValue("--theme-help");
    return html` <help-icon @click="${actionHelpOpen}" .fill="${color}" title="${msg("Shortcut help")}"></help-icon> `;
  }
}

export default ComposeKeys;
