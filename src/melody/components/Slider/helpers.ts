import { HandleOffsetStyle, SliderOrientation } from './type';

export const getHandlePlacement = (
    sliderArea: number,
    handleSize: number,
    offset: number,
): HandleOffsetStyle => {
    const placement = (sliderArea / handleSize) * offset;
    return {
        transform: `translate3d(${placement}%, 0, 0)`,
        right: `calc(100% - ${handleSize / 2}px)`,
    };
};

export const getNextOffset = (
    delta: number,
    base: number,
    area: number,
    orientation: SliderOrientation,
): number => {
    const offset = ((delta - base) / area) * 100;
    if (orientation === 'vertical') {
        return offset < 0 ? Math.abs(offset) : -Math.abs(offset);
    }
    return offset;
};
