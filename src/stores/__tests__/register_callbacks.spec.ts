import { expect } from "@open-wc/testing";
import registerCallbacks from "../register_callbacks";
import { registered } from "../dispatcher";
import { initAppCallback } from "../register/misc";

describe("Register", () => {
  it("init", () => {
    registerCallbacks();
    expect(registered(initAppCallback)).to.be.true;
  });
});
