import { GLOBAL } from './constants';
import { Mediaframe } from './type';

const { wp: { media } } = GLOBAL;

/**
 * Initialize a wp media picker for audio
 */
function initAudioframe(): Mediaframe {
    return media({
        button: { text: 'Select Track' },
        states: [
            new media.controller.Library({
                title: 'Select Track',
                library: media.query({ type: 'audio' }),
                multiple: false,
                date: false,
                autoSelect: false,
            }),
        ],
    });
}

/**
 * Initialize a wp media picker for images
 */
function initImageframe(): Mediaframe {
    return media({
        button: { text: 'Select' },
        states: [
            new media.controller.Library({
                title: 'Select Artwork',
                button: { text: 'Select Artwork' },
                library: media.query({ type: 'image' }),
                multiple: false,
                date: false,
                autoSelect: false,
            }),
        ],
    });
}

export const audioframe: Mediaframe = initAudioframe();
export const imageframe: Mediaframe = initImageframe();
