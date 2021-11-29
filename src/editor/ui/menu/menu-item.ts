import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../../icons/save_icon";
import "../../../icons/new_track_icon";
import "../../../icons/gallery_icon";
import { classMap } from "lit/directives/class-map.js";

@customElement("menu-item")
class MenuItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      cursor: pointer;
      font-size: 1.2em;
    }

    :active {
      transform: scale(1.2) translateX(1ex);
      background-color: var(--color-background-secondary);
      border-radius: 5px;
    }

    .dot::after {
      display: block;
      position: absolute;
      top: -0.3ex;
      right: -0.2ex;
      content: "●";
      font-size: 1.2em;
      color: var(--color-error);
    }
  `;

  constructor() {
    super();
    this.setAttribute("ontouchstart", "");
  }

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
