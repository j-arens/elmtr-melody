import { MELODY_CUSTOMIZATION_CLASS_PREFIX as c_prefix } from '@constants';
import { prefixClasses } from '@utils/index';

export const body = prefixClasses(
    c_prefix,
    'scrubber-body-bg-color',
);

export const backfill = prefixClasses(
    c_prefix,
    'scrubber-backfill-bg-color',
);

export const handle = prefixClasses(
    c_prefix,
    'scrubber-handle-bg-color',
);
