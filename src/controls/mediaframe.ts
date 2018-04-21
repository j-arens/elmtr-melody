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
