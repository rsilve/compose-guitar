import { expect } from "@open-wc/testing";

import { stateTest } from "../../../__tests__/TestHelpers";
import { INIT_APP } from "../actions";
import FeatureFlag from "../../../lib/FeatureFlag";
import { storage } from "../../../lib/register/gallery_tools";
import { IState, STATE_VERSION } from "../../../lib/state";
import { initAppCallback } from "../store";
import Action from "../../../lib/Action";

describe("Register misc", () => {
  const st = stateTest;

  it("init_app_callback", async () => {
    const last_state: IState = {
      version: STATE_VERSION,
      track: {
        title: "title2",
        grid_text: "B7",
      },
      zoom: 100,
      transpose: 0,
      synchronization: {
        enabled: false,
      },
      featureFlags: {
        synchro_enabled: true,
      },
    };
    storage.saveLastState(last_state);
    const state = await initAppCallback(new Action(INIT_APP), { ...st });
    expect(state).to.deep.equal(last_state);
    expect(FeatureFlag.get().synchro_enabled).to.be.true;
  });
});
