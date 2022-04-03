import "./SongEditor";
import { register } from "../../stores/dispatcher";
import { songEditCallback } from "./store";

register(songEditCallback);
