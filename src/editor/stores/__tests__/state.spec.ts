import {expect} from '@open-wc/testing'
import {default_state, STATE_VERSION} from "../state";


suite("State", () => {

    test("init",  () => {
        const st = default_state()
        expect(st).to.deep.equal({
            version: STATE_VERSION,
            zoom: 100,
            transpose: 0,
        })
    })

})
