import "./zoom-grid";
import { register } from "../../stores/dispatcher";
import { zoomChangeCallback } from "./store";

register(zoomChangeCallback);
