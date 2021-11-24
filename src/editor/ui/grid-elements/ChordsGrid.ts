import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./grid-style";
import part from "./part";
import { repeat_end, repeat_start } from "./repeat";
import Grid from "../../parser/Grid";
import Row from "../../parser/Row";
import Measure from "../../parser/Measure";
import "./MeasureElement1";
import "./MeasureElement2";
import "./MeasureElement3";
import "./MeasureElement4";
import "./MeasureElement5";
import "./MeasureElement6";
import "./MeasureElement7";
import "./MeasureElement8";

@customElement("chords-grid")
class ChordsGrid extends LitElement {
  static styles = [
    styles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property()
  text_grid: string | undefined;

  @property({ type: Number })
  transpose = 0;

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.text_grid) {
      this.text_grid = this.textContent || undefined;
    }
  }

  render(): unknown {
    const grid = new Grid(this.text_grid);
    const map = grid.rows.map(
      (row) => html` <tr style="border-collapse: collapse">
        ${this.renderRow(row)}
      </tr>`
    );
    return html` <table class="grid">
      <tbody>
        ${map}
      </tbody>
    </table>`;
  }

  renderRow(row: Row): unknown {
    const map = row.measure.map((measure) => html` <td class="grid grid-measure">${this.renderMeasure(measure)}</td>`);
    return html`${map}`;
  }

  renderMeasure(measure: Measure): unknown {
    let element: unknown;
    switch (measure.type) {
      case 1: // A _ _ _
        element = html`<chords-grid-measure1
          .measure="${measure}"
          transpose="${this.transpose}"
        ></chords-grid-measure1>`;
        break;
      case 2: // A B _ _
        element = html`<chords-grid-measure2
          .measure="${measure}"
          transpose="${this.transpose}"
        ></chords-grid-measure2>`;
        break;
      case 3: // A _ B _
        element = html`<chords-grid-measure3
          .measure="${measure}"
          transpose="${this.transpose}"
        ></chords-grid-measure3>`;
        break;
      case 4: // A _ _ B
        element = html`<chords-grid-measure4
          .measure="${measure}"
          transpose="${this.transpose}"
        ></chords-grid-measure4>`;
        break;
      case 5: // A B C _
        element = html`<chords-grid-measure5
          .measure="${measure}"
          transpose="${this.transpose}"
        ></chords-grid-measure5>`;
        break;
      case 6: // A B _ C
        element = html`<chords-grid-measure6
          .measure="${measure}"
          transpose="${this.transpose}"
        ></chords-grid-measure6>`;
        break;
      case 7: // A _ B C
        element = html`<chords-grid-measure7
          .measure="${measure}"
          transpose="${this.transpose}"
        ></chords-grid-measure7>`;
        break;
      case 8: // A B C D
        element = html`<chords-grid-measure8
          .measure="${measure}"
          transpose="${this.transpose}"
        ></chords-grid-measure8>`;
        break;
    }
    const part_element = part(measure);
    const repeat_start_el = repeat_start(measure);
    const repeat_end_el = repeat_end(measure);
    return html`${repeat_start_el}${part_element}${element}${repeat_end_el}`;
  }
}

export default ChordsGrid;
