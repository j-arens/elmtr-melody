export const normalizeOffset = (offset: number): number => {
    if (offset > 100) {
        return 100;
    }
    if (offset < 0) {
        return 0;
    }
    return offset;
};

export const getNewTime = (offset: number, duration: number): number =>
    (normalizeOffset(offset) * duration) / 100;
