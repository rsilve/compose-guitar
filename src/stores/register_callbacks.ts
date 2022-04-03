import { initAppCallback } from "./register/misc";
import { notificationCallback } from "./register/notification";
import { synchronizeCallback } from "./register/synchronize";
import { register } from "./dispatcher";

export default function registerCallbacks(): void {
  register(initAppCallback);
  register(notificationCallback);
  register(synchronizeCallback);
}
