import { expect } from "@open-wc/testing";

import {
  add_to_gallery,
  exists_in_gallery,
  gallery_dict,
  gallery_list,
  get_from_gallery,
  remove_from_gallery,
} from "../gallery_tools";
import { STATE_VERSION } from "../../state";
import { state_test } from "../../../__tests__/TestHelpers";
import { uuid } from "../../../tools/uuid";

suite("Gallery tools", () => {
  const st = state_test;

  test("empty gallery", () => {
    localStorage.clear();
    expect(gallery_list()).to.deep.equal([]);
    expect(gallery_dict()).to.deep.equal({});
    expect(get_from_gallery("test")).to.be.null;
    remove_from_gallery("test");
    expect(gallery_dict()).to.deep.equal({});
    expect(gallery_list()).to.deep.equal([]);
    expect(get_from_gallery("test")).to.be.null;
  });

  test("tools for gallery", () => {
    localStorage.clear();
    expect(gallery_list()).to.deep.equal([]);
    expect(gallery_dict()).to.deep.equal({});
    expect(get_from_gallery("test")).to.be.null;

    const track = { id: uuid(), grid_text: "ee", title: "test" };
    add_to_gallery(track, { ...st, track });
    expect(gallery_list()).to.deep.equal(["test"]);
    expect(Object.values(gallery_dict())).to.deep.equal([track.title]);
    expect(Object.keys(gallery_dict())).to.deep.equal([track.id]);
    expect(get_from_gallery(track.id)).to.deep.equal({ ...st, track });
    expect(get_from_gallery(track.id)).to.deep.equal({ ...st, track });
    remove_from_gallery(track.id);
    expect(gallery_dict()).to.deep.equal({});
    expect(gallery_list()).to.deep.equal([]);
    expect(get_from_gallery("test")).to.be.null;
    expect(get_from_gallery(track.id)).to.be.null;
  });

  test("tools for gallery 002", () => {
    localStorage.clear();
    expect(gallery_list()).to.deep.equal([]);
    expect(gallery_dict()).to.deep.equal({});
    expect(get_from_gallery("test")).to.be.null;

    const track = { id: uuid(), grid_text: "zz", title: "test" };
    add_to_gallery(track, { ...st, track });
    expect(gallery_list()).to.deep.equal(["test"]);
    expect(get_from_gallery(track.id)).to.deep.equal({ ...st, track });
    remove_from_gallery(track.id);
    expect(localStorage.getItem(track.id)).to.be.null;
    expect(gallery_dict()).to.deep.equal({});
    expect(gallery_list()).to.deep.equal([]);
    expect(get_from_gallery("test")).to.be.null;
    expect(get_from_gallery(track.id)).to.be.null;
  });

  test("gallery with more than one element", () => {
    localStorage.clear();
    const track_a = { id: uuid(), grid_text: "aa", title: "test1" };
    const track_b = { id: uuid(), grid_text: "bb", title: "test2" };
    add_to_gallery(track_a, { ...st, track: track_a });
    add_to_gallery(track_b, { ...st, track: track_b });
    expect(Object.values(gallery_dict())).to.deep.equal([track_a.title, track_b.title]);
    expect(Object.keys(gallery_dict())).to.deep.equal([track_a.id, track_b.id]);
    expect(gallery_list()).to.deep.equal(["test1", "test2"]);
    expect(get_from_gallery(track_a.id)).to.deep.equal({
      ...st,
      track: track_a,
    });
    expect(get_from_gallery(track_b.id)).to.deep.equal({
      ...st,
      track: track_b,
    });

    remove_from_gallery("unknown_id");
    expect(gallery_list()).to.deep.equal(["test1", "test2"]);
    expect(Object.values(gallery_dict())).to.deep.equal([track_a.title, track_b.title]);
    expect(Object.keys(gallery_dict())).to.deep.equal([track_a.id, track_b.id]);
    expect(get_from_gallery(track_a.id)).to.deep.equal({
      ...st,
      track: track_a,
    });
    expect(get_from_gallery(track_b.id)).to.deep.equal({
      ...st,
      track: track_b,
    });

    remove_from_gallery(track_b.id);
    expect(gallery_list()).to.deep.equal(["test1"]);
    expect(get_from_gallery(track_a.id)).to.deep.equal({
      ...st,
      track: track_a,
    });
    expect(get_from_gallery(track_b.id)).to.be.null;

    remove_from_gallery(track_a.id);
    expect(gallery_list()).to.deep.equal([]);
    expect(gallery_dict()).to.deep.equal({});
    expect(get_from_gallery("test1")).to.be.null;
    expect(get_from_gallery("test2")).to.be.null;

    expect(get_from_gallery(track_a.id)).to.be.null;
    expect(get_from_gallery(track_b.id)).to.be.null;
  });

  test("multiple add", () => {
    localStorage.clear();
    const track = { id: uuid(), grid_text: "aa", title: "test1" };
    add_to_gallery(track, { ...st, track });
    expect(gallery_list()).to.deep.equal(["test1"]);
    expect(Object.values(gallery_dict())).to.deep.equal([track.title]);
    expect(Object.keys(gallery_dict())).to.deep.equal([track.id]);
    expect(get_from_gallery(track.id)).to.deep.equal({ ...st, track });

    track.grid_text = "bb";
    add_to_gallery(track, { ...st, track });
    expect(gallery_list()).to.deep.equal(["test1"]);
    expect(Object.values(gallery_dict())).to.deep.equal([track.title]);
    expect(Object.keys(gallery_dict())).to.deep.equal([track.id]);
    expect(get_from_gallery(track.id)).to.deep.equal({ ...st, track });

    track.title = "test2";
    add_to_gallery(track, { ...st, track });
    expect(gallery_list()).to.deep.equal(["test2"]);
    expect(Object.values(gallery_dict())).to.deep.equal([track.title]);
    expect(Object.keys(gallery_dict())).to.deep.equal([track.id]);
    expect(get_from_gallery(track.id)).to.deep.equal({ ...st, track });

    remove_from_gallery(track.id);
    expect(gallery_list()).to.deep.equal([]);
    expect(gallery_dict()).to.deep.equal({});
    expect(get_from_gallery(track.id)).to.be.null;
  });

  test("tools for gallery with IState", () => {
    localStorage.clear();
    expect(gallery_list()).to.deep.equal([]);
    expect(gallery_dict()).to.deep.equal({});
    expect(get_from_gallery("test")).to.be.null;

    const state = {
      ...st,
      version: STATE_VERSION,
      track: { grid_text: "A", title: "title" },
      zoom: 100,
      transpose: 0,
    };
    const new_state = add_to_gallery(state.track, state);
    expect(new_state.track?.id).to.not.be.undefined;
    const new_st = get_from_gallery(new_state.track?.id || "");
    expect(new_st).to.deep.equal(new_state);
    remove_from_gallery(new_state.track?.id || "");
  });

  test("exists in library (empty)", () => {
    localStorage.clear();
    expect(exists_in_gallery("title", "foo")).to.be.false;
    expect(exists_in_gallery("title", undefined)).to.be.false;
  });

  test("exists in library (not empty) ", () => {
    localStorage.clear();
    add_to_gallery(
      { grid_text: "A", title: "title" },
      {
        ...st,
        version: STATE_VERSION,
        track: { grid_text: "A", title: "title" },
        zoom: 100,
        transpose: 0,
      }
    );
    expect(exists_in_gallery("title", "foo")).to.be.true;
    expect(exists_in_gallery("title", undefined)).to.be.true;
    expect(exists_in_gallery("title", "title")).to.be.false;
    expect(exists_in_gallery("other", "foo")).to.be.false;
    expect(exists_in_gallery("other", "title")).to.be.false;
    expect(exists_in_gallery("other", undefined)).to.be.false;
    remove_from_gallery("title");
  });

  test("exists in library (not empty) 2 ", () => {
    localStorage.clear();
    add_to_gallery(
      { grid_text: "A", title: "title" },
      {
        ...st,
        version: STATE_VERSION,
        track: { grid_text: "A", title: "title" },
        zoom: 100,
        transpose: 0,
      }
    );
    add_to_gallery(
      { grid_text: "A", title: "title2" },
      {
        ...st,
        version: STATE_VERSION,
        track: { grid_text: "A", title: "title2" },
        zoom: 100,
        transpose: 0,
      }
    );
    expect(exists_in_gallery("title", "foo")).to.be.true;
    expect(exists_in_gallery("title", undefined)).to.be.true;
    expect(exists_in_gallery("title", "title")).to.be.false;
    expect(exists_in_gallery("title", "title2")).to.be.true;
    expect(exists_in_gallery("title2", "foo")).to.be.true;
    expect(exists_in_gallery("title2", undefined)).to.be.true;
    expect(exists_in_gallery("title2", "title")).to.be.true;
    expect(exists_in_gallery("title2", "title2")).to.be.false;
    expect(exists_in_gallery("other", "foo")).to.be.false;
    expect(exists_in_gallery("other", "title")).to.be.false;
    expect(exists_in_gallery("other", undefined)).to.be.false;
    remove_from_gallery("title");
    remove_from_gallery("title2");
  });
});
