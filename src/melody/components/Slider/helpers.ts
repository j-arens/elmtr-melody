import { HandleOffsetStyle, SliderDims } from './type';

export const getHandlePlacement = (
    sliderWidth: number,
    handleWidth: number,
    offset: number,
): HandleOffsetStyle => {
    const placement = (sliderWidth / handleWidth) * offset;
    const correction = sliderWidth / (handleWidth / 2); // offset for handle width
    return {
        transform: `translate3d(${placement + correction}%, 0, 0)`,
    };
};

export const getNextOffset = (
    x: number,
    { left, width }: SliderDims,
): number => ((x - left) / width) * 100;
