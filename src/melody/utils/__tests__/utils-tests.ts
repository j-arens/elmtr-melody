const tracks = require('@tracks');
const trackSizes = require('@track-sizes');
import * as utils from '../';

describe('getRandomNumberInRange()', () => {
    it('should return a number within the specefied range', () => {
        const min = 1;
        const max = 3;
        const result = utils.getRandomNumInRange(min, max);
        expect(result).toBeGreaterThan(0);
        expect(result).toBeLessThan(4);
    });
});

describe('formatTime()', () => {
    it('should format time', () => {
        const time = 808;
        const result = utils.formatTime(time);
        expect(result).toBe('13:28');
    });
});

describe('shuffleTracks()', () => {
    it('should return a random index within the given range that is not equal to currentTrack', () => {
        const currentTrack = 1;
        const result = utils.shuffleTracks(tracks, currentTrack);
        expect(result).not.toBe(1);
        expect(result).toBeGreaterThan(-1);
        expect(result).toBeLessThan(tracks.length + 1);
    });
});

describe('timeout()', () => {
    it('should invoke callback after 0.1 seconds', () => {
        const callback = jest.fn();
        utils.timeout(1, callback);
        setTimeout(() => expect(callback).toHaveBeenCalled(), 2);
    });

    it('should stop timer if cleared', () => {
        const callback = jest.fn();
        const clear = utils.timeout(1, callback);
        clear();
        expect(callback).not.toHaveBeenCalled();
    });
});

describe('getContextualTrackSizes()', () => {
    it('filters out sizes that are larger than the viewport width', () => {
        global.innerWidth = 900;
        const sizes = utils.getContextualTrackSizes(trackSizes);
        expect(sizes[0].width).toBeLessThan(global.innerWidth);
    });

    it('sorts filtered sizes in DESC order', () => {
        global.innerWidth = 500;
        const sizes = utils.getContextualTrackSizes(trackSizes);
        expect(sizes[1].width).toBeLessThan(sizes[0].width);
        expect(sizes[2].width).toBeLessThan(sizes[1].width);
    });

    it('returns empty array if there are no sizes within the viewport width', () => {
        global.innerWidth = 0;
        const sizes = utils.getContextualTrackSizes(trackSizes);
        expect(sizes.length).toBe(0);
    });
});
