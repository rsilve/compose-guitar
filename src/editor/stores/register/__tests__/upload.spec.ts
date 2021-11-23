import { expect } from "@open-wc/testing";
import {
  NOTIFICATION_OPEN,
  UPLOAD_FROM_GALLERY,
} from "../../../actions/actions";

import { upload_callback } from "../upload";
import { add_to_gallery } from "../gallery_tools";
import { state_test } from "../../../../__tests__/TestHelpers";
import { connect, register } from "../../../../stores/dispatcher";
import { IState } from "../../state";
import { uuid } from "../../../../tools/uuid";
import { Action } from "../../../../actions/Action";

suite("Upload callback", () => {
  const st = state_test;

  test("upload from gallery", async () => {
    let action_notification_open_send = false;
    register((action, state): Promise<IState> => {
      action_notification_open_send = action.action_type === NOTIFICATION_OPEN;
      return Promise.resolve(state);
    });
    const promise = new Promise<void>((resolve) => {
      connect(() => {
        resolve();
      });
    });

    const track = { grid_text: "zz", title: "test", id: uuid() };
    add_to_gallery(track, { ...st, track });
    const state = await upload_callback(
      new Action(UPLOAD_FROM_GALLERY, { id: track.id }),
      {
        ...st,
        gallery: true,
      }
    );
    await promise;

    expect(state.track).to.deep.equal(track);
    expect(state.gallery).to.be.undefined;
    expect(state.zoom).to.equal(100);
    expect(action_notification_open_send).to.be.true;
  });
});
