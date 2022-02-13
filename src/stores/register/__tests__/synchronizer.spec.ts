import { expect } from "@open-wc/testing";
import { addToSynchronizedIndex, galleryDict, getSynchronizedIndex } from "../gallery_tools";
import { googleApiWrapper } from "../google-api";
import sinon from "sinon";
import { synchronizer } from "../synchronizer";
import { stateTest } from "../../../__tests__/TestHelpers";
import { IStateTrack } from "../../state";

suite("synchronize tools", () => {
  const stub = sinon.stub(googleApiWrapper);

  test("upload", async () => {
    stub.saveSong.returns(Promise.resolve("gid"));
    const track: IStateTrack = { grid_text: "A", title: "title2" };
    const result = await synchronizer.upload(track);
    expect(result).to.be.deep.equal(result);
    const id = getSynchronizedIndex(track.id || "undef");
    expect(id).to.be.equal("gid");
  });

  test("upload already uploaded", async () => {
    const track = addToSynchronizedIndex({ grid_text: "A", title: "title2" }, "my_id");
    stub.updateSong.returns(Promise.resolve(getSynchronizedIndex(track.id || "undef") || "undef"));
    const result = await synchronizer.upload(track);
    expect(result).to.be.deep.equal(result);
    const id = getSynchronizedIndex(track.id || "undef");
    expect(id).to.be.equal("my_id");
  });

  test("download", async () => {
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
    expect(galleryDict()).to.be.deep.equal({ my_id: "title2" });
  });

  test("delete", async () => {
    localStorage.clear();
    stub.saveSong.returns(Promise.resolve("gid"));
    stub.delete.returns(Promise.resolve());
    const track: IStateTrack = { grid_text: "A", title: "title2" };
    const result = await synchronizer.upload(track);
    expect(result).to.be.deep.equal(result);
    let id = getSynchronizedIndex(track.id || "undef");
    expect(id).to.be.equal("gid");

    await synchronizer.remove(track.id || "undef");
    id = getSynchronizedIndex(track.id || "undef");
    expect(id).to.be.undefined;
  });
});
