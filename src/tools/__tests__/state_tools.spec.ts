import { expect } from "@open-wc/testing";
import { saveNeeded } from "../state_tools";

describe("state tool", () => {
  it("need_save undefined", () => {
    const need_save = saveNeeded();
    expect(need_save).to.be.false;
  });

  it("need_save no saved_at no update_at", () => {
    const need_save = saveNeeded({});
    expect(need_save).to.be.false;
  });

  it("need_save no saved_at update_at", () => {
    const need_save = saveNeeded({ updated_at: "2021-07-07T18:32:10.582Z" });
    expect(need_save).to.be.true;
  });

  it("need_save saved_at == update_at", () => {
    const need_save = saveNeeded({
      saved_at: "2021-07-07T18:32:10.582Z",
      updated_at: "2021-07-07T18:32:10.582Z",
    });
    expect(need_save).to.be.false;
  });

  it("need_save saved_at >  update_at", () => {
    const need_save = saveNeeded({
      saved_at: "2021-07-07T19:32:10.582Z",
      updated_at: "2021-07-07T18:32:10.582Z",
    });
    expect(need_save).to.be.false;
  });

  it("need_save saved_at < update_at", () => {
    const need_save = saveNeeded({
      saved_at: "2021-07-07T17:32:10.582Z",
      updated_at: "2021-07-07T18:32:10.582Z",
    });
    expect(need_save).to.be.true;
  });

  it("need_save invalid saved_at  update_at", () => {
    const need_save = saveNeeded({
      saved_at: "toto",
      updated_at: "2021-07-07T18:32:10.582Z",
    });
    expect(need_save).to.be.false;
  });
});
