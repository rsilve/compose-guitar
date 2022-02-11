import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../icons/help_icon";
import { IState } from "../stores/state";
import { DispatcherController } from "../stores/lit_controller";
import {
  actionGalleryOpen,
  actionHelpOpen,
  actionModalsClose,
  actionNotificationOpen,
  actionSaveAsStart,
  actionTrackCopy,
  actionTrackEdit,
  actionTrackNew,
  actionTrackPaste,
  actionZoomChange,
} from "../actions/actions";
import { localized, msg } from "@lit/localize";

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
    this.edit_key(e);

    this.save_as_start_key(e);

    this.gallery_open_key(e);

    this.track_new_key(e);

    this.zoom_incr_key(e);

    this.zoom_decr_key(e);

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
      actionTrackPaste().then(() => actionNotificationOpen("Pasted"));
    }
  }

  private copy_key(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "c" && this._state) {
      const { track: { title, grid_text } = {} } = this._state;
      actionTrackCopy({ title, grid_text }).then(() => actionNotificationOpen("Song copied"));
    }
  }

  private zoom_decr_key(e: KeyboardEvent) {
    if (e.altKey && (e.key === "—" || e.key === "-") && this._state) {
      actionZoomChange(this._state.zoom - 10);
    }
  }

  private zoom_incr_key(e: KeyboardEvent) {
    if (e.altKey && (e.key === "≠" || e.key === "+") && this._state) {
      actionZoomChange(this._state.zoom + 10);
    }
  }

  private track_new_key(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "n" && this._state) {
      actionTrackNew();
    }
  }

  private gallery_open_key(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "l" && this._state) {
      actionGalleryOpen();
      e.preventDefault();
    }
  }

  private save_as_start_key(e: KeyboardEvent) {
    if (!e.altKey && e.ctrlKey && e.key === "s" && this._state) {
      actionSaveAsStart().then(() => actionNotificationOpen("Save completed"));
      e.preventDefault();
    }
  }

  private edit_key(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "e" && this._state) {
      const { track = {} } = this._state;
      actionTrackEdit(track).catch((reason) => console.warn(reason));
    }
  }

  render(): unknown {
    const color = getComputedStyle(this).getPropertyValue("--theme-help");
    return html` <help-icon @click="${actionHelpOpen}" .fill="${color}" title="${msg("Shortcut help")}"></help-icon> `;
  }
}

export default ComposeKeys;
