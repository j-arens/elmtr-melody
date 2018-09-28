import { MelodyDragEvent, DragProps } from '@components/DragHelper/type';

export interface HandleOffsetStyle {
    transform: string
};

export interface SliderColors {
    background: string;
    backfill: string;
    handle: string;
}

export interface SliderBodyClickEvent {
    event: MouseEvent;
    offset: number;
    insideHandle: boolean;
}

interface SliderDragHandlerData {
    event: MelodyDragEvent;
    offset: number;
}

export type SliderDragEventHandler = (data: SliderDragHandlerData) => any;
