import {css, LitElement, svg} from 'lit';
import {customElement} from "lit/decorators.js";
import icon_style from "./icon_style";


@customElement('new-working-session-icon')
class NewWorkingSession extends LitElement {

    static styles = [
        icon_style,
        css`
        :host {
            display: inline-flex;
            align-self: center;
        }
        `
    ]

    render(): unknown {
        return svg`
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
`;
    }


}

export default NewWorkingSession
