import { expect } from "@open-wc/testing";
import { HELP_CLOSE, HELP_OPEN } from "../../../actions/actions";
import { stateTest } from "../../../__tests__/TestHelpers";
import Action from "../../../actions/Action";
import { helpCallback } from "../help";

describe("help callback", () => {
  const st = stateTest;

  it("gallery open", async () => {
    const state = await helpCallback(new Action(HELP_OPEN), { ...st });
    expect(state.help_open).to.be.true;
  });

  it("gallery close", async () => {
    const state = await helpCallback(new Action(HELP_CLOSE), { ...st });
    expect(state.help_open).to.be.undefined;
  });
});
