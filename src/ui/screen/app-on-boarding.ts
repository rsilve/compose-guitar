import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import buttonStyles from "../styles/buttonStyles";
import { action_track_new } from "../../actions/actions";

@customElement("app-on-boarding")
class AppOnBoarding extends LitElement {
  static styles = [
    buttonStyles,
    css`
      :host {
        display: block;
        text-align: center;
      }

      p {
        font-size: 1em;
      }

      h1 {
        font-size: 3em;
        margin: 0;
        padding: 0;
      }

      h2 {
        font-size: 1.5em;
        margin: 0;
        padding: 0 0 1em 0;
      }

      chords-grid {
        font-size: 0.5em;
      }

      .example {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 1em 0;
      }

      pre {
        text-align: left;
        font-size: 1.3em;
        line-height: 1.5em;
      }
    `,
  ];

  render(): unknown {
    return html`
      <h1>Chords grid editor</h1>
      <h2>Your songs in a glance</h2>
      <p>Just write down your chord sequence and get a simple picture of your song.</p>
      <div class="example">
        <pre>
| E7 | A7 Adim | E7 | % |
| A7 | A7 | E7 | % |
| B7 | A7 | E7 | Bb7 B7 |</pre
        >
        <div style="font-size: 2em; padding: 2em;">➡︎</div>
        <chords-grid> | E7 | A7 Adim | E7 | % |; | A7 | A7 | E7 | % |; | B7 | A7 | E7 | Bb7 B7 |; </chords-grid>
      </div>

      <button @click="${action_track_new}">Create your first chords grid</button>
    `;
  }
}

export default AppOnBoarding;
