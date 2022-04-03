import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./menu-item";
import "../../components/icons";
import { IState } from "../../stores/state";
import { saveNeeded } from "../../tools/state_tools";
import { DispatcherController } from "../../stores/lit_controller";
import { actionNotificationOpen, actionSaveAsStart } from "../../actions/actions";
import { localized, msg } from "@lit/localize";
import { NotificationMessageEnum } from "../NotificationMessageEnum";
import { actionGalleryOpen } from "../../components/gallery/actions";
import { actionTrackNew } from "../../components/createAndSave/actions";

@localized()
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
    actionSaveAsStart().then(() => actionNotificationOpen(NotificationMessageEnum.SAVE_COMPLETED));
  }

  render(): unknown {
    return html`
      <menu-item
        title="${msg("save the track")} - Ctrl+s"
        class="_save"
        .dotted="${this.needSave}"
        @click="${this.handleSave}"
        ontouchstart=""
      >
        <save-icon></save-icon>
      </menu-item>
      <menu-item
        title="${msg("Open the Library")} - Ctrl+l"
        class="_library"
        @click="${actionGalleryOpen}"
        ontouchstart=""
      >
        <gallery-icon></gallery-icon>
      </menu-item>
      <menu-item title="${msg("new track")} - Ctrl+n" class="_new" @click="${actionTrackNew}" ontouchstart="">
        <new-track-icon></new-track-icon>
      </menu-item>
    `;
  }
}

export default Menu;
