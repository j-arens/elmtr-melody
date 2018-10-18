import { SCROLL_INTERVAL, State } from './';
import { ScrollDimensions, ScrollStyles } from './type';

export enum ScrollStatus {
    LIMIT_LEFT,
    LIMIT_RIGHT,
    IN_RANGE,
}

/**
 * Get the total percentage difference between the
 * offsetWidth and scrollWidth and the elements offsetWidth
 */
export const calculateDimensions = (el: HTMLElement): ScrollDimensions => {
    const offsetWidth = el.offsetWidth;
    const scrollWidth = el.scrollWidth;
    const target = Math.ceil((scrollWidth - offsetWidth) / offsetWidth * 100);
    return {
        overlapTarget: offsetWidth < scrollWidth ? target : 0,
        recordedWidth: offsetWidth,
    };
};

/**
 * Checks if the marquee is in a state where it can start a new scroll
 */
export const canScroll = ({ scrolling, overlapTarget }: State): boolean =>
    Boolean(!scrolling && overlapTarget);

/**
 * Checks if the element resized since the last time the width was recorded
 */
export const didResize = (el, { recordedWidth }: State): boolean =>
    el.offsetWidth !== recordedWidth;

/**
 * Get the current scroll position status
 */
export const getScrollStatus = ({
    offset,
    overlapTarget,
    direction,
}: State): ScrollStatus => {
    if (offset === overlapTarget && direction === 'left') {
        return ScrollStatus.LIMIT_LEFT;
    }
    if (offset === 0 && direction === 'right') {
        return ScrollStatus.LIMIT_RIGHT;
    }
    return ScrollStatus.IN_RANGE;
};

/**
 * Calculate the next offset
 */
export const getNextOffset = ({ offset, direction }: State): number =>
    direction === 'right' ? offset - 1 : offset + 1;

/**
 * Map scroll state into a scroll styles object
 */
export const getScrollStyles = ({
    scrolling,
    overlapTarget,
    offset,
}: State): ScrollStyles => {
    if (!scrolling || !overlapTarget) {
        return {};
    }
    return {
        transform: `translate3d(-${offset}%, 0, 0)`,
        transition: `transform ${SCROLL_INTERVAL}ms linear`,
    };
};
