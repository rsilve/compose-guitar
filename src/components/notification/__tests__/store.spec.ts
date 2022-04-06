import { expect } from "@open-wc/testing";
import { notificationCallback } from "../store";
import { stateTest } from "../../../__tests__/TestHelpers";
import { NOTIFICATION_CLOSE, NOTIFICATION_OPEN } from "../actions";
import Action from "../../../lib/Action";

describe("Notification callback", () => {
  const st = stateTest;

  it("notification open", async () => {
    const action = new Action(NOTIFICATION_OPEN, { message: "message" });
    const state = await notificationCallback(action, { ...st });
    expect(state.notification).to.equal("message");
  });

  it("notification close", async () => {
    const action = new Action(NOTIFICATION_CLOSE);
    const state = await notificationCallback(action, { ...st });
    expect(state.notification).to.be.undefined;
  });
});
