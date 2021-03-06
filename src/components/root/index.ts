import "./editor-main";
import initApp from "./initApp";
import { register } from "../../lib/dispatcher";
import { initAppCallback } from "./store";

register(initAppCallback);

export const init = initApp;
