import "./ui/editor-main";

import init from "./init";
import register_callbacks from "./stores/register_callbacks";

function run(): void {
  register_callbacks();
  init();
}

run();
