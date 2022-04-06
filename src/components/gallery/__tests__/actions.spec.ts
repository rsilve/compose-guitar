import { expect } from "@open-wc/testing";
import {
  actionGalleryClose,
  actionGalleryOpen,
  actionGalleryRemove,
  actionUploadFromGallery,
  GALLERY_CLOSE,
  GALLERY_OPEN,
  GALLERY_REMOVE,
  UPLOAD_FROM_GALLERY,
} from "../actions";
import { register, resetDispatcher } from "../../../lib/dispatcher";
import { default_state } from "../../../lib/state";

describe("actions", () => {
  it("upload_from_gallery", async () => {
    let handle = "";
    resetDispatcher(default_state());
    register((action, state) => {
      const { id = "" } = action.payload as { id: string };
      handle = action.actionType === UPLOAD_FROM_GALLERY ? id : "";
      return Promise.resolve(state);
    });
    await actionUploadFromGallery("id");
    expect(handle).to.be.equal("id");
  });

  it("gallery_open", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === GALLERY_OPEN;
      return Promise.resolve(state);
    });
    await actionGalleryOpen();
    expect(handle).to.be.true;
  });

  it("gallery_gallery_remove", async () => {
    let handle = "id";
    resetDispatcher(default_state());
    register((action, state) => {
      const { id = "" } = action.payload as { id: string };
      handle = action.actionType === GALLERY_REMOVE ? id : "";
      return Promise.resolve(state);
    });
    await actionGalleryRemove("id");
    expect(handle).to.be.equal("id");
  });

  it("gallery_gallery_close", async () => {
    let handle = false;
    resetDispatcher(default_state());
    register((action, state) => {
      handle = action.actionType === GALLERY_CLOSE;
      return Promise.resolve(state);
    });
    await actionGalleryClose();
    expect(handle).to.be.true;
  });
});
