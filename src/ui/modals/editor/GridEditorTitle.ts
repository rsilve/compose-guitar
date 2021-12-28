import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
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
        font-size: 1.5em;
        width: 30em;
        padding-top: 0.9em;
      }

      .title {
        position: absolute;
        top: 2px;
        left: 1em;
        font-size: 0.9em;
        font-weight: lighter;
      }

      .error-title {
        position: absolute;
        box-sizing: border-box;
        bottom: 2px;
        right: 2px;
        padding: 0.5ex 1.5ex;
        background-color: var(--color-background-secondary);
        color: var(--color-text);
        border-radius: var(--border-radius) 0 var(--border-radius) 0;
      }
    `,
  ];

  @query("#title_input")
  _el_title: HTMLInputElement | undefined;

  @property()
  value: string | undefined = undefined;

  @property()
  invalid = false;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this._el_title?.focus();
  }

  handle_change(e: Event): void {
    const raw = (e.target as HTMLInputElement).value;
    const options = {
      detail: { value: raw },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("input", options));
  }

  render(): unknown {
    return html`
      ${this.title_error_pane()}
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

  title_error_pane(): unknown {
    if (this.invalid) {
      return html` <div class="error-title">This title already exists</div>`;
    }
    return html``;
  }
}

export default GridEditorTitle;
