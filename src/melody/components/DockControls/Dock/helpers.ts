import { DockToggleDims } from '@melody/redux/modules/ui/type';

export interface DockCoordinates {
    top: number;
    right: number;
}

const X_PADDING = 12;
const Y_PADDING = 12;

export function dockPosition(dims: DockToggleDims): DockCoordinates {
    const top = dims.y + Y_PADDING;
    let right = (window.innerWidth - dims.x) - dims.width - X_PADDING;

    if (right > window.innerWidth) {
        right = window.innerWidth - X_PADDING;
    }

    return {
        top,
        right,
    };
}
