import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../components/icons";
import { classMap } from "lit/directives/class-map.js";

@customElement("menu-item")
class MenuItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      cursor: pointer;
      font-size: 1.2em;
      padding: 0.5ex;
    }

    :host(:active) {
      background-color: var(--theme-surface);
      border-radius: 5px;
    }

    .dot::after {
      font-family: "Open Sans", sans-serif;
      display: block;
      position: absolute;
      top: -0.3ex;
      right: -0.2ex;
      content: "●";
      font-size: 1.2em;
      color: var(--theme-error);
    }
  `;

  @property({ type: Boolean })
  dotted = false;

  render(): unknown {
    return html`
      <div class="${classMap({ dot: this.dotted })}">
        <slot></slot>
      </div>
    `;
  }
}

export default MenuItem;
