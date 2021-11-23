import { html } from "lit";
import { customElement } from "lit/decorators.js";
import chord_render from "./chord_render";
import Measure from "../../parser/Measure";
import { MeasureElement } from "./MeasureElement";

@customElement("chords-grid-measure3")
export default class MeasureElement3 extends MeasureElement {
  renderMeasure(measure: Measure, transpose = 0): unknown {
    return html`
      <table class="grid-measure-3">
        <tbody>
          <tr>
            <td class="grid-measure-beat-12">
              ${chord_render(measure.chords[0].transpose(transpose))}
            </td>
          </tr>
          <tr>
            <td class="grid-measure-beat-34">
              ${chord_render(measure.chords[1].transpose(transpose))}
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }
}
