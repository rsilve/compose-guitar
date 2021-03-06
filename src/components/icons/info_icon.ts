import { css, svg } from "lit";
import { customElement } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import iconStyle from "./iconStyle";
import StyledIcon from "./StyledIcon";

@customElement("info-icon")
class InfoIcon extends StyledIcon {
  static styles = [
    iconStyle,
    css`
      :host {
        display: inline-block;
        position: relative;
        width: 1em;
      }

      svg {
        position: absolute;
        top: -1em;
        left: 0;
      }
    `,
  ];

  render(): unknown {
    const styleMap1 = styleMap({ fill: this.fill });
    return svg`
            <svg xmlns="http://www.w3.org/2000/svg" style="${styleMap1}" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>`;
  }
}

export default InfoIcon;
