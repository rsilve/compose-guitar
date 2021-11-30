import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

import "../icons/help_icon";
import { IState } from "../stores/state";
import { DispatcherController } from "../stores/lit_controller";
import {
  action_gallery_open,
  action_help_open,
  action_modals_close,
  action_notification_open,
  action_save_as_start,
  action_track_copy,
  action_track_edit,
  action_track_new,
  action_track_paste,
  action_zoom_change,
} from "../actions/actions";

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
      action_modals_close();
      e.preventDefault();
    }
  }

  private paste_key(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "v" && this._state) {
      action_track_paste().then(() => action_notification_open("Pasted"));
    }
  }

  private copy_key(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "c" && this._state) {
      const { track: { title, grid_text } = {} } = this._state;
      action_track_copy({ title, grid_text }).then(() => action_notification_open("Song copied"));
    }
  }

  private zoom_decr_key(e: KeyboardEvent) {
    if (e.altKey && (e.key === "—" || e.key === "-") && this._state) {
      action_zoom_change(this._state.zoom - 10);
    }
  }

  private zoom_incr_key(e: KeyboardEvent) {
    if (e.altKey && (e.key === "≠" || e.key === "+") && this._state) {
      action_zoom_change(this._state.zoom + 10);
    }
  }

  private track_new_key(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "n" && this._state) {
      action_track_new();
    }
  }

  private gallery_open_key(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "l" && this._state) {
      action_gallery_open();
      e.preventDefault();
    }
  }

  private save_as_start_key(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "s" && this._state) {
      action_save_as_start().then(() => action_notification_open("Save completed"));
      e.preventDefault();
    }
  }

  private edit_key(e: KeyboardEvent) {
    if (e.ctrlKey && e.key === "e" && this._state) {
      const { track = {} } = this._state;
      action_track_edit(track).catch((reason) => console.warn(reason));
    }
  }

  render(): unknown {
    return html` <help-icon @click="${action_help_open}" title="Shortcut help"></help-icon> `;
  }
}

export default ComposeKeys;
