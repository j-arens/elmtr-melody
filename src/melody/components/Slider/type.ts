import { DragProps, MelodyDragEvent } from '@components/DragHelper/type';

export interface HandleOffsetStyle {
    transform: string;
}

export interface SliderBodyClickEvent {
    event: MouseEvent;
    offset: number;
    insideHandle: boolean;
}

export interface SliderDragEvent {
    event: MelodyDragEvent;
    offset: number;
}

export type SliderDragEventHandler = (data: SliderDragEvent) => any;

export interface SliderClasses {
    slider?: string;
    body?: string;
    backfill?: string;
    handle?: string;
}

export interface SliderDims {
    width: number;
    left: number;
}
