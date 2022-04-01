import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { localized, msg } from "@lit/localize";
import buttonStyles from "../styles/buttonStyles";
import { noPrintStyles } from "../styles/no_print";

import "../../components/chords-grid";
import { actionTrackEdit } from "../../actions/actions";

@localized()
@customElement("app-main-preview")
class AppMainPreview extends LitElement {
  static styles = [
    buttonStyles,
    noPrintStyles,
    css`
      h1 {
        font-size: 1.5em;
        font-weight: normal;
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
  songTitle = "";

  @property()
  songGrid = "";

  @property({ type: Number })
  transpose = 0;

  private handleEdit(): void {
    actionTrackEdit({ title: this.songTitle, grid_text: this.songGrid });
  }

  render(): unknown {
    const styles = { "font-size": `${this.zoom / 100}em` };
    return html` <div @click="${this.handleEdit}" title="click to edit">
      <h1>${this.songTitle}</h1>
      <chords-grid style="${styleMap(styles)}" text_grid="${this.songGrid}" transpose="${this.transpose}">
      </chords-grid>
      <p class="no_print">${msg("click to edit")}</p>
    </div>`;
  }
}

export default AppMainPreview;
