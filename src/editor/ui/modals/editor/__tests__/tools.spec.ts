import {auto_correct, normalize} from "../tools";
import {expect} from "@open-wc/testing";

suite("tools normalize", () => {

    test("return text", () => {
        expect(normalize('A')).to.be.equal('A')
    })

    test("add space between A and |", () => {
        expect(normalize('A|')).to.be.equal('A |')
    })

    test("add space between | and A", () => {
        expect(normalize('|A')).to.be.equal('| A')
    })

    test("do not add space between : and |", () => {
        expect(normalize(':|')).to.be.equal(':|')
    })

    test("do not add space between | and :", () => {
        expect(normalize('|:')).to.be.equal('|:')
    })

    test("trim text", () => {
        expect(normalize(' A ')).to.be.equal('A')
    })

})

suite("tools auto_correct", () => {

    test("replace , by |", () => {
        expect(auto_correct(',')).to.be.equal('|')
    })


    test("capitalize first letter for chord", () => {
        expect(auto_correct('|a')).to.be.equal('|A')
    })


})
