import "./ui/editor-main";

import init from "./init";
import registerCallbacks from "./stores/register_callbacks";
import { html, render } from "lit";
import localize from "./tools/initLocale";
import { registerSW } from "virtual:pwa-register";

async function run(): Promise<void> {
  registerCallbacks();
  await init();
}

console.info("app version", __APP_VERSION__);

let main = document.querySelector("main");
if (!main) {
  main = document.createElement("main");
  document.body.appendChild(main);
}

(async () => {
  await localize();
  await run();
  render(html` <editor-main></editor-main> `, main);
})();

registerSW({});
