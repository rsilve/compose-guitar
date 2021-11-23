import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { buttonStyles } from "../styles/button";
import { noPrintStyles } from "../styles/no_print";

import "../grid-elements/ChordsGrid";
import { action_track_edit } from "../../actions/actions";

@customElement("app-main-preview")
class AppMainPreview extends LitElement {
  static styles = [
    buttonStyles,
    noPrintStyles,
    css`
      h1 {
        font-size: 1.5em;
        margin: 0 0 0.4em 0;
      }

      p {
        font-size: 0.5em;
        margin: 0;
      }
    `,
  ];

  @property()
  zoom = 100;

  @property()
  song_title = "";

  @property()
  song_grid = "";

  @property({ type: Number })
  transpose = 0;

  _handle_edit(): void {
    action_track_edit({ title: this.song_title, grid_text: this.song_grid });
  }

  render(): unknown {
    const styles = { "font-size": `${this.zoom / 100}em` };
    return html` <div @click="${this._handle_edit}" title="click to edit">
      <h1>${this.song_title}</h1>
      <chords-grid
        style="${styleMap(styles)}"
        text_grid="${this.song_grid}"
        transpose="${this.transpose}"
      >
      </chords-grid>
      <p class="no_print">click to edit</p>
    </div>`;
  }
}

export default AppMainPreview;
