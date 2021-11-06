import {LitElement, svg} from 'lit';
import {customElement} from "lit/decorators.js";
import icon_style from "./icon_style";


@customElement('file-upload-icon')
class FileUploadIcon extends LitElement {

    static styles = icon_style

    render(): unknown {
        return svg`
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></svg>
        `;
    }


}

export default FileUploadIcon
