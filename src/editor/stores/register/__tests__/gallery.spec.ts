import { expect } from "@open-wc/testing";
import {
  GALLERY_CLOSE,
  GALLERY_OPEN,
  GALLERY_REMOVE,
} from "../../../actions/actions";
import { add_to_gallery, get_from_gallery } from "../gallery_tools";
import { gallery_callback } from "../gallery";
import { state_test } from "../../../../__tests__/TestHelpers";
import { Action } from "../../../../actions/Action";

suite("Gallery callback", () => {
  const st = state_test;

  test("gallery open", async () => {
    const state = await gallery_callback(new Action(GALLERY_OPEN), { ...st });
    expect(state.gallery).to.be.true;
  });

  test("remove from gallery", async () => {
    let { track = {} } = st;
    track = { ...track, grid_text: "aa" };
    add_to_gallery(track, { ...st, track });
    const state = await gallery_callback(
      new Action(GALLERY_REMOVE, { id: track.id }),
      { ...st }
    );
    expect(state.gallery).to.be.undefined;
    expect(state).to.deep.equal(st);
    const fromGallery = get_from_gallery("test1");
    expect(fromGallery).to.be.null;
    const fromGalleryById = get_from_gallery(track.id || "");
    expect(fromGalleryById).to.be.null;
  });

  test("gallery close", async () => {
    const state = await gallery_callback(new Action(GALLERY_CLOSE), { ...st });
    expect(state.gallery).to.be.undefined;
  });
});
