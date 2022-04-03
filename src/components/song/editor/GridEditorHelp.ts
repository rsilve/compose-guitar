import { localized, msg } from "@lit/localize";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

@localized()
@customElement("grid-editor-help")
class GridEditorHelp extends LitElement {
  static styles = css`
    .song-editor-body-help {
      display: block;
      margin-left: 1em;
      margin-top: 1px;
      box-sizing: border-box;
      min-width: 20em;
      padding: 0.5em;
      border: 1px solid var(--theme-surface-darker);
      border-radius: 4px;
    }

    .song-editor-body-help chords-grid {
      font-size: 0.5em;
    }

    .song-editor-body-help-example {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  `;

  @property()
  open = false;

  render(): unknown {
    if (!this.open) {
      return html``;
    }
    const classes = classMap({
      "song-editor-body-help": true,
    });
    return html`
            <div class="${classes}">
                <h2>${msg("Examples")}</h2>
                <p>${msg("Chord:")} <strong>A</strong>, <strong>Em</strong>, <strong>F#</strong>, <strong>Cb</strong>,
                    <strong>G7</strong>, <strong>D9</strong>, <strong>Asus2</strong>, <strong>Bm57b</strong>,
                    <strong>Bø</strong>, <strong>C/E</strong></p>
                <p>${msg("Measure :")} <strong>| A |</strong>, <strong>| D C |</strong>, <strong>| G Em _ _ |</strong>
                <div class="song-editor-body-help-example">
                    <chords-grid>| A |</chords-grid>
                    <chords-grid>| D C |</chords-grid>
                    <chords-grid>| G Em _ _ |</chords-grid>
                    <chords-grid>| G _ _ Em |</chords-grid>
                    <chords-grid>| G Em D7 G |</chords-grid>
                </div>
                </p>
                <p>${msg("Measure row:")} <strong>| F | G | Em | G Em |</strong>
                <div class="song-editor-body-help-example">
                    <chords-grid>| F | G | Em | G Em |</chords-grid>
                </div>
                </p>
                <p>${msg("Measure modifier:")} <strong>|(a) A |</strong>, <strong>|: D :|</strong>
                <div class="song-editor-body-help-example">
                    <chords-grid> |(a) A |</chords-grid>
                    <chords-grid>|: D :|</chords-grid>
                </div>
                </p>
            </div>`;
  }
}

export default GridEditorHelp;
