import {css, html, LitElement} from 'lit';
import {customElement, property} from "lit/decorators.js";
import {modalStyles} from "../styles/modals";
import {buttonStyles} from "../styles/button";
import "../../../icons/delete_icon"

@customElement('track-gallery')
class TrackGallery extends LitElement {

    static styles = [
        modalStyles,
        buttonStyles,
        css` 
        
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        
        ul > li {
           min-width: 30em;
           display: flex;
           flex-direction: row;
           justify-content: space-between;
           align-items: center;
           line-height: 1.8em;
           padding: 0 4px;
           cursor: pointer;
        }
        
        li:hover {
            outline: thin dotted var(--color-headline);
        }
        
        li > span {
            flex-grow: 1;
        }
        
        .gallery_trash {
            margin-left: 2em;
            margin-bottom: -1em;
            font-size: 0.8em;
        }
    `]

    @property({attribute: false})
    list: Record<string, string> = {}

    @property({attribute: false})
    remove_handler: (id: string) => void = () => {}

    _generate_handler_select(id: string) {
        return (): void => {
            const options = {
                detail: {id},
                bubbles: true,
                composed: true
            };
            this.dispatchEvent(new CustomEvent('select', options));
        }
    }

    _generate_handler_remove(id: string) {
        return (): void => {
            const options = {
                detail: {id},
                bubbles: true,
                composed: true
            };
            this.dispatchEvent(new CustomEvent('remove', options));
        }
    }

    private _dispatch_close() {
        const options = {
            bubbles: true,
            composed: true
        };
        this.dispatchEvent(new CustomEvent('close', options));
    }

    render(): unknown {
        const itemTemplates = this.render_list()
        return html`
            <p>Click on a track to load it</p>
            <ul>${itemTemplates}</ul>
            <div class="modal-footer">
                <button tabindex="-1" class="btn-secondary _close" @click="${this._dispatch_close}">Cancel</button>
            </div>
        `;
    }

    render_list(): unknown {
        return Object.keys(this.list).map((key) => {
            const title = this.list[key]
            return html`
                <li>
                    <span class="_select" @click="${this._generate_handler_select(key)}">${title}</span>
                    <div @click="${this._generate_handler_remove(key)}" class="gallery_trash _remove">
                        <delete-icon title="Remove from the gallery"/>
                    </div>
                </li>`
        })
    }

}

export default TrackGallery
