import { prefixClasses } from '@utils/index';
import { MELODY_CUSTOMIZATION_CLASS_PREFIX as c_prefix } from '../../constants';

export const toolbar = prefixClasses(c_prefix, 'toolbar');
export const trackInfoInner = prefixClasses(c_prefix, 'trackinfo-margin');
export const seperator = prefixClasses(c_prefix, 'separator');

export const primaryBtns = prefixClasses(
    c_prefix,
    'btn-primary-color',
    'btn-hover-color',
    'btn-width',
    'btn-space',
);

export const trackInfo = prefixClasses(
    c_prefix,
    'preview-padding',
    'trackinfo-width',
    'trackinfo-order',
);

export const shuffleRepeatBtns = prefixClasses(
    c_prefix,
    'btn-primary-color',
    'btn-hover-color',
    'btn-on-color',
    'btn-width',
    'btn-space',
);

export const dockToggle = prefixClasses(
    c_prefix,
    'btn-primary-color',
    'btn-hover-color',
    'btn-width',
    'btn-space',
);

export const volume = prefixClasses(
    c_prefix,
    'btn-primary-color',
    'btn-width',
    'btn-space',
);

export const title = prefixClasses(
    c_prefix,
    'title-font',
    'title-shadow',
    'title-color',
);

export const artist = prefixClasses(
    c_prefix,
    'artist-font',
    'artist-shadow',
    'artist-color',
);

export const time = prefixClasses(
    c_prefix,
    'time-font',
    'time-shadow',
    'time-color',
);
