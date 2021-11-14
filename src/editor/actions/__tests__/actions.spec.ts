import {expect} from '@open-wc/testing'
import {register, reset_dispatcher} from "../../../stores/dispatcher";
import {
    action_gallery_close,
    action_gallery_open, action_gallery_remove,
    action_init_app, action_save_as_start, action_save_as_start_and_new,
    action_transpose_change,
    action_upload_from_gallery, GALLERY_CLOSE, GALLERY_OPEN, GALLERY_REMOVE,
    INIT_APP, SAVE_AS_START, SAVE_AS_START_AND_NEW,
    TRANSPOSE_CHANGE,
    UPLOAD_FROM_GALLERY
} from "../actions";
import {default_state} from "../../stores/state";

suite("actions", () => {

    test("transpose", async () => {
        let handle = 0
        reset_dispatcher(default_state())
        register(action => {
            if (action.action_type === TRANSPOSE_CHANGE) {
                const {transpose} = action.payload as { transpose: number }
                handle = transpose
            }
            return Promise.resolve({})
        })
        await action_transpose_change(2)
        expect(handle).to.be.equal(2)
    })

    test("init", async () => {
        let handle = false
        reset_dispatcher(default_state())
        register(action => {
            handle = action.action_type === INIT_APP
            return Promise.resolve({})
        })
        await action_init_app()
        expect(handle).to.be.true
    })

    test("upload_from_gallery", async () => {
        let handle = ''
        reset_dispatcher(default_state())
        register(action => {
            const {id = ''} = action.payload as { id: string }
            handle = action.action_type === UPLOAD_FROM_GALLERY ? id : ''
            return Promise.resolve({})
        })
        await action_upload_from_gallery('id')
        expect(handle).to.be.equal('id')
    })

    test("save_as_start", async () => {
        let handle = false
        reset_dispatcher(default_state())
        register(action => {
            handle = action.action_type === SAVE_AS_START
            return Promise.resolve({})
        })
        await action_save_as_start()
        expect(handle).to.be.true
    })

    test("save_as_start_and_new", async () => {
        let handle = false
        reset_dispatcher(default_state())
        register(action => {
            handle = action.action_type === SAVE_AS_START_AND_NEW
            return Promise.resolve({})
        })
        await action_save_as_start_and_new()
        expect(handle).to.be.true
    })

    test("gallery_open", async () => {
        let handle = false
        reset_dispatcher(default_state())
        register(action => {
            handle = action.action_type === GALLERY_OPEN
            return Promise.resolve({})
        })
        await action_gallery_open()
        expect(handle).to.be.true
    })

    test("gallery_gallery_remove", async () => {
        let handle = 'id'
        reset_dispatcher(default_state())
        register(action => {
            const {id = ''} = action.payload as { id: string }
            handle = action.action_type === GALLERY_REMOVE ? id : ''
            return Promise.resolve({})
        })
        await action_gallery_remove('id')
        expect(handle).to.be.equal('id')
    })

    test("gallery_gallery_close", async () => {
        let handle = false
        reset_dispatcher(default_state())
        register(action => {
            handle = action.action_type === GALLERY_CLOSE
            return Promise.resolve({})
        })
        await action_gallery_close()
        expect(handle).to.be.true
    })


})
