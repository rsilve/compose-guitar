import "./TrackGallery";
import { register } from "../../stores/dispatcher";
import { galleryCallback, uploadCallback } from "./store";

register(galleryCallback);
register(uploadCallback);
