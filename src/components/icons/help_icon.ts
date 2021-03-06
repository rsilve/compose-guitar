import { svg } from "lit";
import { customElement } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import iconStyle from "./iconStyle";
import StyledIcon from "./StyledIcon";

@customElement("help-icon")
class HelpIcon extends StyledIcon {
  static styles = [iconStyle];

  render(): unknown {
    const styleMap1 = styleMap({ fill: this.fill });
    return svg`
            <svg xmlns="http://www.w3.org/2000/svg" style="${styleMap1}" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>`;
  }
}

export default HelpIcon;
