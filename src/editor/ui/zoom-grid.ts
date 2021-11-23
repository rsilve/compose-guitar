import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { action_zoom_change } from '../actions/actions';
import { DispatcherController } from '../../stores/lit_controller';
import { IState } from '../stores/state';

const DEFAULT_ZOOM = 100;

@customElement('zoom-grid')
class ZoomGrid extends LitElement {
  static styles = [
    css`
        :host {
            display: flex;
            flex-direction: row;
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 0 0 .5ex .5ex;
            align-items: center;
            touch-action: none;
            -webkit-touch-callout:none;
            -webkit-user-select:none;
            -khtml-user-select:none;
            -moz-user-select:none;
            -ms-user-select:none;
            user-select:none;
            -webkit-tap-highlight-color:rgba(0,0,0,0);
        }
        
        div + div {
            margin-left: .5ex;
        }
        
        .pill {
            width: 1.4em;
            height: 1.4em;
            padding-top: .65em;
            background-color: var(--color-background-secondary);
            border-radius: var(--border-radius);
            text-align: center;
            line-height: 0;
            box-sizing: border-box;
            font-size: 1.5em;
            font-weight: lighter;
        }
        
        .pill:active {
           transform: scale(1.2);
        }
        
        .text {
            font-size: 1em;
        }
    `];

  constructor() {
    super();
    const cb = (st: IState) => {
      this._zoom = st.zoom || DEFAULT_ZOOM;
    };
    this.addController(new DispatcherController(cb.bind(this)));
  }

    @state()
      _zoom = DEFAULT_ZOOM;

    _handle_incr(): void {
      const z = this._zoom + 10;
      action_zoom_change(z);
    }

    _handle_decr(): void {
      const z = this._zoom - 10;
      action_zoom_change(z);
    }

    render(): unknown {
      return html`
            <div class="zoom_in pill" @click="${this._handle_incr}" title="Zoom in - Atl++/Alt+=" ontouchstart="">+</div>
            <div class="zoom_out pill" @click="${this._handle_decr}" title="Zoom out - Alt+-" ontouchstart="">-</div>
            <div class="text">${this._zoom}%</div>`;
    }
}

export default ZoomGrid;
