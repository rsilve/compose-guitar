import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { classMap } from "lit/directives/class-map.js";
import { localized, msg } from "@lit/localize";
import { inputStyles } from "../../styles";

@localized()
@customElement("grid-editor-title")
class GridEditorTitle extends LitElement {
  static styles = [
    inputStyles,
    css`
      input {
        display: block;
        font-size: 1.5em;
        width: 30em;
        padding-top: 0.3em;
      }

      .error-title {
        position: absolute;
        box-sizing: border-box;
        bottom: 2px;
        right: 2px;
        padding: 0.5ex 1.5ex;
        background-color: var(--theme-error);
        color: var(--theme-on-surface);
        border-radius: var(--border-radius) 0 var(--border-radius) 0;
      }
    `,
  ];

  @query("#title_input")
  private elTitle: HTMLInputElement | undefined;

  @property()
  value: string | undefined = undefined;

  @property()
  invalid = false;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.elTitle?.focus();
  }

  private handleChange(e: Event): void {
    const raw = (e.target as HTMLInputElement).value;
    const options = {
      detail: { value: raw },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("change-title", options));
  }

  render(): unknown {
    return html`
      ${this.titleErrorPane()}
      <div class="input-label">${msg("Song title (required)")}</div>
      <input
        id="title_input"
        type="text"
        .value="${ifDefined(this.value)}"
        class="${classMap({ invalid: this.invalid })}"
        required
        placeholder="My little valentine (Franck Sinatra)"
        @input="${this.handleChange}"
      />
    `;
  }

  titleErrorPane(): unknown {
    if (this.invalid) {
      return html` <div class="error-title">${msg("This title already exists")}</div>`;
    }
    return html``;
  }
}

export default GridEditorTitle;
