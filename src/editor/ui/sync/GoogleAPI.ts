import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('google-api')
class GoogleAPI extends LitElement {
  render(): unknown {
    return html`
            ${this.script()}
        `;
  }

  script() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    return script;
  }
}

export default GoogleAPI;
