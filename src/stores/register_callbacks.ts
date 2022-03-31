import { initAppCallback } from "./register/misc";
import { galleryCallback } from "./register/gallery";
import { saveAsCallback } from "./register/save_as";
import { uploadCallback } from "./register/upload";
import { notificationCallback } from "./register/notification";
import { trackCallback } from "./register/track";
import { helpCallback } from "./register/help";
import { synchronizeCallback } from "./register/synchronize";
import { register } from "./dispatcher";

export default function registerCallbacks(): void {
  register(initAppCallback);
  register(galleryCallback);
  register(saveAsCallback);
  register(uploadCallback);
  register(notificationCallback);
  register(trackCallback);
  register(helpCallback);
  register(synchronizeCallback);
}
