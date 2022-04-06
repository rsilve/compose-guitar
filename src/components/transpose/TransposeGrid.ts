import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { IState } from "../../lib/state";
import { DispatcherController } from "../../lib/lit_controller";
import { actionTransposeChange } from "./actions";

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
        color: var(--theme-secondary);
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
        background-color: var(--theme-secondary); /* Grey background */
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
        background: var(--theme-secondary-darker); /* Green background */
        cursor: pointer; /* Cursor on hover */
      }

      input::-moz-range-thumb {
        width: 16px; /* Set a specific slider handle width */
        height: 16px; /* Slider handle height */
        border-radius: 8px;
        background: var(--theme-secondary-darker); /* Green background */
        cursor: pointer; /* Cursor on hover */
      }

      input:active {
        background-color: var(--theme-secondary-lighter);
      }
    `,
  ];

  constructor() {
    super();
    const cb = (st: IState) => {
      this.transpose = st.transpose || 0;
    };
    this.addController(new DispatcherController(cb.bind(this)));
  }

  @state()
  transpose = 0;

  private handleChange(e: Event): void {
    this.transpose = +(e.target as HTMLInputElement).value;
    actionTransposeChange(this.transpose);
  }

  render(): unknown {
    return html`
      <label title="transpose">
        <input type="range" min="-11" max="11" @input="${this.handleChange}" .value="${this.transpose}" />
        <div>${this.transpose} tone</div>
      </label>
    `;
  }
}

export default TransposeGrid;
