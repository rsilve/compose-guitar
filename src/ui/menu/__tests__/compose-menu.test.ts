import { expect, fixture, html } from "@open-wc/testing";
import Menu from "../Menu";
import { register, reset_dispatcher } from "../../../stores/dispatcher";
import { GALLERY_OPEN, SAVE_AS_START, TRACK_NEW } from "../../../actions/actions";

suite("Menu element", () => {
  test("is defined", async () => {
    const el: Menu = await fixture(html` <compose-menu></compose-menu>`);
    expect(el).to.instanceOf(Menu);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
            <menu-item title="save the track - Ctrl+s" class="_save" ontouchstart="">
                <save-icon/>
            </menu-item>
            <menu-item title="Open the Library - Ctrl+l" class="_library" ontouchstart="">
                <gallery-icon/>
            </menu-item>
            <menu-item title="new track - Ctrl+n" class="_new" ontouchstart="">
                <new-track-icon/>
            </menu-item>
        `);
  });

  test("click save", async () => {
    reset_dispatcher();
    let click_handled = false;
    register((action, state) => {
      click_handled = action.actionType === SAVE_AS_START;
      return Promise.resolve(state);
    });
    const el: Menu = await fixture(html` <compose-menu></compose-menu>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._save") as HTMLElement;
    node.click();
    expect(click_handled).to.be.true;
  });

  test("click library", async () => {
    reset_dispatcher();
    let click_handled = false;
    register((action, state) => {
      click_handled = action.actionType === GALLERY_OPEN;
      return Promise.resolve(state);
    });
    const el: Menu = await fixture(html` <compose-menu></compose-menu>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._library") as HTMLElement;
    node.click();
    expect(click_handled).to.be.true;
  });

  test("click new", async () => {
    reset_dispatcher();
    let click_handled = false;
    register((action, state) => {
      click_handled = action.actionType === TRACK_NEW;
      return Promise.resolve(state);
    });
    const el: Menu = await fixture(html` <compose-menu></compose-menu>`);
    await expect(el).shadowDom.to.be.accessible();
    const node = el.shadowRoot?.querySelector("._new") as HTMLElement;
    node.click();
    expect(click_handled).to.be.true;
  });
});
