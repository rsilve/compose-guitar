import { html } from "lit";
import Chord from "../../parser/Chord";

export default function chord_render(chord: Chord): unknown {
  const base = html`<span class="chord_note">${chord.base}</span>`;

  let modifier = html``;
  if (chord.base_modifier) {
    modifier = html`<span class="chord_note_modifier">${chord.base_modifier}</span>`;
  }

  let color = html``;
  if (chord.color) {
    color = html`<span class="chord_note_color">${chord.color}</span>`;
  }

  let detail = html``;
  if (chord.base_modifier || chord.color) {
    detail = html`<span class="chord_note_detail">${modifier}${color}</span>`;
  }

  let extension = html``;
  if (chord.extension) {
    extension = html`<span class="chord_note_extension">${chord.extension}</span>`;
  }

  const note = html`${base}${detail}${extension}`;

  let external_base = html``;
  if (chord.external_base) {
    let external_base_modifier = html``;
    if (chord.external_base_modifier) {
      external_base_modifier = html`<span class="chord_base_note_modifier">${chord.external_base_modifier}</span>`;
    }
    external_base = html`<span class="chord_base_note">/${chord.external_base}${external_base_modifier}</span>`;
  }
  return html`<div class="chord">${note}${external_base}</div>`;
}
