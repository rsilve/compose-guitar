import { html } from "lit";
import { customElement } from "lit/decorators.js";
import chord_render from "./chord_render";
import { MeasureElement } from "./MeasureElement";
import Measure from "../../parser/Measure";

@customElement("chords-grid-measure1")
class MeasureElement1 extends MeasureElement {
  renderMeasure(measure: Measure, transpose = 0): unknown {
    return html`
      <table class="grid-measure-1">
        <tbody>
          <tr>
            <td>${chord_render(measure.chords[0].transpose(transpose))}</td>
          </tr>
        </tbody>
      </table>
    `;
  }
}

export default MeasureElement1;
