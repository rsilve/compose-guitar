import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { localized, msg } from "@lit/localize";
import { buttonStyles, modalStyles } from "../styles";
import { actionSaveAsStartAndNew, actionTrackNewCancel, actionTrackNewWithoutSave } from "./actions";
import { actionNotificationOpen } from "../../actions/actions";
import { NotificationMessageEnum } from "../../ui/NotificationMessageEnum";

@localized()
@customElement("confirm-save")
class ConfirmSave extends LitElement {
  static styles = [modalStyles, buttonStyles];

  private dispatchSave() {
    actionSaveAsStartAndNew().then(() => actionNotificationOpen(NotificationMessageEnum.SAVE_COMPLETED));
  }

  render(): unknown {
    return html`
      <p>${msg("Some changes have not been recorded. Do you want to continue anyway?")}</p>
      <div class="modal-footer">
        <button tabindex="-1" class="btn-secondary _cancel" ontouchstart="" @click="${actionTrackNewCancel}">
          ${msg("Cancel")}
        </button>
        <button tabindex="-1" class="btn-secondary _continue" ontouchstart="" @click="${actionTrackNewWithoutSave}">
          ${msg("Continue")}
        </button>
        <button class="_save" ontouchstart="" @click="${this.dispatchSave}">${msg("Save and continue")}</button>
      </div>
    `;
  }
}

export default ConfirmSave;
