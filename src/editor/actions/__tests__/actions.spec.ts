import {expect} from '@open-wc/testing'
import {register, reset_dispatcher} from "../../../stores/dispatcher";
import {action_transpose_change, TRANSPOSE_CHANGE} from "../actions";
import {default_state} from "../../stores/state";

suite("actions", () => {

    test("transpose", async () => {
        let handle = 0
        reset_dispatcher(default_state())
        register(action => {
            if (action.action_type === TRANSPOSE_CHANGE)
                handle = 2
            return Promise.resolve({})
        })
        action_transpose_change(2)
        expect(handle).to.be.equal(2)
    })


})
