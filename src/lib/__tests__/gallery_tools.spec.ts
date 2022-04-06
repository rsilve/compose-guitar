import { expect } from "@open-wc/testing";

import { uuid } from "../../tools/uuid";
import { stateTest } from "../../__tests__/TestHelpers";
import { STATE_VERSION } from "../state";
import { storage } from "../gallery_tools";

describe("Gallery tools", () => {
  const st = stateTest;

  it("empty gallery", () => {
    localStorage.clear();
    expect(storage.galleryList()).to.deep.equal([]);
    expect(storage.galleryDict()).to.deep.equal({});
    expect(storage.getFromGallery("test")).to.be.null;
    storage.removeFromGallery("test");
    expect(storage.galleryDict()).to.deep.equal({});
    expect(storage.galleryList()).to.deep.equal([]);
    expect(storage.getFromGallery("test")).to.be.null;
  });

  it("tools for gallery", () => {
    localStorage.clear();
    expect(storage.galleryList()).to.deep.equal([]);
    expect(storage.galleryDict()).to.deep.equal({});
    expect(storage.getFromGallery("test")).to.be.null;

    const track = { id: uuid(), grid_text: "ee", title: "test" };
    storage.addToGallery(track, { ...st, track });
    expect(storage.galleryList()).to.deep.equal(["test"]);
    expect(Object.values(storage.galleryDict())).to.deep.equal([track.title]);
    expect(Object.keys(storage.galleryDict())).to.deep.equal([track.id]);
    expect(storage.getFromGallery(track.id)).to.deep.equal({ ...st, track });
    expect(storage.getFromGallery(track.id)).to.deep.equal({ ...st, track });
    storage.removeFromGallery(track.id);
    expect(storage.galleryDict()).to.deep.equal({});
    expect(storage.galleryList()).to.deep.equal([]);
    expect(storage.getFromGallery("test")).to.be.null;
    expect(storage.getFromGallery(track.id)).to.be.null;
  });

  it("tools for gallery 002", () => {
    localStorage.clear();
    expect(storage.galleryList()).to.deep.equal([]);
    expect(storage.galleryDict()).to.deep.equal({});
    expect(storage.getFromGallery("test")).to.be.null;

    const track = { id: uuid(), grid_text: "zz", title: "test" };
    storage.addToGallery(track, { ...st, track });
    expect(storage.galleryList()).to.deep.equal(["test"]);
    expect(storage.getFromGallery(track.id)).to.deep.equal({ ...st, track });
    storage.removeFromGallery(track.id);
    expect(localStorage.getItem(track.id)).to.be.null;
    expect(storage.galleryDict()).to.deep.equal({});
    expect(storage.galleryList()).to.deep.equal([]);
    expect(storage.getFromGallery("test")).to.be.null;
    expect(storage.getFromGallery(track.id)).to.be.null;
  });

  it("gallery with more than one element", () => {
    localStorage.clear();
    const track_a = { id: uuid(), grid_text: "aa", title: "test1" };
    const track_b = { id: uuid(), grid_text: "bb", title: "test2" };
    storage.addToGallery(track_a, { ...st, track: track_a });
    storage.addToGallery(track_b, { ...st, track: track_b });
    expect(Object.values(storage.galleryDict())).to.deep.equal([track_a.title, track_b.title]);
    expect(Object.keys(storage.galleryDict())).to.deep.equal([track_a.id, track_b.id]);
    expect(storage.galleryList()).to.deep.equal(["test1", "test2"]);
    expect(storage.getFromGallery(track_a.id)).to.deep.equal({
      ...st,
      track: track_a,
    });
    expect(storage.getFromGallery(track_b.id)).to.deep.equal({
      ...st,
      track: track_b,
    });

    storage.removeFromGallery("unknown_id");
    expect(storage.galleryList()).to.deep.equal(["test1", "test2"]);
    expect(Object.values(storage.galleryDict())).to.deep.equal([track_a.title, track_b.title]);
    expect(Object.keys(storage.galleryDict())).to.deep.equal([track_a.id, track_b.id]);
    expect(storage.getFromGallery(track_a.id)).to.deep.equal({
      ...st,
      track: track_a,
    });
    expect(storage.getFromGallery(track_b.id)).to.deep.equal({
      ...st,
      track: track_b,
    });

    storage.removeFromGallery(track_b.id);
    expect(storage.galleryList()).to.deep.equal(["test1"]);
    expect(storage.getFromGallery(track_a.id)).to.deep.equal({
      ...st,
      track: track_a,
    });
    expect(storage.getFromGallery(track_b.id)).to.be.null;

    storage.removeFromGallery(track_a.id);
    expect(storage.galleryList()).to.deep.equal([]);
    expect(storage.galleryDict()).to.deep.equal({});
    expect(storage.getFromGallery("test1")).to.be.null;
    expect(storage.getFromGallery("test2")).to.be.null;

    expect(storage.getFromGallery(track_a.id)).to.be.null;
    expect(storage.getFromGallery(track_b.id)).to.be.null;
  });

  it("multiple add", () => {
    localStorage.clear();
    const track = { id: uuid(), grid_text: "aa", title: "test1" };
    storage.addToGallery(track, { ...st, track });
    expect(storage.galleryList()).to.deep.equal(["test1"]);
    expect(Object.values(storage.galleryDict())).to.deep.equal([track.title]);
    expect(Object.keys(storage.galleryDict())).to.deep.equal([track.id]);
    expect(storage.getFromGallery(track.id)).to.deep.equal({ ...st, track });

    track.grid_text = "bb";
    storage.addToGallery(track, { ...st, track });
    expect(storage.galleryList()).to.deep.equal(["test1"]);
    expect(Object.values(storage.galleryDict())).to.deep.equal([track.title]);
    expect(Object.keys(storage.galleryDict())).to.deep.equal([track.id]);
    expect(storage.getFromGallery(track.id)).to.deep.equal({ ...st, track });

    track.title = "test2";
    storage.addToGallery(track, { ...st, track });
    expect(storage.galleryList()).to.deep.equal(["test2"]);
    expect(Object.values(storage.galleryDict())).to.deep.equal([track.title]);
    expect(Object.keys(storage.galleryDict())).to.deep.equal([track.id]);
    expect(storage.getFromGallery(track.id)).to.deep.equal({ ...st, track });

    storage.removeFromGallery(track.id);
    expect(storage.galleryList()).to.deep.equal([]);
    expect(storage.galleryDict()).to.deep.equal({});
    expect(storage.getFromGallery(track.id)).to.be.null;
  });

  it("tools for gallery with IState", () => {
    localStorage.clear();
    expect(storage.galleryList()).to.deep.equal([]);
    expect(storage.galleryDict()).to.deep.equal({});
    expect(storage.getFromGallery("test")).to.be.null;

    const state = {
      ...st,
      version: STATE_VERSION,
      track: { grid_text: "A", title: "title" },
      zoom: 100,
      transpose: 0,
    };
    const new_state = storage.addToGallery(state.track, state);
    expect(new_state.track?.id).to.not.be.undefined;
    const new_st = storage.getFromGallery(new_state.track?.id || "");
    expect(new_st).to.deep.equal(new_state);
    storage.removeFromGallery(new_state.track?.id || "");
  });

  it("exists in library (empty)", () => {
    localStorage.clear();
    expect(storage.existsInGallery("title", "foo")).to.be.false;
    expect(storage.existsInGallery("title", undefined)).to.be.false;
  });

  it("exists in library (not empty) ", () => {
    localStorage.clear();
    storage.addToGallery(
      { grid_text: "A", title: "title" },
      {
        ...st,
        version: STATE_VERSION,
        track: { grid_text: "A", title: "title" },
        zoom: 100,
        transpose: 0,
      }
    );
    expect(storage.existsInGallery("title", "foo")).to.be.true;
    expect(storage.existsInGallery("title", undefined)).to.be.true;
    expect(storage.existsInGallery("title", "title")).to.be.false;
    expect(storage.existsInGallery("other", "foo")).to.be.false;
    expect(storage.existsInGallery("other", "title")).to.be.false;
    expect(storage.existsInGallery("other", undefined)).to.be.false;
    storage.removeFromGallery("title");
  });

  it("exists in library (not empty) 2 ", () => {
    localStorage.clear();
    storage.addToGallery(
      { grid_text: "A", title: "title" },
      {
        ...st,
        version: STATE_VERSION,
        track: { grid_text: "A", title: "title" },
        zoom: 100,
        transpose: 0,
      }
    );
    storage.addToGallery(
      { grid_text: "A", title: "title2" },
      {
        ...st,
        version: STATE_VERSION,
        track: { grid_text: "A", title: "title2" },
        zoom: 100,
        transpose: 0,
      }
    );
    expect(storage.existsInGallery("title", "foo")).to.be.true;
    expect(storage.existsInGallery("title", undefined)).to.be.true;
    expect(storage.existsInGallery("title", "title")).to.be.false;
    expect(storage.existsInGallery("title", "title2")).to.be.true;
    expect(storage.existsInGallery("title2", "foo")).to.be.true;
    expect(storage.existsInGallery("title2", undefined)).to.be.true;
    expect(storage.existsInGallery("title2", "title")).to.be.true;
    expect(storage.existsInGallery("title2", "title2")).to.be.false;
    expect(storage.existsInGallery("other", "foo")).to.be.false;
    expect(storage.existsInGallery("other", "title")).to.be.false;
    expect(storage.existsInGallery("other", undefined)).to.be.false;
    storage.removeFromGallery("title");
    storage.removeFromGallery("title2");
  });

  it("add to synchronize index", () => {
    localStorage.clear();
    const track = storage.addToSynchronizedIndex({ grid_text: "A", title: "title2" }, "my_id");
    const id = storage.getSynchronizedIndex(track.id || "undef");
    expect(id).to.be.equal("my_id");
  });

  it("add to synchronize index with existing id", () => {
    localStorage.clear();
    const track = storage.addToSynchronizedIndex({ id: "my_song", grid_text: "A", title: "title2" }, "my_id");
    expect(track.id).to.be.equal("my_song");
    const id = storage.getSynchronizedIndex(track.id || "undef");
    expect(id).to.be.equal("my_id");
  });

  it("remove from synchronize index", () => {
    localStorage.clear();
    const track = storage.addToSynchronizedIndex({ grid_text: "A", title: "title2" }, "my_id");
    storage.removeFromSynchronizedIndex(track.id || "undef");
    const id = storage.getSynchronizedIndex(track.id || "undef");
    expect(id).to.be.undefined;
  });

  it("get extended index", () => {
    localStorage.clear();
    storage.addToGallery(
      { grid_text: "A", title: "title", id: "my_id" },
      {
        ...st,
        version: STATE_VERSION,
        track: { grid_text: "A", title: "title", id: "my_id" },
        zoom: 100,
        transpose: 0,
      }
    );

    storage.addToGallery(
      { grid_text: "A", title: "title_2", id: "my_id2" },
      {
        ...st,
        version: STATE_VERSION,
        track: { grid_text: "A", title: "title_2", id: "my_id2" },
        zoom: 100,
        transpose: 0,
      }
    );
    storage.addToSynchronizedIndex({ grid_text: "A", title: "title2", id: "my_id" }, "my_id");
    const dict = storage.galleryDictExtended();
    expect(dict).to.be.not.null;
    expect(dict["my_id"]).to.be.deep.equal({ title: "title", synchronized: true });
    expect(dict["my_id2"]).to.be.deep.equal({ title: "title_2", synchronized: false });
  });
});
