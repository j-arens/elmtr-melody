import { HandleOffsetStyle } from './type';

export function getHandlePlacement(
    width: number,
    handleWidth: number,
    offset: number,
): HandleOffsetStyle {
    const placement = (width / handleWidth) * offset;
    const correction = width / (handleWidth / 2); // offset for handle width
    return {
        transform: `translate3d(${placement + correction}%, 0, 0)`,
    };
}
