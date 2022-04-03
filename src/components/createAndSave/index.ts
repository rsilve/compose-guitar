import "./ConfirmSave";
import { register } from "../../stores/dispatcher";
import { confirmSaveCallback } from "./store";

register(confirmSaveCallback);
