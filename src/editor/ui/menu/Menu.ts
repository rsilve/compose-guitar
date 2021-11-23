import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './menu-item';
import '../../../icons/save_icon';
import '../../../icons/new_track_icon';
import '../../../icons/gallery_icon';
import { IState } from '../../stores/state';
import { save_needed } from '../../tools/state_tools';
import { DispatcherController } from '../../../stores/lit_controller';
import {
  action_gallery_open,
  action_notification_open,
  action_save_as_start,
  action_track_new,
} from '../../actions/actions';

@customElement('compose-menu')
class Menu extends LitElement {
  static styles = css` 
        :host {
            display: block;
        }
        
        menu-item + menu-item {
            padding-top: .2em;
        }
   `;

  constructor() {
    super();
    const cb = ({ track }: IState): void => {
      this._need_save = save_needed(track);
    };
    this.addController(new DispatcherController(cb.bind(this)));
  }

    @state()
      _need_save = false;

    _handle_save(): void {
      action_save_as_start().then(() => action_notification_open('Save completed'));
    }

    render(): unknown {
      return html`
            <menu-item title="save the track - Ctrl+s"
                       class="_save"
                       .dotted="${this._need_save}"
                       @click="${this._handle_save}">
                <save-icon></save-icon>
            </menu-item>
            <menu-item title="Open the Library - Ctrl+l" 
                       class="_library"
                       @click="${action_gallery_open}">
                <gallery-icon></gallery-icon>
            </menu-item>
            <menu-item title="new track - Ctrl+n"
                       class="_new"
                       @click="${action_track_new}">
                <new-track-icon></new-track-icon>
            </menu-item>
        `;
    }
}

export default Menu;
