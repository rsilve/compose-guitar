import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { msg, localized } from "@lit/localize";
import { modalStyles } from "../styles/modals";
import buttonStyles from "../styles/buttonStyles";
import "../../icons/delete_icon";
import { IGalleryTrack } from "../../stores/state";

@localized()
@customElement("track-gallery")
class TrackGallery extends LitElement {
  static styles = [
    modalStyles,
    buttonStyles,
    css`
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
        padding: 0 4px;
        cursor: pointer;
        border-radius: var(--border-radius);
      }

      li:hover {
        outline: thin dotted var(--theme-secondary);
      }

      li > span {
        flex-grow: 1;
      }

      .gallery_trash {
        margin-left: 2em;
        margin-bottom: -1em;
        font-size: 0.8em;
      }

      .cloud {
        padding-left: 1ex;
        font-size: 1.1em;
        color: var(--theme-secondary);
      }
    `,
  ];

  @property({ attribute: false })
  list: Record<string, IGalleryTrack> = {};

  @property({ attribute: false })
  remove_handler: (id: string) => void = () => {
    /* do nothing by default */
  };

  _generate_handler_select(id: string) {
    return (): void => {
      const options = {
        detail: { id },
        bubbles: true,
        composed: true,
      };
      this.dispatchEvent(new CustomEvent("select", options));
    };
  }

  _generate_handler_remove(id: string) {
    return (): void => {
      const options = {
        detail: { id },
        bubbles: true,
        composed: true,
      };
      this.dispatchEvent(new CustomEvent("remove", options));
    };
  }

  private _dispatch_close() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("close", options));
  }

  render(): unknown {
    const itemTemplates = this.render_list();
    return html`
      <p>${msg("Click on a track to load it")}</p>
      <ul>
        ${itemTemplates}
      </ul>
      <div class="modal-footer">
        <button tabindex="-1" class="btn-secondary _close" ontouchstart="" @click="${this._dispatch_close}">
          ${msg("Cancel")}
        </button>
      </div>
    `;
  }

  render_list(): unknown {
    return Object.entries(this.list).map((entry) => {
      const { title } = entry[1];
      const synchronized = this.render_cloud(entry[1].synchronized);
      return html` <li>
        <span class="_select" @click="${this._generate_handler_select(entry[0])}">${title}${synchronized}</span>
        <div @click="${this._generate_handler_remove(entry[0])}" class="gallery_trash _remove">
          <delete-icon title="${msg("Remove from the gallery")}"></delete-icon>
        </div>
      </li>`;
    });
  }

  render_cloud(synchronized: boolean): unknown {
    if (synchronized) {
      return html`<span class="cloud">☁</span>`;
    }
    return html``;
  }
}

export default TrackGallery;
