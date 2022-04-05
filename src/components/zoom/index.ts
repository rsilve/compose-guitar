import "./zoom-grid";
import { register } from "../../lib/dispatcher";
import { zoomChangeCallback } from "./store";
import { decrKey, incrKey } from "./keyboard";

register(zoomChangeCallback);

export const zoomDecrKey = decrKey;
export const zoomIncrKey = incrKey;
