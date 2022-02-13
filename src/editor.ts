import "./ui/editor-main";

import init from "./init";
import register_callbacks from "./stores/register_callbacks";
import { html, render } from "lit";
import localize from "./tools/initLocale";
import { registerSW } from "virtual:pwa-register";

function run(): void {
  register_callbacks();
  init();
}

const main = document.querySelector("main")!;

(async () => {
  await localize();
  render(html` <editor-main></editor-main> `, main);
  run();
})();

registerSW({});
