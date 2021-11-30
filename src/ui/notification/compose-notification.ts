import { customElement, property, state } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import { DispatcherController } from "../../stores/lit_controller";
import { action_notification_close } from "../../actions/actions";
import { IState } from "../../stores/state";

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
        color: var(--color-background);
        display: block;
        background-color: var(--color-text);
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
        action_notification_close();
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
  private _message: string[] = [];

  protected render(): unknown {
    const items = this._message.map((msg) => html` <li>${msg}</li>`);
    return html`
      <ul>
        ${items}
      </ul>
    `;
  }
}

export default ComposeNotification;
