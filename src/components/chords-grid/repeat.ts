import { html } from "lit";
import Measure from "./parser/Measure";

export function repeatEnd(measure: Measure): unknown {
  if (measure.repeatEnd) {
    return html`<div class="grid-measure-repeat-right"><span>∶</span></div>`;
  }
  return html``;
}

export function repeatStart(measure: Measure): unknown {
  if (measure.repeatStart) {
    return html`<div class="grid-measure-repeat-left"><span>∶</span></div>`;
  }
  return html``;
}
