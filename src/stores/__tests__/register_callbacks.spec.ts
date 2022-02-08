import { expect } from "@open-wc/testing";
import register_callbacks from "../register_callbacks";
import { registered } from "../dispatcher";
import { init_app_callback, transpose_change_callback, zoom_change_callback } from "../register/misc";
import { gallery_callback } from "../register/gallery";
import { save_as_callback } from "../register/save_as";
import { upload_callback } from "../register/upload";
import { notificationCallback } from "../register/notification";
import { track_callback } from "../register/track";
import { synchronizeCallback } from "../register/synchronize";

suite("Register", () => {
  test("init", () => {
    register_callbacks();
    expect(registered(init_app_callback)).to.be.true;
    expect(registered(gallery_callback)).to.be.true;
    expect(registered(save_as_callback)).to.be.true;
    expect(registered(upload_callback)).to.be.true;
    expect(registered(notificationCallback)).to.be.true;
    expect(registered(zoom_change_callback)).to.be.true;
    expect(registered(track_callback)).to.be.true;
    expect(registered(transpose_change_callback)).to.be.true;
    expect(registered(synchronizeCallback)).to.be.true;
  });
});
