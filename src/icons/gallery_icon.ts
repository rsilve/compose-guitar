import { LitElement, svg } from 'lit';
import { customElement } from 'lit/decorators.js';
import icon_style from './icon_style';

@customElement('gallery-icon')
class GalleryIcon extends LitElement {
  static styles = icon_style;

  render(): unknown {
    return svg`
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8zm0 3h4v2h-4zm0-6h8v2h-8z"/></svg>`;
  }
}

export default GalleryIcon;
