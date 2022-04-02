import { initAppCallback } from "./register/misc";
import { saveAsCallback } from "./register/save_as";
import { notificationCallback } from "./register/notification";
import { trackCallback } from "./register/track";
import { helpCallback } from "./register/help";
import { synchronizeCallback } from "./register/synchronize";
import { register } from "./dispatcher";

export default function registerCallbacks(): void {
  register(initAppCallback);
  register(saveAsCallback);
  register(notificationCallback);
  register(trackCallback);
  register(helpCallback);
  register(synchronizeCallback);
}
