import { expect } from "@open-wc/testing";
import { SAVE_AS_START, SAVE_AS_START_AND_NEW } from "../../../actions/actions";
import { save_as_callback } from "../save_as";
import { get_from_gallery } from "../gallery_tools";
import { state_test } from "../../../../__tests__/TestHelpers";
import { Action } from "../../../../actions/Action";

suite("Register save_as", () => {
  const st = state_test;

  test("save as start", async () => {
    const state = await save_as_callback(new Action(SAVE_AS_START), { ...st });
    const fromGallery = get_from_gallery(state.track?.id || "");
    expect(fromGallery?.track).to.be.not.null;
    expect(fromGallery?.track?.id).to.be.not.null;
    expect(fromGallery?.track?.saved_at).to.be.not.null;
    delete state?.confirm_save;
    expect(fromGallery).to.deep.equal(state);
  });

  test("save as start without id", async () => {
    delete st.track?.id;
    const state = await save_as_callback(new Action(SAVE_AS_START), { ...st });
    const fromGallery = get_from_gallery(state.track?.id || "");
    expect(fromGallery?.track).to.be.not.null;
    expect(fromGallery?.track?.id).to.be.not.null;
    expect(fromGallery?.track?.saved_at).to.be.not.null;
    delete fromGallery?.track?.id;
    delete fromGallery?.track?.saved_at;
    expect(fromGallery).to.deep.equal(st);
  });

  test("save as start and new", async () => {
    const state = await save_as_callback(new Action(SAVE_AS_START_AND_NEW), {
      ...st,
      transpose: 0,
    });
    const fromGallery = get_from_gallery(state.track?.id || "");
    expect(fromGallery?.track?.id).to.be.not.null;
    expect(fromGallery?.track?.saved_at).to.be.not.null;
    delete fromGallery?.track?.id;
    delete fromGallery?.track?.saved_at;
    expect(fromGallery).to.deep.equal(st);
    expect(state.editor).not.to.be.undefined;
    expect(state.confirm_save).to.be.undefined;
    expect(state.transpose).to.be.equal(0);
  });
});
