import { LitElement, svg } from "lit";
import { customElement } from "lit/decorators.js";
import iconStyle from "./iconStyle";

@customElement("new-track-icon")
class NewTrackIcon extends LitElement {
  static styles = iconStyle;

  render(): unknown {
    return svg`
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zm-7-2h2v-3h3V9h-3V6h-2v3h-3v2h3z"/></svg>
`;
  }
}

export default NewTrackIcon;
