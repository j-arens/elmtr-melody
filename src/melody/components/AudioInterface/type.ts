export type MediaStreamEventHandler = (e: MediaStreamEvent) => any;

export interface EventsMap {
    [event: string]: string;
}

export type AudioInterfaceState = 'playing' | 'paused';
