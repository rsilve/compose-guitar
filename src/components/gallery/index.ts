import "./TrackGallery";
import { register } from "../../lib/dispatcher";
import { galleryCallback, uploadCallback } from "./store";
import { openKey } from "./keyboard";

register(galleryCallback);
register(uploadCallback);

export const galleryOpenKey = openKey;
