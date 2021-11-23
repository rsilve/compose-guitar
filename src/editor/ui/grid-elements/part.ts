import { html, TemplateResult } from 'lit';
import Measure from '../../parser/Measure';

export default function part(measure: Measure): TemplateResult<1> {
  if (measure.part) {
    return html`<div class="grid-measure-part">${measure.part}</div>`;
  }
  return html``;
}
