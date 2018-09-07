import { prefixClasses } from '@utils/index';
import { MELODY_CUSTOMIZATION_CLASS_PREFIX as c_prefix } from '../../constants';

export const controlBar = prefixClasses(c_prefix, 'controlbar');

export const volume = prefixClasses(
    c_prefix,
    'vol-primary-color',
    'vol-hover-color',
    'vol-width',
);

export const controls = prefixClasses(
    c_prefix,
    'btn-primary-color',
    'btn-hover-color',
    'btn-space',
);

export const preview = prefixClasses(
    c_prefix,
    'preview-bg',
    'preview-min-height',
    'preview-padding',
);

export const slideshow = prefixClasses(
    c_prefix,
    'slider-transition',
    'slider-timing',
);

export const artwork = prefixClasses(
    c_prefix,
    'artwork-size',
    'artwork-repeat',
    'artwork-position',
    'artwork-attachment',
    'image-filters',
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

export const dockToggle = prefixClasses(
    c_prefix,
    'dock-toggle-color',
    'dock-toggle-size',
);
