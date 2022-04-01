import { customElement, property, state } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import { localized, msg } from "@lit/localize";
import { DispatcherController } from "../../stores/lit_controller";
import { actionNotificationClose } from "../../actions/actions";
import { IState } from "../../stores/state";
import { NotificationMessageEnum } from "../NotificationMessageEnum";

@localized()
@customElement("compose-notification")
class ComposeNotification extends LitElement {
  static styles = [
    css`
      :host > ul {
        position: absolute;
        list-style: none;
        margin: 0;
        padding: 0;
        bottom: 0;
        right: 0;
      }

      li {
        color: var(--theme-on-surface);
        display: block;
        background-color: var(--theme-confirm);
        padding: 0.5em 1em;
        margin: 0.5em;
        border-radius: var(--border-radius);
        line-height: 1em;
        opacity: 0.9;
      }
    `,
  ];

  constructor() {
    super();
    const cb = (st: IState) => {
      if (st.notification) {
        const event = st.notification;
        this._message.push(event);
        this._message = [...this._message];
        actionNotificationClose();
        setTimeout(() => {
          this._message.shift();
          this._message = [...this._message];
        }, this.delay);
      }
    };
    this.addController(new DispatcherController(cb.bind(this)));
  }

  @property()
  delay = 3000;

  @state()
  private _message: NotificationMessageEnum[] = [];

  protected render(): unknown {
    const items = this._message.map((code) => html` <li>${this.message(code)}</li>`);
    return html`
      <ul>
        ${items}
      </ul>
    `;
  }

  private message(code: NotificationMessageEnum): string {
    switch (code) {
      case NotificationMessageEnum.NOTIFICATION_MESSAGE_SYNC_COMPLETED:
        return msg("Synchronisation completed");
      case NotificationMessageEnum.NOTIFICATION_MESSAGE_PASTED:
        return msg("Pasted");
      case NotificationMessageEnum.NOTIFICATION_MESSAGE_SONG_COMPLETED:
        return msg("Song copied");
      case NotificationMessageEnum.SAVE_COMPLETED:
        return msg("Save completed");
      case NotificationMessageEnum.TRACK_LOADED:
        return msg("Track loaded");
      case NotificationMessageEnum.TRACK_UPDATED:
        return msg("Track updated");

      default:
        break;
    }
    return "unknown message";
  }
}

export default ComposeNotification;
