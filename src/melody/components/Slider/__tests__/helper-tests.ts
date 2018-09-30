import * as helpers from '../helpers';

describe('getHandlePlacement()', () => {
    it('correctly translates the position of the handle based on the given offset', () => {
        const sliderWidth = 100;
        const handleWidth = 10;
        const offset = 50;
        const result = helpers.getHandlePlacement(sliderWidth, handleWidth, offset);
        expect(result.transform).toBe('translate3d(520%, 0, 0)');
    });
});

describe('getNextOffset()', () => {
    it('converts clientX/pageX coord into a percent', () => {
        const dims = { width: 100, left: 0 };
        const x = 50;
        const result = helpers.getNextOffset(x, dims);
        expect(result).toBe(50);
    });
});
