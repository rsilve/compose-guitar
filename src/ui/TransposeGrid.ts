import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { action_transpose_change } from "../actions/actions";
import { IState } from "../stores/state";
import { DispatcherController } from "../stores/lit_controller";

@customElement("transpose-grid")
class TransposeGrid extends LitElement {
  static styles = [
    css`
      :host {
        position: absolute;
        bottom: 0;
        left: 8em;
        padding: 0 0 0.5ex 0.5ex;
        align-items: center;
        height: 1.6em;
      }

      label {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        width: 100%;
      }

      /* The slider itself */
      input {
        -webkit-appearance: none; /* Override default CSS styles */
        appearance: none;
        width: 100%; /* Full-width */
        height: 8px; /* Specified height */
        background-color: var(--color-background-secondary); /* Grey background */
        outline: none; /* Remove outline */
        opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
        -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
        transition: opacity 0.2s;
        border-radius: 4px;
        width: calc(12 * 2 * 1em);
        margin-right: 2ex;
      }

      /* Mouse-over effects */
      input:hover {
        opacity: 0.9; /* Fully shown on mouse-over */
      }

      /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
      input::-webkit-slider-thumb {
        -webkit-appearance: none; /* Override default look */
        appearance: none;
        width: 16px; /* Set a specific slider handle width */
        height: 16px; /* Slider handle height */
        border-radius: 8px;
        background: var(--color-text); /* Green background */
        cursor: pointer; /* Cursor on hover */
      }

      input::-moz-range-thumb {
        width: 16px; /* Set a specific slider handle width */
        height: 16px; /* Slider handle height */
        border-radius: 8px;
        background: var(--color-text); /* Green background */
        cursor: pointer; /* Cursor on hover */
      }

      input:active {
        background-color: hsl(var(--input-focus-h), var(--input-focus-s), var(--input-focus-l));
      }
    `,
  ];

  constructor() {
    super();
    const cb = (st: IState) => {
      this._transpose = st.transpose || 0;
    };
    this.addController(new DispatcherController(cb.bind(this)));
  }

  @state()
  _transpose = 0;

  _handle_change(e: Event): void {
    this._transpose = +(e.target as HTMLInputElement).value;
    action_transpose_change(this._transpose);
  }

  render(): unknown {
    return html`
      <label title="transpose">
        <input type="range" min="-11" max="11" @input="${this._handle_change}" .value="${this._transpose}" />
        <div>${this._transpose} tone</div>
      </label>
    `;
  }
}

export default TransposeGrid;
