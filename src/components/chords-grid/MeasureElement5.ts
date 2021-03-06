import { html } from "lit";
import { customElement } from "lit/decorators.js";
import chordRender from "./chord_render";
import Measure from "./parser/Measure";
import { MeasureElement } from "./MeasureElement";

@customElement("chords-grid-measure5")
export default class MeasureElement5 extends MeasureElement {
  renderMeasure(measure: Measure, transpose = 0): unknown {
    return html`
      <table class="grid-measure-5">
        <tbody>
          <tr>
            <td class="grid-measure-beat-1">${chordRender(measure.chords[0].transpose(transpose))}</td>
            <td class="grid-measure-beat-2">${chordRender(measure.chords[1].transpose(transpose))}</td>
          </tr>
          <tr>
            <td colspan="2">${chordRender(measure.chords[2].transpose(transpose))}</td>
          </tr>
        </tbody>
      </table>
    `;
  }
}
