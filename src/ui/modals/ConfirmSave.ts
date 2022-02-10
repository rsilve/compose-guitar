import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { modalStyles } from "../styles/modals";
import buttonStyles from "../styles/buttonStyles";
import { localized, msg } from "@lit/localize";

@localized()
@customElement("confirm-save")
class ConfirmSave extends LitElement {
  static styles = [modalStyles, buttonStyles];

  private dispatchCancel() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("cancel", options));
  }

  private dispatchContinue() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("continue", options));
  }

  private dispatchSave() {
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("save", options));
  }

  render(): unknown {
    return html`
      <p>${msg("Some changes have not been recorded. Do you want to continue anyway?")}</p>
      <div class="modal-footer">
        <button tabindex="-1" class="btn-secondary _cancel" ontouchstart="" @click="${this.dispatchCancel}">
          ${msg("Cancel")}
        </button>
        <button tabindex="-1" class="btn-secondary _continue" ontouchstart="" @click="${this.dispatchContinue}">
          ${msg("Continue")}
        </button>
        <button class="_save" ontouchstart="" @click="${this.dispatchSave}">${msg("Save and continue")}</button>
      </div>
    `;
  }
}

export default ConfirmSave;
