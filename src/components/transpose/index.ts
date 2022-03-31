import "./TransposeGrid";
import { register } from "../../stores/dispatcher";
import { transposeChangeCallback } from "./store";

register(transposeChangeCallback);
