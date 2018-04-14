import { Model } from 'backbone';
import {
    getTrackResources,
    setTrackState,
} from './accesors';
import {
    $,
    FIELD_SELECTOR,
    GLOBAL,
    IMAGE_TRIGGER,
    PANEL_HOOKS,
    TRACK_TRIGGER,
    TRIGGER_DATA_ATTR,
} from './constants';
import { audioFrame, imageFrame } from './mediaframe';
import {
    AudioPickerField,
    FrameType,
    MediaFrame,
    MelodyResources,
    Panel,
    SettingsModel,
    TrackMutation,
    TrackResources,
    TrackState,
    TriggerAction,
} from './type';
import {
    hideUI,
    removeImage,
    setImage,
    showUI,
    swapTrackTrigger,
    updateUI,
} from './ui';

/**
 * Elementor settings model interface
 */
const settings: SettingsModel = {
    model: null,
    retrieve(): Model {
        return this.model.get('settings');
    },
};

/**
 * Reset track artwork
 */
function resetImage(e: JQuery.Event): void {
    const {
        $container,
        model,
        state,
    }: TrackResources = getTrackResources(e, settings.retrieve());
    const mutation: TrackMutation = { artwork: '' };
    setTrackState(model, state, mutation);
    removeImage($container);
}

/**
 * Reset track model and it's UI
 */
function resetTrack(e: JQuery.Event): void {
    const {
        $container,
        model,
        state,
    }: TrackResources = getTrackResources(e, settings.retrieve());
    const mutation: TrackMutation = {
        id: '',
        title: '',
        album: '',
        artist: '',
        artwork: '',
        duration: '',
    };
    setTrackState(model, state, mutation);
    hideUI($container);
    removeImage($container);
    swapTrackTrigger($(e.target), 'SELECT_TRACK');
}

/**
 * Load a wp media picker frame
 */
function loadMediaFrame(e: JQuery.Event, type: FrameType): void {
    let mediaFrame = null;

    switch (type) {
        case 'audio':
            mediaFrame = audioFrame;
            break;
        case 'image': {
            mediaFrame = imageFrame;
            break;
        }
        default: {
            return;
        }
    }

    if (!mediaFrame) {
        return;
    }

    const resources: TrackResources = getTrackResources(e, settings.retrieve());
    mediaFrame._melodyResources = resources;
    mediaFrame.open();
}

/**
 * Process text input changes
 */
function handleChange(e: JQuery.Event): void {
    const { model, state }: TrackResources = getTrackResources(e, settings.retrieve());
    const field: AudioPickerField = $(e.target).closest(`[${FIELD_SELECTOR}]`).attr(FIELD_SELECTOR);
    const mutation: TrackMutation = { [field]: $(e.target).val() };
    setTrackState(model, state, mutation);
}

/**
 * Process audioFrame selections
 */
function handleAudioSelection(): void {
    const {
        _melodyResources: {
            $container,
            index,
            model,
            state,
        },
    }: MediaFrame = audioFrame;
    const $trigger: JQuery = $container.find(`[${TRACK_TRIGGER}]`);
    const attachment = audioFrame.state().get('selection').first().toJSON();
    const { id, title, meta: { album, artist }, image: { src }, url, fileLength } = attachment;
    const mutation: TrackMutation = { id, title, album, artist, artwork: src, url, duration: fileLength };
    const newState: TrackState = setTrackState(model, state, mutation);
    updateUI($container, newState);
    showUI($container);
    swapTrackTrigger($trigger, 'CLEAR_TRACK');
}

/**
 * Process imageFrame selections
 */
function handleImageSelection(): void {
    const {
        _melodyResources: {
            $container,
            index,
            model,
            state,
        },
    }: MediaFrame = imageFrame;
    const attachment = imageFrame.state().get('selection').first().toJSON();
    const { url } = attachment;
    const mutation: TrackMutation = { artwork: url };
    setTrackState(model, state, mutation);
    setImage($container, url);
}

/**
 * Route events
 */
function handleTrigger(e: JQuery.Event): void {
    const action: TriggerAction = $(e.target).attr(TRIGGER_DATA_ATTR);
    switch (action) {
        case 'SELECT_TRACK': {
            loadMediaFrame(e, 'audio');
            break;
        }
        case 'CLEAR_TRACK': {
            resetTrack(e);
            break;
        }
        case 'ADD_IMAGE': {
            loadMediaFrame(e, 'image');
            break;
        }
        case 'CLEAR_IMAGE': {
            resetImage(e);
            break;
        }
        default: {
            return;
        }
    }
}

/**
 * Bind events to handlers
 */
function bindEvents({ currentPageView: { $el } }: Panel): void {
    $el.on('click', `[${TRACK_TRIGGER}]`, handleTrigger);
    $el.on('input', `[${FIELD_SELECTOR}] input`, handleChange);
    $el.on('click', `[${IMAGE_TRIGGER}]`, handleTrigger);
    audioFrame.on('insert select', handleAudioSelection);
    imageFrame.on('insert select', handleImageSelection);
}

/**
 * Entry point. Setup Panel, Model, and events.
 */
function main(panel: Panel, model: Model): void {
    if (process.env.NODE_ENV === 'development') {
        GLOBAL.mapPanel = panel;
        GLOBAL.mapModel = model;
        GLOBAL.mapAudioFrame = audioFrame;
        GLOBAL.mapImageFrame = imageFrame;
    }

    settings.model = model;
    bindEvents(panel);
}

/**
 * Hooks
 */
PANEL_HOOKS.forEach(hook => $(() => GLOBAL.elementor.hooks.addAction(hook, main)));
