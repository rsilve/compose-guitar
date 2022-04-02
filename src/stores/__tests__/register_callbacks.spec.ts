import { expect } from "@open-wc/testing";
import registerCallbacks from "../register_callbacks";
import { registered } from "../dispatcher";
import { initAppCallback } from "../register/misc";
import { saveAsCallback } from "../register/save_as";
import { notificationCallback } from "../register/notification";
import { trackCallback } from "../register/track";
import { synchronizeCallback } from "../register/synchronize";

describe("Register", () => {
  it("init", () => {
    registerCallbacks();
    expect(registered(initAppCallback)).to.be.true;
    expect(registered(saveAsCallback)).to.be.true;
    expect(registered(notificationCallback)).to.be.true;
    expect(registered(trackCallback)).to.be.true;
    expect(registered(synchronizeCallback)).to.be.true;
  });
});
