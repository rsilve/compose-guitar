import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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

  @property({ attribute: false })
  list: Record<string, IGalleryTrack> = {};

  @property({ attribute: false })
  remove_handler: (id: string) => void = () => {
    /* do nothing by default */
  };

  _generate_handler_select(id: string) {
    return (): void => {
      this.clearEventualTimeout();
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
      this.clearEventualTimeout();
      const options = {
        detail: { id },
        bubbles: true,
        composed: true,
      };
      this.dispatchEvent(new CustomEvent("remove", options));
    };
  }

  private clearEventualTimeout(): void {
    if (this.confirmTimeout) {
      clearTimeout(this.confirmTimeout);
    }
  }

  _generate_handler_confirm(id: string) {
    return (): void => {
      this.confirm = id;
      this.clearEventualTimeout();
      this.confirmTimeout = setTimeout(() => (this.confirm = undefined), 3000);
    };
  }

  private _dispatch_close() {
    this.clearEventualTimeout();
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("close", options));
  }

  render(): unknown {
    const itemTemplates = this.render_list();
    return html`
      <h1>${msg("Songs gallery")}</h1>
      <p class="help">${msg("Click on a track to load it")}</p>
      <ul>
        ${itemTemplates}
      </ul>
      <div class="modal-footer">
        <button tabindex="-1" class="btn-secondary _close" ontouchstart="" @click="${this._dispatch_close}">
          ${msg("Close")}
        </button>
      </div>
    `;
  }

  render_list(): unknown {
    return Object.entries(this.list).map((entry) => {
      const id = entry[0];
      const { title, synchronized } = entry[1];
      const deleteOrConfirm = id === this.confirm ? this.render_confirm(id) : this.render_delete(id);
      const synchronizedIcon = this.render_cloud(synchronized);
      return html` <li>
        <span class="_select" @click="${this._generate_handler_select(id)}">${title}${synchronizedIcon}</span>
        ${deleteOrConfirm}
      </li>`;
    });
  }

  render_delete(id: string): unknown {
    return html`<div
      @click="${this._generate_handler_confirm(id)}"
      title="${msg("Remove from the gallery")}"
      class="gallery_trash _remove"
    >
      &times;
    </div>`;
  }

  render_confirm(id: string): unknown {
    return html`<div
      @click="${this._generate_handler_remove(id)}"
      title="${msg("Remove from the gallery")}"
      class="gallery_trash_confirm _confirm_remove"
    >
      ${msg("Confirm")}
    </div>`;
  }

  render_cloud(synchronized: boolean): unknown {
    if (synchronized) {
      return html`<span class="cloud">☁</span>`;
    }
    return html``;
  }
}

export default TrackGallery;
