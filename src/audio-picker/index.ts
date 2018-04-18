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
    AudioAttachment,
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
    Mutation,
} from './type';
import {
    hideUI,
    removeImage,
    setImage,
    showUI,
    swapTrackTrigger,
    updateUI,
} from './ui';

const get = require('lodash.get');

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
// PANEL_HOOKS.forEach(hook => $(() => GLOBAL.elementor.hooks.addAction(hook, main)));

// const { id, title, meta: { album, artist }, image: { src }, url, fileLength } = attachment;

$(() => {
    // const { modules: { controls: { BaseData } } } = GLOBAL.elementor;

    const {
        elementor: {
            modules: {
                controls: {
                    BaseData,
                },
            },
        },
        wp: {
            media,
        },
    } = GLOBAL;

    const TP_FRAME_TRIGGER = 'button[data-melody-tp-trigger]';
    const TRIGGER_ACTION = 'data-melody-tp-trigger-action';

    class AU extends BaseData {
        /**
         * Maps control handles to AudioAttachment properties
         */
        protected mutationMap = [
            ['melody_track_id', 'id'],
            ['melody_track_title', 'title'],
            ['melody_track_album', 'meta.album'],
            ['melody_track_artist', 'meta.artist'],
            // ['melody_track_url', 'url'],
            ['melody_track_image', 'image.src'],
        ];

        /**
         * MediaFrame app
         */
        protected mediaFrame: MediaFrame = media({
            button: { text: 'Select Track' },
            states: [
                new media.controller.Library({
                    title: 'Select Track',
                    library: media.query({ type: 'audio' }),
                    multiple: false,
                    date: false,
                    autoSelect: false,
                }),
            ],
        });

        /**
         * Entry, bind events
         */
        public onReady(): void {
            if (process.env.NODE_ENV === 'development') {
                GLOBAL.melody_trackPicker = this;
            }
            // this.$el.on('click', TP_FRAME_TRIGGER, this.showFrame);
            this.$el.on('click', TP_FRAME_TRIGGER, this.onTriggerClick);
            this.mediaFrame.on('insert select', this.handleSelection);
        }

        /**
         * Route trigger clicks
         */
        onTriggerClick = (e: JQuery.Event): void => {
            const action = $(e.target).attr(TRIGGER_ACTION);

            switch (action) {
                case 'SELECT_TRACK': {
                    this.showFrame();
                    this.swapTrigger({
                        action: 'CLEAR_TRACK',
                        text: 'Clear Track',
                    });
                    return;
                }
                case 'CLEAR_TRACK': {
                    this.clearAll();
                    this.swapTrigger({
                        action: 'SELECT_TRACK',
                        text: 'Select Track',
                    });
                }
                default: {
                    return;
                }
            }
        }

        swapTrigger({ action, text }): void {
            const $trigger = this.$el.find(TP_FRAME_TRIGGER);
            $trigger.attr(TRIGGER_ACTION, action);
            $trigger.text(text);
        }

        clearAll() {
            const mutation = this.mutationMapper({});
            this.mutateSettings(mutation);
            this.triggerChange();
        }

        /**
         * Show the media frame
         */
        public showFrame = (): MediaFrame => this.mediaFrame.open();

        /**
         * Handle media frame selections
         */
        public handleSelection = (): void => {
            const { mediaFrame } = this;
            const attachment: AudioAttachment = this.getSelection();
            const mutation: Mutation = this.mutationMapper(attachment);
            this.mutateSettings(mutation);
            this.triggerChange();
            // console.log('handleSelection', attachment);
        }

        /**
         * Get selection from the media frame
         */
        getSelection = (): AudioAttachment => this.mediaFrame
            .state()
            .get('selection')
            .first()
            .toJSON();

        /**
         * Map AudioAttachment properties into a mutation
         */
        protected mutationMapper(attachment: AudioAttachment): Mutation {
            return this.mutationMap.reduce((mutation, mapping) => {
                mutation[mapping[0]] = get(attachment, mapping[1], '');
                return mutation;
            }, {});
        }

        /**
         * Mutates settings model
         */
        protected mutateSettings(mutation: Mutation): Model {
            return this.elementSettingsModel.set(mutation);
        }

        /**
         * Trigger change event for melody controls
         */
        protected triggerChange(): void {
            const { elementSettingsModel: model } = this;
            this.mutationMap.forEach(mapping =>
                model.trigger(`change:external:${mapping[0]}`, model)
            );
        }
    }

    GLOBAL.elementor.addControlView('melody-track-picker', AU);

});

