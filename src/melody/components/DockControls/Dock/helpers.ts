import { DockToggleDims } from '@melody/redux/modules/ui/type';

export interface DockCoordinates {
    controls: {
        top: number;
        left: number;
    };
    arrow: {
        left: string | number;
    };
}

const ARROW_WIDTH = 12;
const Y_PADDING = 12;

export function dockPosition(
    dims: DockToggleDims,
    controlsWidth: number,
): DockCoordinates {
    const top = dims.y + Y_PADDING;

    let controlsLeft = dims.x + (dims.width / 2) - (controlsWidth / 2);
    let arrowLeft: string | number = (controlsWidth / 2) - (ARROW_WIDTH / 2);

    // don't place the controls off the page, instead place the right
    // side of the controls parallel with the right side of the toggle,
    // and place the arrow on the right side centered beneath the toggle
    if ((controlsLeft + controlsWidth) >= window.innerWidth) {
        controlsLeft = (dims.x + dims.width) - controlsWidth;
        arrowLeft = `calc(100% - (${dims.width / 2}px + ${ARROW_WIDTH}px))`;
    }

    return {
        controls: {
            top,
            left: controlsLeft,
        },
        arrow: {
            left: arrowLeft,
        },
    };
}
