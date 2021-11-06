import {expect} from '@open-wc/testing'
import {connect, dispatch, init, register, reset_dispatcher, disconnect} from "../dispatcher";
import {Action} from "../../actions/Action";
import {state_test} from "../../__tests__/TestHelpers";
import {IState} from "../../editor/stores/state";

suite("Dispatcher", () => {

    const st = state_test

    test("init, connect, register, dispatch",  async () => {
        reset_dispatcher(st)
        let grid_text: string | undefined = "eee"
        init((state) => {
            const {track = {}} = state
            grid_text = track.grid_text
            state.track = {...track, grid_text: "rrr"}
        })
        expect(grid_text).to.equal("Em7 | A7")
        const connect_cb = ({track = {}}: IState) => {
            grid_text = track.grid_text
        }
        connect(connect_cb)
        register((action, state) => {
            const {new_text} = action.payload as {new_text: string}
            const {track = {}} = state
            track.grid_text = new_text
            return Promise.resolve({...state, track})
        })
        await dispatch(new Action("misc", {new_text: "test"}))
        expect(grid_text).to.equal("test")

        disconnect(connect_cb)
        await dispatch(new Action("misc", {new_text: "test2"}))
        expect(grid_text).to.equal("test")
    })

    test("error in register callback", () => {
        reset_dispatcher()
        let grid_text: string | undefined = "eee"
        connect(({track = {}}: IState) => {
            grid_text = track.grid_text
        })
        register((_action, state) => {
            const {track = {}} = state
            track.grid_text =  "eeeeee"
            return Promise.reject("error")
        })
        dispatch(new Action("misc", {new_text: "test"})).then(() => {
            expect(grid_text).to.be.null // should fail if called
        }).catch(reason => {
            expect(reason).to.equal("error")
        })

    })

})
