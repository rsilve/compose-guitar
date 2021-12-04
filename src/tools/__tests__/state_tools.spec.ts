import { expect } from "@open-wc/testing";
import { save_needed } from "../state_tools";

suite("state tool", () => {
  test("need_save undefined", () => {
    const need_save = save_needed();
    expect(need_save).to.be.false;
  });

  test("need_save no saved_at no update_at", () => {
    const need_save = save_needed({});
    expect(need_save).to.be.false;
  });

  test("need_save no saved_at update_at", () => {
    const need_save = save_needed({ updated_at: "2021-07-07T18:32:10.582Z" });
    expect(need_save).to.be.true;
  });

  test("need_save saved_at == update_at", () => {
    const need_save = save_needed({
      saved_at: "2021-07-07T18:32:10.582Z",
      updated_at: "2021-07-07T18:32:10.582Z",
    });
    expect(need_save).to.be.false;
  });

  test("need_save saved_at >  update_at", () => {
    const need_save = save_needed({
      saved_at: "2021-07-07T19:32:10.582Z",
      updated_at: "2021-07-07T18:32:10.582Z",
    });
    expect(need_save).to.be.false;
  });

  test("need_save saved_at < update_at", () => {
    const need_save = save_needed({
      saved_at: "2021-07-07T17:32:10.582Z",
      updated_at: "2021-07-07T18:32:10.582Z",
    });
    expect(need_save).to.be.true;
  });

  test("need_save invalid saved_at  update_at", () => {
    const need_save = save_needed({
      saved_at: "toto",
      updated_at: "2021-07-07T18:32:10.582Z",
    });
    expect(need_save).to.be.false;
  });
});