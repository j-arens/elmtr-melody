import { GLOBAL } from './constants';
import { MediaFrame } from './type';

const { wp: { media } } = GLOBAL;

/**
 * Initialize a wp media picker for audio
 */
function initAudioFrame(): MediaFrame {
    return media({
        button: { test: 'Select' },
        states: [
            new media.controller.Library({
                title: 'Select Track',
                button: { text: 'Select Track' },
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
function initImageFrame(): MediaFrame {
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

export const audioFrame: MediaFrame = initAudioFrame();
export const imageFrame: MediaFrame = initImageFrame();