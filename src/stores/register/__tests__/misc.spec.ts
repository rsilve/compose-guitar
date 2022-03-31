import { expect } from "@open-wc/testing";
import { INIT_APP } from "../../../actions/actions";

import { initAppCallback } from "../misc";
import { saveLastState } from "../gallery_tools";
import { stateTest } from "../../../__tests__/TestHelpers";
import { IState, STATE_VERSION } from "../../state";
import Action from "../../../actions/Action";
import FeatureFlag from "../../FeatureFlag";

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
    saveLastState(last_state);
    const state = await initAppCallback(new Action(INIT_APP), { ...st });
    expect(state).to.deep.equal(last_state);
    expect(FeatureFlag.get().synchro_enabled).to.be.true;
  });
});
