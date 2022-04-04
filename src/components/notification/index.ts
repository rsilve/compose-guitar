import "./compose-notification";
import { register } from "../../stores/dispatcher";
import { notificationCallback } from "./store";

register(notificationCallback);
