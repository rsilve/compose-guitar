import { publishAction } from "../../actions/publish_action";
import Action from "../../actions/Action";

export const ZOOM_CHANGE = "ZOOM_CHANGE";
export const actionZoomChange = (zoom: number): void => {
  publishAction(new Action(ZOOM_CHANGE, { zoom }));
};
