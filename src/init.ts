import { actionInitApp } from "./actions/actions";
import { connect, initializeState } from "./stores/dispatcher";
import { saveLastState } from "./stores/register/gallery_tools";
import { default_state } from "./stores/state";

export default async function init(): Promise<void> {
  initializeState(default_state());
  connect(saveLastState);
  await actionInitApp().catch((reason) => console.info("initialization failed", reason));
}
