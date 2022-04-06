import "./TransposeGrid";
import { register } from "../../lib/dispatcher";
import { transposeChangeCallback } from "./store";

register(transposeChangeCallback);
