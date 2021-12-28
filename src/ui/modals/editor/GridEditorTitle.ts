import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { classMap } from "lit/directives/class-map.js";
import inputStyles from "../../styles/inputStyles";

@customElement("grid-editor-title")
class GridEditorTitle extends LitElement {
  static styles = [
    inputStyles,
    css`
      input {
        display: block;
        font-family: monospace;
        font-size: 1.5em;
        width: 40em;
        padding-top: 0.9em;
      }

      .title {
        position: absolute;
        top: 1px;
        left: 0.7em;
        font-size: 0.9em;
        font-weight: lighter;
      }
    `,
  ];

  @property()
  value: string | undefined = undefined;

  @property()
  invalid = true;

  handle_change(e: Event): void {
    const raw = (e.target as HTMLInputElement).value;
    const options = {
      detail: { value: raw },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("input-title", options));
  }

  render(): unknown {
    return html`
      <div class="title">Song title (required)</div>
      <input
        id="title_input"
        type="text"
        .value="${ifDefined(this.value)}"
        class="${classMap({ invalid: this.invalid })}"
        required
        placeholder="My little valentine (Franck Sinatra)"
        @input="${this.handle_change}"
      ></input>
    `;
  }
}

export default GridEditorTitle;
