import { expect } from "@open-wc/testing";
import { connect, dispatch, init, register, resetDispatcher, disconnect } from "../dispatcher";
import Action from "../../actions/Action";
import { stateTest } from "../../__tests__/TestHelpers";
import { IState } from "../state";

describe("Dispatcher", () => {
  const st = stateTest;

  it("init, connect, register, dispatch", async () => {
    resetDispatcher(st);
    let grid_text: string | undefined = "eee";
    init((state) => {
      const { track = {} } = state;
      grid_text = track.grid_text;
      state.track = { ...track, grid_text: "rrr" };
    });
    expect(grid_text).to.equal("Em7 | A7");
    const connect_cb = ({ track = {} }: IState) => {
      grid_text = track.grid_text;
    };
    connect(connect_cb);
    register((action, state) => {
      const { new_text } = action.payload as { new_text: string };
      const { track = {} } = state;
      track.grid_text = new_text;
      return Promise.resolve({ ...state, track });
    });
    await dispatch(new Action("misc", { new_text: "test" }));
    expect(grid_text).to.equal("test");

    disconnect(connect_cb);
    await dispatch(new Action("misc", { new_text: "test2" }));
    expect(grid_text).to.equal("test");
  });

  it("error in register callback", () => {
    resetDispatcher();
    let grid_text: string | undefined = "eee";
    connect(({ track = {} }: IState) => {
      grid_text = track.grid_text;
    });
    register((_action, state) => {
      const { track = {} } = state;
      track.grid_text = "eeeeee";
      return Promise.reject("error");
    });
    dispatch(new Action("misc", { new_text: "test" }))
      .then(() => {
        expect(grid_text).to.be.null; // should fail if called
      })
      .catch((reason) => {
        expect(reason).to.equal("error");
      });
  });
});
