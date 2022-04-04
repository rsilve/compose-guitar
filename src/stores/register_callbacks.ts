import { initAppCallback } from "./register/misc";
import { register } from "./dispatcher";

export default function registerCallbacks(): void {
  register(initAppCallback);
}
