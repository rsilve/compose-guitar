import {html} from 'lit';
import chord_render from "./chord_render";
import Measure from "../../parser/Measure";
import {customElement} from "lit/decorators.js";
import {MeasureElement} from "./MeasureElement";

@customElement('chords-grid-measure2')
export default class MeasureElement2 extends MeasureElement {

    renderMeasure(measure: Measure, transpose = 0): unknown {
        return html`
            <table class="grid-measure-2" cellPadding="0" cellSpacing="0">
                <tbody>
                <tr>
                    <td class="grid-measure-beat-1">${chord_render(measure.chords[0].transpose(transpose))}</td>
                    <td class="grid-measure-beat-2">${chord_render(measure.chords[1].transpose(transpose))}</td>
                </tr>
                <tr>
                    <td class="grid-measure-beat-3">${chord_render(measure.chords[1].transpose(transpose))}</td>
                    <td>%</td>
                </tr>
                </tbody>
            </table>
        `

    }
}