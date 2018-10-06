import { DragProps, MelodyDragEvent } from '@components/DragHelper/type';

export type SliderOrientation = 'vertical' | 'horizontal';

export interface HandleOffsetStyle {
    transform: string;
    right: string;
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
