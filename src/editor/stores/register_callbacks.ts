import { register } from '../../stores/dispatcher';
import { init_app_callback, transpose_change_callback, zoom_change_callback } from './register/misc';
import { gallery_callback } from './register/gallery';
import { save_as_callback } from './register/save_as';
import { upload_callback } from './register/upload';
import { notification_callback } from './register/notification';
import { track_callback } from './register/track';
import { help_callback } from './register/help';

export default function register_callbacks(): void {
  register(init_app_callback);
  register(gallery_callback);
  register(save_as_callback);
  register(upload_callback);
  register(notification_callback);
  register(zoom_change_callback);
  register(track_callback);
  register(help_callback);
  register(transpose_change_callback);
}
