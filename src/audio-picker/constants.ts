export const GLOBAL = (window as any);
export const { jQuery: $ } = GLOBAL;
export const TRACKS_KEY = 'melody_audio_tracks';
export const CONTAINER_CLASS = '.elementor-repeater-fields';
export const FIELD_SELECTOR = 'data-melody-ap-field';
export const TRACK_TRIGGER = 'data-melody-ap-track-trigger';
export const HIDDEN_CLASS = 'elementor-hidden';
export const REVEAL_SELECTOR = 'data-melody-ap-reveal';
export const IMAGE_SELECTOR = 'data-melody-ap-image-preview';
export const IMAGE_TRIGGER = 'data-melody-ap-image-trigger';
export const TRIGGER_DATA_ATTR = 'data-melody-ap-trigger-action';
export const PANEL_HOOKS = [
    'panel/open_editor/widget/melody-audio-player-slider',
    'panel/open_editor/widget/melody-audio-player-toolbar',
    'panel/open_editor/widget/melody-audio-player-tracklist',
];
