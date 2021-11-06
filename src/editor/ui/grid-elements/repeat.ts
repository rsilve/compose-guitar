import {html} from 'lit';
import Measure from "../../parser/Measure";

export function repeat_end(measure: Measure): unknown {
    if (measure.repeat_end) {
        return html`<div class="grid-measure-repeat-right"><span>∶</span></div>`
    } else {
        return html``
    }

}

export function repeat_start(measure: Measure): unknown {
    if (measure.repeat_start) {
        return html`<div class="grid-measure-repeat-left"><span>∶</span></div>`
    } else {
        return html``
    }

}
