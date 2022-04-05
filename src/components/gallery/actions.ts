import { publishAction } from "../../lib/publish_action";
import Action from "../../lib/Action";

export const UPLOAD_FROM_GALLERY = "UPLOAD_FROM_GALLERY";
export const actionUploadFromGallery = (id: string): Promise<void> =>
  publishAction(new Action(UPLOAD_FROM_GALLERY, { id }));

export const GALLERY_OPEN = "GALLERY_OPEN";
export const actionGalleryOpen = (): void => {
  publishAction(new Action(GALLERY_OPEN));
};

export const GALLERY_REMOVE = "GALLERY_REMOVE";
export const actionGalleryRemove = (id: string): Promise<void> => {
  return publishAction(new Action(GALLERY_REMOVE, { id }));
};

export const GALLERY_CLOSE = "GALLERY_CLOSE";
export const actionGalleryClose = (): void => {
  publishAction(new Action(GALLERY_CLOSE));
};
