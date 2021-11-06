import {expect} from '@open-wc/testing'
import {NOTIFICATION_OPEN, SAVE_AS_START, SAVE_AS_START_AND_NEW} from "../../../actions/actions";
import {save_as_callback} from "../save_as";
import {get_from_gallery} from "../gallery_tools";
import {IState} from "../../state";
import {state_test} from "../../../../__tests__/TestHelpers";
import {connect, register} from "../../../../stores/dispatcher";
import {Action} from "../../../../actions/Action";

suite("Register save_as", () => {

    const st = state_test

    test("save as start", async () => {
        let action_notification_open_send = false
        register((action, state): Promise<IState> => {
            action_notification_open_send = action.action_type === NOTIFICATION_OPEN
            return Promise.resolve(state)
        })
        const promise = new Promise<void>(resolve => {
            connect(() => {
                resolve()
            })
        })

        await save_as_callback(new Action(SAVE_AS_START), {...st});
        const fromGallery = get_from_gallery("title");
        await promise
        expect(fromGallery).to.deep.equal(st)
        expect(action_notification_open_send).to.be.true
    })

    test("save as start and new", async () => {
        let action_notification_open_send = false
        register((action: Action, state: IState): Promise<IState> => {
            action_notification_open_send = action.action_type === NOTIFICATION_OPEN
            return Promise.resolve(state)
        })
        const promise = new Promise<void>(resolve => {
            connect(() => {
                resolve()
            })
        })
        const state = await save_as_callback(new Action(SAVE_AS_START_AND_NEW), {...st, transpose: 0});
        const fromGallery = get_from_gallery("title");
        await promise
        expect(fromGallery).to.deep.equal(st)
        expect(action_notification_open_send).to.be.true
        expect(state.editor).not.to.be.undefined
        expect(state.confirm_save).to.be.undefined
        expect(state.transpose).to.be.equal(0)
    })

})
