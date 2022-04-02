import "./zoom-grid";
import { register } from "../../stores/dispatcher";
import { zoomChangeCallback } from "./store";
import { decrKey, incrKey } from "./keyboard";

register(zoomChangeCallback);

export const zoomDecrKey = decrKey;
export const zoomIncrKey = incrKey;
