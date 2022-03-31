import { property } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import Measure from "./parser/Measure";
import styles from "./grid-style";

export abstract class MeasureElement extends LitElement {
  static styles = [
    styles,
    css`
      :host {
        display: block;
        height: 100%;
      }
    `,
  ];

  @property()
  measure: Measure | undefined;

  @property({ type: Number })
  transpose = 0;

  protected render(): unknown {
    if (this.measure) {
      return this.renderMeasure(this.measure, this.transpose);
    }
    return html``;
  }

  abstract renderMeasure(_measure: Measure, _transpose: number): unknown;
}
