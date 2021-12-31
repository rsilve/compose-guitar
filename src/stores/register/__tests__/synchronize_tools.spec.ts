import { expect } from "@open-wc/testing";
import { add_to_synchronized_index, gallery_dict, get_synchronized_index } from "../gallery_tools";
import { googleApiWrapper } from "../google-api";
import sinon from "sinon";
import { synchronizer } from "../synchronizer";
import { state_test } from "../../../__tests__/TestHelpers";

suite("synchronize tools", () => {
  const stub = sinon.stub(googleApiWrapper);

  test("upload", async () => {
    stub.saveSong.returns(Promise.resolve("gid"));
    const track = { grid_text: "A", title: "title2" };
    const result = await synchronizer.upload(track);
    expect(result).to.be.deep.equal(result);
    const id = get_synchronized_index(track);
    expect(id).to.be.equal("gid");
  });

  test("upload already uploaded", async () => {
    const track = add_to_synchronized_index({ grid_text: "A", title: "title2" }, "my_id");
    stub.updateSong.returns(Promise.resolve(get_synchronized_index(track) || "undef"));
    const result = await synchronizer.upload(track);
    expect(result).to.be.deep.equal(result);
    const id = get_synchronized_index(track);
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
    await synchronizer.download(state_test);
    expect(gallery_dict()).to.be.deep.equal({ my_id: "title2" });
  });
});
