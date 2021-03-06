const tracks = require('@tracks');
const trackSizes = require('@fixtures/track-sizes');
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

    it('should bail and return 0 if theres only one track', () => {
        const currentTrack = 0;
        const audioTracks = [{}];
        const result = utils.shuffleTracks(audioTracks, currentTrack);
        expect(result).toBe(0);
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

describe('prefixClasses()', () => {
    it('namespaces classes', () => {
        const prefixed = utils.prefixClasses('riverdog-', 'lol', 'rofl', 'ninja-kick');
        expect(prefixed).toEqual('riverdog-lol riverdog-rofl riverdog-ninja-kick');
    });
});

describe('getNextMachineAction()', () => {
    it('returns FAILED if the currentState doesnt map to an action', () => {
        const result = utils.getNextMachineAction('royal-purple');
        expect(result).toBe('FAILED');
    });

    it('returns NOOP if buffer', () => {
        const result = utils.getNextMachineAction('buffering');
        expect(result).toBe('NOOP');
    });

    it('returns STOP if playing', () => {
        const result = utils.getNextMachineAction('playing');
        expect(result).toBe('STOP');
    });

    it('returns PLAY if stopped', () => {
        const result = utils.getNextMachineAction('stopped');
        expect(result).toBe('PLAY');
    });
});

describe('cySelector()', () => {
    afterEach(() => {
        process.env.NODE_ENV = 'test';
    });

    it('returns a cy selector object if the current process is not production', () => {
        const result = utils.cySelector('lol');
        expect(result).toMatchObject({
            'data-cy': 'lol',
        });
    });

    it('returns a blank object if current process is production', () => {
        process.env.NODE_ENV = 'production';
        const result = utils.cySelector('lol');
        expect(result).toMatchObject({});
    });
});
