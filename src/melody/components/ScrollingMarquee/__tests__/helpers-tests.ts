import { SCROLL_INTERVAL } from '../';
import * as helpers from '../helpers';

describe('calculateDimensions()', () => {
    let el;

    beforeEach(() => {
        el = {
            offsetWidth: 50,
            scrollWidth: 100,
        };
    });

    it('calculates the percentage difference between width and scroll width', () => {
        const result = helpers.calculateDimensions(el);
        expect(result.overlapTarget).toBe(100);
    });

    it('returns recordedWidth', () => {
        const result = helpers.calculateDimensions(el);
        expect(result.recordedWidth).toBe(50);
    });
});

describe('canScroll()', () => {
    it('checks if a new scroll can happen', () => {
        const can = helpers.canScroll({ scrolling: false, overlapTarget: 1 });
        const cant1 = helpers.canScroll({ scrolling: true, overlapTarget: 1 });
        const cant2 = helpers.canScroll({ scrolling: false, overlapTarget: 0 });
        expect(can).toBe(true);
        expect(cant1).toBe(false);
        expect(cant2).toBe(false);
    });
});

describe('didResize', () => {
    it('checks if an element resized', () => {
        const el = { offsetWidth: 100 };
        const result = helpers.didResize(el, { recordedWidth: 99 });
        expect(result).toBe(true);
    });
});

describe('getScrollStatus()', () => {
    let state;

    beforeEach(() => {
        state = {
            offset: 0,
            overlapTarget: 100,
            direction: 'left',
        };
    });

    it('checks if the scroll has reached the left limit', () => {
        state.offset = 100;
        const result = helpers.getScrollStatus(state);
        expect(result).toBe(helpers.ScrollStatus.LIMIT_LEFT);
    });

    it('checks if the scroll has reach the right limit', () => {
        state.direction = 'right';
        const result = helpers.getScrollStatus(state);
        expect(result).toBe(helpers.ScrollStatus.LIMIT_RIGHT);
    });

    it('checks if the scroll is within range', () => {
        state.offset = 50;
        const result = helpers.getScrollStatus(state);
        expect(result).toBe(helpers.ScrollStatus.IN_RANGE);
    });
});

describe('getNextOffset()', () => {
    let state;

    beforeEach(() => {
        state = {
            direction: 'left',
            offset: 1,
        };
    });

    it('increments the offset', () => {
        const result = helpers.getNextOffset(state);
        expect(result).toBe(2);
    });

    it('decrements the offset', () => {
        state.direction = 'right';
        const result = helpers.getNextOffset(state);
        expect(result).toBe(0);
    });
});

describe('getScrollStyles()', () => {
    let state;

    beforeEach(() => {
        state = {
            scrolling: true,
            overlapTarget: 100,
            offset: 25,
        };
    });

    it('returns no styles if not scrolling or no overlapTarget', () => {
        state.scrolling = false;
        const result1 = helpers.getScrollStyles(state);
        state.scrolling = true;
        state.overlapTarget = 0;
        const result2 = helpers.getScrollStyles(state);
        expect(Object.entries(result1).length).toBe(0);
        expect(Object.entries(result2).length).toBe(0);
    });

    it('returns valid scroll styles', () => {
        const result = helpers.getScrollStyles(state);
        expect(result.transform).toBe('translate3d(-25%, 0, 0)');
        expect(result.transition).toBe(`transform ${SCROLL_INTERVAL}ms linear`);
    });
});
