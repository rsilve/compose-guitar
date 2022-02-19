import { expect, fixture, html } from "@open-wc/testing";

import AppOnBoarding from "../app-on-boarding";
import { register, resetDispatcher } from "../../../stores/dispatcher";
import { TRACK_NEW } from "../../../actions/actions";

describe("app on boarding element", () => {
  it("is defined", async () => {
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

  it("is defined", async () => {
    resetDispatcher();
    const promise = new Promise((resolve) => {
      register((action, state) => {
        resolve(action.actionType === TRACK_NEW);
        return Promise.resolve(state);
      });
    });

    const el: AppOnBoarding = await fixture(html` <app-on-boarding></app-on-boarding> `);
    const node = el.shadowRoot?.querySelector("button") as HTMLElement;
    node.click();
    const clickHandle = await promise;
    expect(clickHandle).to.be.true;
  });
});
