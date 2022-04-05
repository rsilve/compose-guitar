import { storage } from "../../lib/register/gallery_tools";
import { connect, initializeState } from "../../lib/dispatcher";
import { default_state } from "../../lib/state";
import { actionInitApp } from "./actions";

export default async function initApp(): Promise<void> {
  initializeState(default_state());
  connect(storage.saveLastState);
  await actionInitApp().catch((reason) => console.info("initialization failed", reason));
}
