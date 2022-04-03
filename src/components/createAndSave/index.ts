import "./ConfirmSave";
import { register } from "../../stores/dispatcher";
import { createAndSaveCallback } from "./store";
import { track_new_key } from "./keyboard";

register(createAndSaveCallback);

export const newSongKey = track_new_key;
