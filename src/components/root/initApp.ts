import { storage } from "../../stores/register/gallery_tools";
import { connect, initializeState } from "../../stores/dispatcher";
import { default_state } from "../../stores/state";
import { actionInitApp } from "./actions";

export default async function initApp(): Promise<void> {
  initializeState(default_state());
  connect(storage.saveLastState);
  await actionInitApp().catch((reason) => console.info("initialization failed", reason));
}
