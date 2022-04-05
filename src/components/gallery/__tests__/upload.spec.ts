import { expect } from "@open-wc/testing";

import { stateTest } from "../../../__tests__/TestHelpers";
import { uuid } from "../../../tools/uuid";
import { UPLOAD_FROM_GALLERY } from "../actions";
import { uploadCallback } from "../store";
import Action from "../../../lib/Action";
import { storage } from "../../../lib/gallery_tools";

describe("Upload callback", () => {
  const st = stateTest;

  it("upload from gallery", async () => {
    const track = { grid_text: "zz", title: "test", id: uuid() };
    storage.addToGallery(track, { ...st, track });
    const state = await uploadCallback(new Action(UPLOAD_FROM_GALLERY, { id: track.id }), {
      ...st,
      gallery: true,
    });

    expect(state.track).to.deep.equal(track);
    expect(state.gallery).to.be.undefined;
    expect(state.zoom).to.equal(100);
  });

  it("upload from gallery does not update syn state", async () => {
    const st_with_sync = { ...st, synchronization: { enabled: true }, featureFlags: { synchro_enabled: true } };

    const track = { grid_text: "zz", title: "test", id: uuid() };
    storage.addToGallery(track, { ...st, track, featureFlags: { synchro_enabled: false } });
    const state = await uploadCallback(new Action(UPLOAD_FROM_GALLERY, { id: track.id }), {
      ...st_with_sync,
      gallery: true,
    });

    expect(state.synchronization).to.be.deep.equals(st_with_sync.synchronization);
    expect(state.featureFlags).to.be.deep.equals(st_with_sync.featureFlags);
  });
});
