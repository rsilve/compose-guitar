import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./TrackGallery";
import "./SongEditor";
import "./HelpModal";
import "./ConfirmSave";
import "./SynchronizeConfiguration";
import { DispatcherController } from "../../stores/lit_controller";
import {
  actionGalleryClose,
  actionGalleryRemove,
  action_help_close,
  actionNotificationOpen,
  actionSaveAsStartAndNew,
  action_synchro_sign_out,
  action_synchro_toggle_enable,
  action_synchronization_activation,
  action_synchronization_configuration_close,
  action_synchronization_deactivation,
  actionTrackNewCancel,
  actionTrackNewWithoutSave,
  actionUploadFromGallery,
} from "../../actions/actions";
import { gallery_dict_extended } from "../../stores/register/gallery_tools";
import { IState, IStateFeatureFlag, IStateSynchronization } from "../../stores/state";

@customElement("compose-modals")
class Modals extends LitElement {
  static styles = css`
    .modal {
      display: block;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      padding: 1em;
      background-color: var(--theme-surface);
      color: var(--theme-on-surface);
      border: 1px solid var(--theme-surface-lighter);
      border-radius: var(--border-radius);

      font-size: 0.7em;
    }

    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.85);
    }

    .hide {
      display: none !important;
    }
  `;

  @state()
  _gallery_activated = false;

  @state()
  _editor_enabled = false;

  @state()
  _help_open = false;

  @state()
  _confirm_save_enabled = false;

  @state()
  synchronizationConfigurationOpen = false;

  @state()
  synchronization: IStateSynchronization | undefined;

  @state()
  featureFlags: IStateFeatureFlag | undefined;

  constructor() {
    super();
    const cb = (st: IState) => {
      this._gallery_activated = (st.gallery as boolean) || false;
      this._editor_enabled = st.editor !== undefined;
      this._help_open = !!st.help_open;
      this._confirm_save_enabled = !!st.confirm_save;
      this.synchronizationConfigurationOpen = st.synchronization.open || false;
      this.synchronization = st.synchronization;
      this.featureFlags = st.featureFlags;
    };
    this.addController(new DispatcherController(cb.bind(this)));
  }

  private static _dispatch_library_select(e: CustomEvent): void {
    actionUploadFromGallery(e.detail.id);
  }

  private static _dispatch_library_remove(e: CustomEvent): void {
    actionGalleryRemove(e.detail.id);
  }

  private _handle_save(): void {
    actionSaveAsStartAndNew().then(() => actionNotificationOpen("Save completed"));
  }

  private static dispatchDeactivate() {
    action_synchronization_deactivation().then(action_synchro_sign_out);
  }

  private toggle_synchro_feature() {
    action_synchro_toggle_enable().then(() => {
      if (import.meta.env?.PROD) {
        document.location.reload();
      }
    });
  }

  render(): unknown {
    const overlay = html` <div class="overlay"></div>`;

    if (this._gallery_activated) {
      return html`${overlay}
        <track-gallery
          class="modal"
          .list="${gallery_dict_extended()}"
          @select="${Modals._dispatch_library_select}"
          @remove="${Modals._dispatch_library_remove}"
          @close="${actionGalleryClose}"
        ></track-gallery>`;
    }
    if (this._editor_enabled) {
      return html`${overlay} <song-editor class="modal"></song-editor>`;
    }
    if (this._help_open) {
      return html`${overlay}
        <help-modal
          class="modal"
          .featureFlags="${this.featureFlags}"
          @toggleSyncEnable="${this.toggle_synchro_feature}"
          @close="${action_help_close}"
        ></help-modal>`;
    }
    if (this._confirm_save_enabled) {
      return html`${overlay}
        <confirm-save
          class="modal"
          @cancel="${actionTrackNewCancel}"
          @continue="${actionTrackNewWithoutSave}"
          @save="${this._handle_save}"
        ></confirm-save>`;
    }

    if (this.synchronizationConfigurationOpen) {
      return html`${overlay}
        <synchronize-configuration
          class="modal"
          .synchronization="${this.synchronization}"
          @activate="${action_synchronization_activation}"
          @deactivate="${Modals.dispatchDeactivate}"
          @close="${action_synchronization_configuration_close}"
        ></synchronize-configuration>`;
    }
    return html``;
  }
}

export default Modals;
