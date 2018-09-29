import * as helpers from '../helpers';

describe('normalizeOffset()', () => {
    it('returns 100 if offset is greater than 100', () => {
        expect(helpers.normalizeOffset(105)).toBe(100);
    });

    it('returns 0 if offset is less than 0', () => {
        expect(helpers.normalizeOffset(-2)).toBe(0);
    });
});

describe('getNewTime()', () => {
    it('converts a percent offset into the equivlant track time in seconds', () => {
        const duration = 10;
        const offset = 50;
        expect(helpers.getNewTime(offset, duration)).toBe(5);
    });
});
