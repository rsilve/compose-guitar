import { expect } from "@open-wc/testing";
import registerCallbacks from "../register_callbacks";
import { registered } from "../dispatcher";
import { initAppCallback, transpose_change_callback, zoomChangeCallback } from "../register/misc";
import { galleryCallback } from "../register/gallery";
import { saveAsCallback } from "../register/save_as";
import { uploadCallback } from "../register/upload";
import { notificationCallback } from "../register/notification";
import { trackCallback } from "../register/track";
import { synchronizeCallback } from "../register/synchronize";

suite("Register", () => {
  test("init", () => {
    registerCallbacks();
    expect(registered(initAppCallback)).to.be.true;
    expect(registered(galleryCallback)).to.be.true;
    expect(registered(saveAsCallback)).to.be.true;
    expect(registered(uploadCallback)).to.be.true;
    expect(registered(notificationCallback)).to.be.true;
    expect(registered(zoomChangeCallback)).to.be.true;
    expect(registered(trackCallback)).to.be.true;
    expect(registered(transpose_change_callback)).to.be.true;
    expect(registered(synchronizeCallback)).to.be.true;
  });
});
