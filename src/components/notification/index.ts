import "./compose-notification";
import { register } from "../../lib/dispatcher";
import { notificationCallback } from "./store";

register(notificationCallback);
