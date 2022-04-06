import Action from "../../lib/Action";
import { publishAction } from "../../lib/publish_action";

export const ZOOM_CHANGE = "ZOOM_CHANGE";
export const actionZoomChange = (zoom: number): void => {
  publishAction(new Action(ZOOM_CHANGE, { zoom }));
};
