import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import "./main-screen";
import "../menu";
import "../zoom";
import "../transpose";
import "../modals";
import "../help";
import "../notification";
import "../synchronization";
import FeatureFlag from "../../lib/FeatureFlag";
import { noPrintStyles } from "../styles";

@customElement("editor-main")
class EditorMain extends LitElement {
  static styles = [
    noPrintStyles,
    css`
      compose-menu {
        padding-left: 0.3em;
        padding-top: 0.3em;
        position: fixed;
      }

      main-screen {
        display: block;
        position: fixed;
        top: 50%;
        left: 50%;
        /* bring your own prefixes */
        transform: translate(-50%, -50%);
      }

      @media print {
        compose-guitar {
          display: block;
          position: inherit;
          transform: inherit;
        }
      }

      compose-keys {
        position: fixed;
        bottom: 0;
        right: 0;
        padding-right: 0.3em;
      }
    `,
  ];

  protected render(): unknown {
    let account = html``;
    if (FeatureFlag.get().synchro_enabled) {
      account = html`<account-status class="no_print"></account-status>`;
    }
    return html`
      <compose-menu class="no_print"></compose-menu>
      <main-screen></main-screen>
      <zoom-grid class="no_print"></zoom-grid>
      <compose-keys class="no_print"></compose-keys>
      <transpose-grid class="no_print"></transpose-grid>
      ${account}
      <compose-modals class="no_print"></compose-modals>
      <compose-notification class="no_print"></compose-notification>
      <google-api class="no_print"></google-api>
    `;
  }
}

export default EditorMain;
