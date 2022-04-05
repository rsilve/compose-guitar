import "./SongEditor";
import "./app-main-preview";
import { register } from "../../lib/dispatcher";
import { songEditCallback } from "./store";
import { editKey } from "./keyboard";

register(songEditCallback);

export const songEditKey = editKey;
