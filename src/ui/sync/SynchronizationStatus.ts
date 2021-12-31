import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

@customElement("synchronization-status")
class SynchronizationStatus extends LitElement {
  static styles = css`
    :host {
      font-size: 1.5em;
      width: 1em;
      height: 1em;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    @keyframes rotating {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .rotating {
      animation: rotating 3s linear infinite;
      padding-bottom: 0.15em;
      cursor: wait;
    }
  `;

  @property()
  active = false;

  render(): unknown {
    const className = classMap({ rotating: this.active });
    return html`<div class="${className}">↻</div>`;
  }
}

export default SynchronizationStatus;
