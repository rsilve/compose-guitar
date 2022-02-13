import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { classMap } from "lit/directives/class-map.js";
import Grid from "../../../parser/Grid";
import inputStyles from "../../styles/inputStyles";
import { AutoCorrect, normalize } from "./tools";
import { localized, msg } from "@lit/localize";

@localized()
@customElement("grid-editor")
class GridEditor extends LitElement {
  static styles = [
    inputStyles,
    css`
      input,
      textarea {
        font-family: "Open Sans", sans-serif;
        display: block;
        font-size: 1.5em;
        line-height: 1.4em;
        width: 30em;
      }

      .title {
        position: absolute;
        top: 2px;
        left: 1em;
        font-size: 0.9em;
        font-weight: lighter;
      }

      textarea {
        height: 20em;
      }

      @media only screen and (max-height: 768px) {
        textarea {
          height: 6em;
        }
      }

      .song-editor-body-form-error {
        position: absolute;
        box-sizing: border-box;
        width: 100%;
        padding: 1ex;
        bottom: 0;
        background-color: var(--theme-error);
        color: var(--theme-on-surface);
        border-radius: 0 0 var(--border-radius) var(--border-radius);
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    this.validate(this.value);
  }

  @property()
  value: string | undefined;

  @state()
  private gridValid = true;

  @state()
  private gridErrorReason: string | undefined = undefined;

  handleChangeGrid(e: Event): void {
    const el = e.target as HTMLTextAreaElement;
    let raw = el.value;
    const autoCorrect = new AutoCorrect(raw, el.selectionEnd);
    el.value = autoCorrect.value;
    el.selectionEnd = autoCorrect.position;

    raw = normalize(autoCorrect.value);
    this.validate(raw);

    const options = {
      detail: { value: autoCorrect.value, valid: this.gridValid },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("update-grid", options));
  }

  render(): unknown {
    const normalized = this.value || "";
    return html`
      <div class="input-label">${msg("Chord sequence (required)")}</div>
      <textarea
        .value="${ifDefined(normalized)}"
        class="${classMap({ invalid: !this.gridValid })}"
        required
        placeholder="| Am7 Am7M | Am7 Am6 |&#10;| F Dm7 | Dm6 E7 | Dm E7 |&#10;  ..."
        @input="${this.handleChangeGrid}"
      ></textarea>
      ${this.gridErrorPane()}
    `;
  }

  gridErrorPane(): unknown {
    if (!this.gridValid) {
      return html` <div class="song-editor-body-form-error">${msg("Invalid syntax:")} ${this.gridErrorReason}</div>`;
    }
    return html``;
  }

  private validate(raw: string | undefined): void {
    if (raw) {
      const parsed = new Grid(raw);
      this.gridValid = parsed.valid;
      this.gridErrorReason = parsed.reason;
    } else {
      this.gridValid = true;
    }
  }
}

export default GridEditor;
