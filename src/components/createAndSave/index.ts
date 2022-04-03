import "./ConfirmSave";
import { register } from "../../stores/dispatcher";
import { confirmSaveCallback } from "./store";
import { track_new_key } from "./keyboard";

register(confirmSaveCallback);

export const newSongKey = track_new_key;
