import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./menu-item";
import "../../icons/save_icon";
import "../../icons/new_track_icon";
import "../../icons/gallery_icon";
import { IState } from "../../stores/state";
import { saveNeeded } from "../../tools/state_tools";
import { DispatcherController } from "../../stores/lit_controller";
import { actionGalleryOpen, actionNotificationOpen, actionSaveAsStart, actionTrackNew } from "../../actions/actions";

@customElement("compose-menu")
class Menu extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    menu-item + menu-item {
      padding-top: 0.2em;
    }
  `;

  constructor() {
    super();
    const cb = ({ track }: IState): void => {
      this.needSave = saveNeeded(track);
    };
    this.addController(new DispatcherController(cb.bind(this)));
  }

  @state()
  private needSave = false;

  private handleSave(): void {
    actionSaveAsStart().then(() => actionNotificationOpen("Save completed"));
  }

  render(): unknown {
    return html`
      <menu-item title="save the track - Ctrl+s" class="_save" .dotted="${this.needSave}" @click="${this.handleSave}">
        <save-icon></save-icon>
      </menu-item>
      <menu-item title="Open the Library - Ctrl+l" class="_library" @click="${actionGalleryOpen}">
        <gallery-icon></gallery-icon>
      </menu-item>
      <menu-item title="new track - Ctrl+n" class="_new" @click="${actionTrackNew}">
        <new-track-icon></new-track-icon>
      </menu-item>
    `;
  }
}

export default Menu;
