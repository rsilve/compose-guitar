import { state } from "lit/decorators.js";
import { LitElement } from "lit";

export default class extends LitElement {
  @state()
  fill: string | undefined;
}
