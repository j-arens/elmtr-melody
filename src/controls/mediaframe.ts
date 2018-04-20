import { GLOBAL } from './constants';
import { Mediaframe } from './type';

const { wp: { media } } = GLOBAL;

/**
 * Initialize a wp media picker for audio
 */
export function makeAudioframe(): Mediaframe {
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
export function makeImageframe(): Mediaframe {
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
