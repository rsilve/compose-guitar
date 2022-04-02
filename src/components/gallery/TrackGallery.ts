import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { localized, msg } from "@lit/localize";
import "../../icons/delete_icon";
import { IGalleryTrack } from "../../stores/state";
import { buttonStyles, modalStyles } from "../styles";
import { actionGalleryClose, actionGalleryRemove, actionUploadFromGallery } from "./actions";
import { actionNotificationOpen } from "../../actions/actions";
import { NotificationMessageEnum } from "../../ui/NotificationMessageEnum";
import { storage } from "../../stores/register/gallery_tools";

@localized()
@customElement("track-gallery")
class TrackGallery extends LitElement {
  static styles = [
    modalStyles,
    buttonStyles,
    css`
      h1 {
        margin-bottom: 0;
        padding: 0 6px;
      }

      .help {
        font-size: 0.7em;
        margin: 0 0 1em 0;
        padding: 0 6px;
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      ul > li {
        min-width: 30em;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        line-height: 1.8em;
        padding: 0 0 0 6px;
        cursor: pointer;
        border-radius: var(--border-radius);
      }

      li:active,
      li:hover {
        color: var(--theme-secondary);
        background-color: var(--theme-secondary-lighter);
      }

      li > span {
        flex-grow: 1;
      }

      .gallery_trash {
        font-size: 1em;
        padding: 0 6px;
      }

      .gallery_trash_confirm {
        color: var(--theme-on-surface);
        background-color: var(--theme-warning);
        padding: 0 6px;
        border-radius: var(--border-radius);
      }

      .cloud {
        padding-left: 1ex;
        font-size: 1.1em;
        color: var(--theme-secondary);
      }
    `,
  ];

  private confirmTimeout: NodeJS.Timeout | undefined;

  @state()
  private confirm: string | undefined;

  @state()
  list: Record<string, IGalleryTrack> = storage.galleryDictExtended();

  @property({ attribute: false })
  remove_handler: (id: string) => void = () => {
    /* do nothing by default */
  };

  generateHandlerSelect(id: string) {
    return (): void => {
      this.clearEventualTimeout();
      actionUploadFromGallery(id).then(() => actionNotificationOpen(NotificationMessageEnum.TRACK_LOADED));
    };
  }

  generateHandlerRemove(id: string) {
    return (): void => {
      this.clearEventualTimeout();
      actionGalleryRemove(id).then(() => (this.list = storage.galleryDictExtended()));
    };
  }

  private clearEventualTimeout(): void {
    if (this.confirmTimeout) {
      clearTimeout(this.confirmTimeout);
    }
  }

  generateHandlerConfirm(id: string) {
    return (): void => {
      this.confirm = id;
      this.clearEventualTimeout();
      this.confirmTimeout = setTimeout(() => (this.confirm = undefined), 3000);
    };
  }

  render(): unknown {
    const itemTemplates = this.renderList();
    return html`
      <h1>${msg("Songs gallery")}</h1>
      <p class="help">${msg("Click on a track to load it")}</p>
      <ul>
        ${itemTemplates}
      </ul>
      <div class="modal-footer">
        <button tabindex="-1" class="btn-secondary _close" ontouchstart="" @click="${actionGalleryClose}">
          ${msg("Close")}
        </button>
      </div>
    `;
  }

  renderList(): unknown {
    return Object.entries(this.list || {}).map((entry) => {
      const id = entry[0];
      const { title, synchronized } = entry[1];
      const deleteOrConfirm = id === this.confirm ? this.renderConfirm(id) : this.renderDelete(id);
      const synchronizedIcon = this.renderCloud(synchronized);
      return html` <li>
        <span class="_select" @click="${this.generateHandlerSelect(id)}">${title}${synchronizedIcon}</span>
        ${deleteOrConfirm}
      </li>`;
    });
  }

  renderDelete(id: string): unknown {
    return html`<div
      @click="${this.generateHandlerConfirm(id)}"
      title="${msg("Remove from the gallery")}"
      class="gallery_trash _remove"
    >
      &times;
    </div>`;
  }

  renderConfirm(id: string): unknown {
    return html`<div
      @click="${this.generateHandlerRemove(id)}"
      title="${msg("Remove from the gallery")}"
      class="gallery_trash_confirm _confirm_remove"
    >
      ${msg("Confirm")}
    </div>`;
  }

  renderCloud(synchronized: boolean): unknown {
    if (synchronized) {
      return html`<span class="cloud">☁</span>`;
    }
    return html``;
  }
}

export default TrackGallery;
