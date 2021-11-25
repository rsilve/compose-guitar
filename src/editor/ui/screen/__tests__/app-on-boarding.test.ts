import { expect, fixture, html } from "@open-wc/testing";

import AppOnBoarding from "../app-on-boarding";
import { register, reset_dispatcher } from "../../../../stores/dispatcher";
import { TRACK_NEW } from "../../../actions/actions";

suite("app on boarding element", () => {
  test("is defined", async () => {
    const el: AppOnBoarding = await fixture(html` <app-on-boarding></app-on-boarding> `);
    expect(el).to.instanceOf(AppOnBoarding);
    await expect(el).shadowDom.to.be.accessible();
    expect(el).shadowDom.to.be.equal(`
            <h1>Chords grid editor</h1>
            <h2>Your songs in a glance</h2>
            <p>Just write down your chord sequence and get a simple picture of your song.</p>
            <div class="example">
                    <pre>| E7 | A7 Adim | E7 | % |
| A7 | A7 | E7 | % |
| B7 | A7 | E7 | Bb7 B7 |</pre>
                <div style="font-size: 2em; padding: 2em;">➡︎</div>
                <chords-grid>
                    | E7 | A7 Adim | E7 | % |; | A7 | A7 | E7 | % |; | B7 | A7 | E7 | Bb7 B7 |;
                </chords-grid>
            </div>

            <button>Create your first chords grid</button>
        `);
  });

  test("is defined", async () => {
    reset_dispatcher();
    const promise = new Promise(resolve => {
      register((action, state) => {
        resolve(action.action_type === TRACK_NEW)
        return Promise.resolve(state);
      });

    })

    const el: AppOnBoarding = await fixture(html` <app-on-boarding></app-on-boarding> `);
    const node = el.shadowRoot?.querySelector("button") as HTMLElement;
    node.click();
    const clickHandle = await promise;
    expect(clickHandle).to.be.true;
  });
});
