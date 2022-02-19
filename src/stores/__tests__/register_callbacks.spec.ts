import { expect } from "@open-wc/testing";
import registerCallbacks from "../register_callbacks";
import { registered } from "../dispatcher";
import { initAppCallback, transposeChangeCallback, zoomChangeCallback } from "../register/misc";
import { galleryCallback } from "../register/gallery";
import { saveAsCallback } from "../register/save_as";
import { uploadCallback } from "../register/upload";
import { notificationCallback } from "../register/notification";
import { trackCallback } from "../register/track";
import { synchronizeCallback } from "../register/synchronize";

describe("Register", () => {
  it("init", () => {
    registerCallbacks();
    expect(registered(initAppCallback)).to.be.true;
    expect(registered(galleryCallback)).to.be.true;
    expect(registered(saveAsCallback)).to.be.true;
    expect(registered(uploadCallback)).to.be.true;
    expect(registered(notificationCallback)).to.be.true;
    expect(registered(zoomChangeCallback)).to.be.true;
    expect(registered(trackCallback)).to.be.true;
    expect(registered(transposeChangeCallback)).to.be.true;
    expect(registered(synchronizeCallback)).to.be.true;
  });
});
