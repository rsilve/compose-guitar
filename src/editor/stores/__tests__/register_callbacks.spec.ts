import { expect } from '@open-wc/testing';
import register_callbacks from '../register_callbacks';
import { registered } from '../../../stores/dispatcher';
import { init_app_callback, transpose_change_callback, zoom_change_callback } from '../register/misc';
import { gallery_callback } from '../register/gallery';
import { save_as_callback } from '../register/save_as';
import { upload_callback } from '../register/upload';
import { notification_callback } from '../register/notification';
import { track_callback } from '../register/track';

suite('Register', () => {
  test('init', () => {
    register_callbacks();
    expect(registered(init_app_callback)).to.be.true;
    expect(registered(gallery_callback)).to.be.true;
    expect(registered(save_as_callback)).to.be.true;
    expect(registered(upload_callback)).to.be.true;
    expect(registered(notification_callback)).to.be.true;
    expect(registered(zoom_change_callback)).to.be.true;
    expect(registered(track_callback)).to.be.true;
    expect(registered(transpose_change_callback)).to.be.true;
  });
});
