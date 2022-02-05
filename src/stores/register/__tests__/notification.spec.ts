import { expect } from "@open-wc/testing";
import { NOTIFICATION_CLOSE, NOTIFICATION_OPEN } from "../../../actions/actions";
import { notification_callback } from "../notification";
import { stateTest } from "../../../__tests__/TestHelpers";
import Action from "../../../actions/Action";

suite("Notification callback", () => {
  const st = stateTest;

  test("notification open", async () => {
    const action = new Action(NOTIFICATION_OPEN, { message: "message" });
    const state = await notification_callback(action, { ...st });
    expect(state.notification).to.equal("message");
  });

  test("notification close", async () => {
    const action = new Action(NOTIFICATION_CLOSE);
    const state = await notification_callback(action, { ...st });
    expect(state.notification).to.be.undefined;
  });
});
