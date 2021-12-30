export interface IStateDownload {
  filename?: string;
  ready?: boolean;
}

export interface IStateEditor {
  grid_text?: string;
  title?: string;
}

export interface IStateTrack {
  grid_text?: string;
  title?: string;
  updated_at?: string;
  saved_at?: string;
  id?: string;
}

type IStateVersion = "v2";
export const STATE_VERSION: IStateVersion = "v2";

export interface IStateSynchronization {
  enabled: boolean;
  signInProgress?: boolean;
  open?: boolean;
  signInValid?: boolean;
  error?: unknown;
}

export interface IState {
  version: IStateVersion;
  track?: IStateTrack;
  download?: IStateDownload;
  gallery?: boolean;
  notification?: string;
  zoom: number;
  editor?: IStateEditor;
  help_open?: boolean;
  confirm_save?: boolean;
  transpose: number;
  synchronization: IStateSynchronization;
}

export function default_state(): IState {
  return {
    version: STATE_VERSION,
    zoom: 100,
    transpose: 0,
    synchronization: {
      enabled: false,
    },
  };
}
