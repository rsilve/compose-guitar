import { expect } from "@open-wc/testing";

import {
  addToGallery,
  addToSynchronizedIndex,
  existsInGallery,
  galleryDict,
  galleryDictExtended,
  galleryList,
  getFromGallery,
  getSynchronizedIndex,
  removeFromGallery,
  removeFromSynchronizedIndex,
} from "../gallery_tools";
import { STATE_VERSION } from "../../state";
import { stateTest } from "../../../__tests__/TestHelpers";
import { uuid } from "../../../tools/uuid";

suite("Gallery tools", () => {
  const st = stateTest;

  test("empty gallery", () => {
    localStorage.clear();
    expect(galleryList()).to.deep.equal([]);
    expect(galleryDict()).to.deep.equal({});
    expect(getFromGallery("test")).to.be.null;
    removeFromGallery("test");
    expect(galleryDict()).to.deep.equal({});
    expect(galleryList()).to.deep.equal([]);
    expect(getFromGallery("test")).to.be.null;
  });

  test("tools for gallery", () => {
    localStorage.clear();
    expect(galleryList()).to.deep.equal([]);
    expect(galleryDict()).to.deep.equal({});
    expect(getFromGallery("test")).to.be.null;

    const track = { id: uuid(), grid_text: "ee", title: "test" };
    addToGallery(track, { ...st, track });
    expect(galleryList()).to.deep.equal(["test"]);
    expect(Object.values(galleryDict())).to.deep.equal([track.title]);
    expect(Object.keys(galleryDict())).to.deep.equal([track.id]);
    expect(getFromGallery(track.id)).to.deep.equal({ ...st, track });
    expect(getFromGallery(track.id)).to.deep.equal({ ...st, track });
    removeFromGallery(track.id);
    expect(galleryDict()).to.deep.equal({});
    expect(galleryList()).to.deep.equal([]);
    expect(getFromGallery("test")).to.be.null;
    expect(getFromGallery(track.id)).to.be.null;
  });

  test("tools for gallery 002", () => {
    localStorage.clear();
    expect(galleryList()).to.deep.equal([]);
    expect(galleryDict()).to.deep.equal({});
    expect(getFromGallery("test")).to.be.null;

    const track = { id: uuid(), grid_text: "zz", title: "test" };
    addToGallery(track, { ...st, track });
    expect(galleryList()).to.deep.equal(["test"]);
    expect(getFromGallery(track.id)).to.deep.equal({ ...st, track });
    removeFromGallery(track.id);
    expect(localStorage.getItem(track.id)).to.be.null;
    expect(galleryDict()).to.deep.equal({});
    expect(galleryList()).to.deep.equal([]);
    expect(getFromGallery("test")).to.be.null;
    expect(getFromGallery(track.id)).to.be.null;
  });

  test("gallery with more than one element", () => {
    localStorage.clear();
    const track_a = { id: uuid(), grid_text: "aa", title: "test1" };
    const track_b = { id: uuid(), grid_text: "bb", title: "test2" };
    addToGallery(track_a, { ...st, track: track_a });
    addToGallery(track_b, { ...st, track: track_b });
    expect(Object.values(galleryDict())).to.deep.equal([track_a.title, track_b.title]);
    expect(Object.keys(galleryDict())).to.deep.equal([track_a.id, track_b.id]);
    expect(galleryList()).to.deep.equal(["test1", "test2"]);
    expect(getFromGallery(track_a.id)).to.deep.equal({
      ...st,
      track: track_a,
    });
    expect(getFromGallery(track_b.id)).to.deep.equal({
      ...st,
      track: track_b,
    });

    removeFromGallery("unknown_id");
    expect(galleryList()).to.deep.equal(["test1", "test2"]);
    expect(Object.values(galleryDict())).to.deep.equal([track_a.title, track_b.title]);
    expect(Object.keys(galleryDict())).to.deep.equal([track_a.id, track_b.id]);
    expect(getFromGallery(track_a.id)).to.deep.equal({
      ...st,
      track: track_a,
    });
    expect(getFromGallery(track_b.id)).to.deep.equal({
      ...st,
      track: track_b,
    });

    removeFromGallery(track_b.id);
    expect(galleryList()).to.deep.equal(["test1"]);
    expect(getFromGallery(track_a.id)).to.deep.equal({
      ...st,
      track: track_a,
    });
    expect(getFromGallery(track_b.id)).to.be.null;

    removeFromGallery(track_a.id);
    expect(galleryList()).to.deep.equal([]);
    expect(galleryDict()).to.deep.equal({});
    expect(getFromGallery("test1")).to.be.null;
    expect(getFromGallery("test2")).to.be.null;

    expect(getFromGallery(track_a.id)).to.be.null;
    expect(getFromGallery(track_b.id)).to.be.null;
  });

  test("multiple add", () => {
    localStorage.clear();
    const track = { id: uuid(), grid_text: "aa", title: "test1" };
    addToGallery(track, { ...st, track });
    expect(galleryList()).to.deep.equal(["test1"]);
    expect(Object.values(galleryDict())).to.deep.equal([track.title]);
    expect(Object.keys(galleryDict())).to.deep.equal([track.id]);
    expect(getFromGallery(track.id)).to.deep.equal({ ...st, track });

    track.grid_text = "bb";
    addToGallery(track, { ...st, track });
    expect(galleryList()).to.deep.equal(["test1"]);
    expect(Object.values(galleryDict())).to.deep.equal([track.title]);
    expect(Object.keys(galleryDict())).to.deep.equal([track.id]);
    expect(getFromGallery(track.id)).to.deep.equal({ ...st, track });

    track.title = "test2";
    addToGallery(track, { ...st, track });
    expect(galleryList()).to.deep.equal(["test2"]);
    expect(Object.values(galleryDict())).to.deep.equal([track.title]);
    expect(Object.keys(galleryDict())).to.deep.equal([track.id]);
    expect(getFromGallery(track.id)).to.deep.equal({ ...st, track });

    removeFromGallery(track.id);
    expect(galleryList()).to.deep.equal([]);
    expect(galleryDict()).to.deep.equal({});
    expect(getFromGallery(track.id)).to.be.null;
  });

  test("tools for gallery with IState", () => {
    localStorage.clear();
    expect(galleryList()).to.deep.equal([]);
    expect(galleryDict()).to.deep.equal({});
    expect(getFromGallery("test")).to.be.null;

    const state = {
      ...st,
      version: STATE_VERSION,
      track: { grid_text: "A", title: "title" },
      zoom: 100,
      transpose: 0,
    };
    const new_state = addToGallery(state.track, state);
    expect(new_state.track?.id).to.not.be.undefined;
    const new_st = getFromGallery(new_state.track?.id || "");
    expect(new_st).to.deep.equal(new_state);
    removeFromGallery(new_state.track?.id || "");
  });

  test("exists in library (empty)", () => {
    localStorage.clear();
    expect(existsInGallery("title", "foo")).to.be.false;
    expect(existsInGallery("title", undefined)).to.be.false;
  });

  test("exists in library (not empty) ", () => {
    localStorage.clear();
    addToGallery(
      { grid_text: "A", title: "title" },
      {
        ...st,
        version: STATE_VERSION,
        track: { grid_text: "A", title: "title" },
        zoom: 100,
        transpose: 0,
      }
    );
    expect(existsInGallery("title", "foo")).to.be.true;
    expect(existsInGallery("title", undefined)).to.be.true;
    expect(existsInGallery("title", "title")).to.be.false;
    expect(existsInGallery("other", "foo")).to.be.false;
    expect(existsInGallery("other", "title")).to.be.false;
    expect(existsInGallery("other", undefined)).to.be.false;
    removeFromGallery("title");
  });

  test("exists in library (not empty) 2 ", () => {
    localStorage.clear();
    addToGallery(
      { grid_text: "A", title: "title" },
      {
        ...st,
        version: STATE_VERSION,
        track: { grid_text: "A", title: "title" },
        zoom: 100,
        transpose: 0,
      }
    );
    addToGallery(
      { grid_text: "A", title: "title2" },
      {
        ...st,
        version: STATE_VERSION,
        track: { grid_text: "A", title: "title2" },
        zoom: 100,
        transpose: 0,
      }
    );
    expect(existsInGallery("title", "foo")).to.be.true;
    expect(existsInGallery("title", undefined)).to.be.true;
    expect(existsInGallery("title", "title")).to.be.false;
    expect(existsInGallery("title", "title2")).to.be.true;
    expect(existsInGallery("title2", "foo")).to.be.true;
    expect(existsInGallery("title2", undefined)).to.be.true;
    expect(existsInGallery("title2", "title")).to.be.true;
    expect(existsInGallery("title2", "title2")).to.be.false;
    expect(existsInGallery("other", "foo")).to.be.false;
    expect(existsInGallery("other", "title")).to.be.false;
    expect(existsInGallery("other", undefined)).to.be.false;
    removeFromGallery("title");
    removeFromGallery("title2");
  });

  test("add to synchronize index", () => {
    localStorage.clear();
    const track = addToSynchronizedIndex({ grid_text: "A", title: "title2" }, "my_id");
    const id = getSynchronizedIndex(track.id || "undef");
    expect(id).to.be.equal("my_id");
  });

  test("add to synchronize index with existing id", () => {
    localStorage.clear();
    const track = addToSynchronizedIndex({ id: "my_song", grid_text: "A", title: "title2" }, "my_id");
    expect(track.id).to.be.equal("my_song");
    const id = getSynchronizedIndex(track.id || "undef");
    expect(id).to.be.equal("my_id");
  });

  test("remove from synchronize index", () => {
    localStorage.clear();
    const track = addToSynchronizedIndex({ grid_text: "A", title: "title2" }, "my_id");
    removeFromSynchronizedIndex(track.id || "undef");
    const id = getSynchronizedIndex(track.id || "undef");
    expect(id).to.be.undefined;
  });

  test("get extended index", () => {
    localStorage.clear();
    addToGallery(
      { grid_text: "A", title: "title", id: "my_id" },
      {
        ...st,
        version: STATE_VERSION,
        track: { grid_text: "A", title: "title", id: "my_id" },
        zoom: 100,
        transpose: 0,
      }
    );

    addToGallery(
      { grid_text: "A", title: "title_2", id: "my_id2" },
      {
        ...st,
        version: STATE_VERSION,
        track: { grid_text: "A", title: "title_2", id: "my_id2" },
        zoom: 100,
        transpose: 0,
      }
    );
    addToSynchronizedIndex({ grid_text: "A", title: "title2", id: "my_id" }, "my_id");
    const dict = galleryDictExtended();
    expect(dict).to.be.not.null;
    expect(dict["my_id"]).to.be.deep.equal({ title: "title", synchronized: true });
    expect(dict["my_id2"]).to.be.deep.equal({ title: "title_2", synchronized: false });
  });
});
