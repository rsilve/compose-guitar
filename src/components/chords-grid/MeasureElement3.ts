import { html } from "lit";
import { customElement } from "lit/decorators.js";
import chordRender from "./chord_render";
import Measure from "./parser/Measure";
import { MeasureElement } from "./MeasureElement";

@customElement("chords-grid-measure3")
export default class MeasureElement3 extends MeasureElement {
  renderMeasure(measure: Measure, transpose = 0): unknown {
    return html`
      <table class="grid-measure-3">
        <tbody>
          <tr>
            <td class="grid-measure-beat-12">${chordRender(measure.chords[0].transpose(transpose))}</td>
          </tr>
          <tr>
            <td class="grid-measure-beat-34">${chordRender(measure.chords[1].transpose(transpose))}</td>
          </tr>
        </tbody>
      </table>
    `;
  }
}
