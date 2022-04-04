import { expect } from "@open-wc/testing";
import { googleApiWrapper } from "../google-api";
import sinon from "sinon";
import { synchronizer } from "../synchronizer";
import { IStateTrack } from "../../../../stores/state";
import { stateTest } from "../../../../__tests__/TestHelpers";
import { storage } from "../../../../stores/register/gallery_tools";

describe("synchronize tools", () => {
  const stub = sinon.stub(googleApiWrapper);

  it("upload", async () => {
    stub.saveSong.returns(Promise.resolve("gid"));
    const track: IStateTrack = { grid_text: "A", title: "title2" };
    const result = await synchronizer.upload(track);
    expect(result).to.be.deep.equal(result);
    const id = storage.getSynchronizedIndex(track.id || "undef");
    expect(id).to.be.equal("gid");
  });

  it("upload already uploaded", async () => {
    const track = storage.addToSynchronizedIndex({ grid_text: "A", title: "title2" }, "my_id");
    stub.updateSong.returns(Promise.resolve(storage.getSynchronizedIndex(track.id || "undef") || "undef"));
    const result = await synchronizer.upload(track);
    expect(result).to.be.deep.equal(result);
    const id = storage.getSynchronizedIndex(track.id || "undef");
    expect(id).to.be.equal("my_id");
  });

  it("download", async () => {
    localStorage.clear();
    stub.listFiles.returns(
      Promise.resolve([
        {
          id: "remote_id",
          track: { id: "my_id", grid_text: "A", title: "title2" },
        },
      ])
    );
    const count = await synchronizer.download(stateTest);
    expect(count).to.be.equal(1);
    expect(storage.galleryDict()).to.be.deep.equal({ my_id: "title2" });
  });

  it("delete", async () => {
    localStorage.clear();
    stub.saveSong.returns(Promise.resolve("gid"));
    stub.delete.returns(Promise.resolve());
    const track: IStateTrack = { grid_text: "A", title: "title2" };
    const result = await synchronizer.upload(track);
    expect(result).to.be.deep.equal(result);
    let id = storage.getSynchronizedIndex(track.id || "undef");
    expect(id).to.be.equal("gid");

    await synchronizer.remove(track.id || "undef");
    id = storage.getSynchronizedIndex(track.id || "undef");
    expect(id).to.be.undefined;
  });
});
