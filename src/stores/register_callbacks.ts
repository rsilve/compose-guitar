import { initAppCallback } from "./register/misc";
import { notificationCallback } from "./register/notification";
import { register } from "./dispatcher";

export default function registerCallbacks(): void {
  register(initAppCallback);
  register(notificationCallback);
}
