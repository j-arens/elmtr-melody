export interface State {
    isDragging: boolean;
    initX: number;
    initY: number;
}

export type MelodyDragEvent = MouseEvent & TouchEvent & {
    firstTouch?: {
        clientY: number,
        clientX: number,
    },
    firstChangedTouch?: {
        clientY: number,
        clientX: number,
    },
};

export type Handler = (e: MelodyDragEvent) => any;
export type HandlerSet = Set<Handler>;
export type EventRegistry = Map<string, HandlerSet>;

export type ListeningEvents =
    | 'mousedown'
    | 'mousemove'
    | 'mouseup'
    | 'touchstart'
    | 'touchmove'
    | 'touchend';

export interface DragProps {
    isDragging: boolean;
    setDragRef: (ref: HTMLElement) => void;
    onDragStart: (fn: Handler) => void;
    onDrag: (fn: Handler) => void;
    onDragEnd: (fn: Handler) => void;
}
