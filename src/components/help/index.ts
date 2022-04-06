import "./HelpModal";
import "./compose-keys";
import { register } from "../../lib/dispatcher";
import { helpCallback } from "./store";

register(helpCallback);
