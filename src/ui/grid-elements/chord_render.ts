import { html } from "lit";
import Chord from "../../parser/Chord";

export default function chordRender(chord: Chord): unknown {
  const base = html`<span class="chord_note">${chord.base}</span>`;

  let modifier = html``;
  if (chord.baseModifier) {
    modifier = html`<span class="chord_note_modifier">${chord.baseModifier}</span>`;
  }

  let color = html``;
  if (chord.color) {
    color = html`<span class="chord_note_color">${chord.color}</span>`;
  }

  let detail = html``;
  if (chord.baseModifier || chord.color) {
    detail = html`<span class="chord_note_detail">${modifier}${color}</span>`;
  }

  let extension = html``;
  if (chord.extension) {
    extension = html`<span class="chord_note_extension">${chord.extension}</span>`;
  }

  const note = html`${base}${detail}${extension}`;

  let externalBase = html``;
  if (chord.externalBase) {
    let externalBaseModifier = html``;
    if (chord.externalBaseModifier) {
      externalBaseModifier = html`<span class="chord_base_note_modifier">${chord.externalBaseModifier}</span>`;
    }
    externalBase = html`<span class="chord_base_note">/${chord.externalBase}${externalBaseModifier}</span>`;
  }
  return html`<div class="chord">${note}${externalBase}</div>`;
}
