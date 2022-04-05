import "./ConfirmSave";
import { register } from "../../lib/dispatcher";
import { createAndSaveCallback } from "./store";
import { copy_key, paste_key, save_as_start_key, track_new_key } from "./keyboard";

register(createAndSaveCallback);

export const newSongKey = track_new_key;
export const songCopyKey = copy_key;
export const songPasteKey = paste_key;
export const saveAsStartKey = save_as_start_key;
