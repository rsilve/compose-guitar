import { connect, initializeState } from "../../lib/dispatcher";
import { default_state } from "../../lib/state";
import { actionInitApp } from "./actions";
import { storage } from "../../lib/gallery_tools";

export default async function initApp(): Promise<void> {
  initializeState(default_state());
  connect(storage.saveLastState);
  await actionInitApp().catch((reason) => console.info("initialization failed", reason));
}
