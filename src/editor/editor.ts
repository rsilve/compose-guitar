import "./ui/editor-main";

import init from "./init";
import register_callbacks from "./stores/register_callbacks";

function run(): void {
  register_callbacks();
  init();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").then(
        (registration) => {
          // Registration was successful
          console.log(
            "ServiceWorker registration successful with scope: ",
            registration.scope
          );
        },
        (err) => {
          // registration failed :(
          console.log("ServiceWorker registration failed: ", err);
        }
      );
    });
  }
}

run();
