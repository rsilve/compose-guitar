import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import chord_render from './chord_render';
import Measure from '../../parser/Measure';
import { MeasureElement } from './MeasureElement';

@customElement('chords-grid-measure6')
export default class MeasureElement6 extends MeasureElement {
  renderMeasure(measure: Measure, transpose = 0): unknown {
    return html`
            <table class="grid-measure-6">
                <tbody>
                <tr>
                    <td class="grid-measure-beat-1">${chord_render(measure.chords[0].transpose(transpose))}</td>
                    <td class="grid-measure-beat-2">${chord_render(measure.chords[1].transpose(transpose))}</td>
                </tr>
                <tr>
                    <td class="grid-measure-beat-3">%</td>
                    <td class="grid-measure-beat-4">${chord_render(measure.chords[2].transpose(transpose))}</td>
                </tr>
                </tbody>
            </table>
        `;
  }
}
