import { getUniqueKeyName } from './helpers';

export const filterRules = (stop, config, props, key) => {
    if (key.startsWith('melody') && key !== 'melody_audio_tracks') {
        props[key] = config[key];
        return props;
    }
    stop(props);
};

export const assembleBorders = (stop, config, props, key) => {
    switch (true) {

        case key.endsWith('border_width'): {
            const name = getUniqueKeyName(key, 'border_width');
            const { unit, top, right, bottom, left } = config[key];
            props[`${name}border_top_width`] = `${top}${unit}`;
            props[`${name}border_right_width`] = `${right}${unit}`;
            props[`${name}border_bottom_width`] = `${bottom}${unit}`;
            props[`${name}border_left_width`] = `${left}${unit}`;
            delete props[key];
            return props;
        }

        case key.endsWith('border_radius'): {
            const name = getUniqueKeyName(key, 'border_radius');
            const { unit, top, right, bottom, left } = config[key];
            props[`${name}border_top_left_radius`] = `${top}${unit}`;
            props[`${name}border_top_right_radius`] = `${right}${unit}`;
            props[`${name}border_bottom_right_radius`] = `${bottom}${unit}`;
            props[`${name}border_bottom_left_radius`] = `${left}${unit}`;
            delete props[key];
            return props;
        }

        default: {
            return props;
        }
    }
};

// @TODO: fix double box_shadow?
export const assembleBoxShadows = (stop, config, props, key) => {
    if (key.endsWith('box_shadow_box_shadow')) {
        const name = getUniqueKeyName(key, 'box_shadow_box_shadow');
        const position = config[`${name}box_shadow_box_shadow_position`] || '';
        const { blur, color, horizontal, spread, vertical } = config[key];
        props[`${name}box_shadow`] = `${horizontal}px ${vertical}px ${blur}px ${spread}px ${color} ${position}`;
        delete props[key];
    }

    if (key.endsWith('shadow_position')) {
        delete props[key];
    }

    if (key.endsWith('shadow_type')) {
        delete props[key];
    }

    return props;
};

export const assemblePaddings = (stop, config, props, key) => {
    if (key.endsWith('padding')) {
        const { top, left, right, bottom, unit } = config[key];
        const name = getUniqueKeyName(key, 'padding');
        props[`${name}padding_top`] = `${top}${unit}`;
        props[`${name}padding_bottom`] = `${bottom}${unit}`;
        props[`${name}padding_left`] = `${left}${unit}`;
        props[`${name}padding_right`] = `${right}${unit}`;
        delete props[key];
    }

    return props;
};

export const assembleQuantities = (stop, config, props, key) => {
    if (typeof config[key] === 'object' &&
        config[key].hasOwnProperty('size') &&
        config[key].hasOwnProperty('unit')) {
            const size = config[key].size;
            const unit = config[key].unit;
            props[key] = `${size}${unit}`;
        }

    return props;
};
