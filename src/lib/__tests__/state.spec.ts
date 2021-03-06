import { expect } from "@open-wc/testing";
import { default_state, STATE_VERSION } from "../state";

describe("State", () => {
  it("init", () => {
    const st = default_state();
    expect(st).to.deep.equal({
      version: STATE_VERSION,
      zoom: 100,
      transpose: 0,
      synchronization: {
        enabled: false,
      },
    });
  });
});
