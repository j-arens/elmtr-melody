import { Model } from 'backbone';
import {
    GLOBAL,
    TP_TRIGGER,
    TP_TRIGGER_ACTION,
} from './constants';
import { audioframe } from './mediaframe';
import {
    AudioAttachment,
    Mediaframe,
    Mutation,
    MutationMap,
    SelectionParams,
    SettingsModel,
    SwapParams,
    TriggerAction,
    TriggerEvent,
 } from './type';

const get = require('lodash.get');

const mutationMap: MutationMap = [
    ['melody_track_id', 'id'],
    ['melody_track_title', 'title'],
    ['melody_track_album', 'meta.album'],
    ['melody_track_artist', 'meta.artist'],
    // ['melody_track_url', 'url'],
    ['melody_track_image', 'image.src'],
];

/**
 * Trigger change event for melody controls
 */
const triggerChange = (
    model: SettingsModel,
    map: MutationMap,
): void => {
    map.forEach(mapping =>
        model.trigger(`change:external:${mapping[0]}`, model),
    );
};

/**
 * Mutates settings model
 */
const mutateSettings = (
    settings: SettingsModel,
    mutation: Mutation,
): Model =>  settings.set(mutation);

/**
 * Map AudioAttachment properties into a mutation
 */
const mutationMapper = (
    map: MutationMap,
    attachment: AudioAttachment,
): Mutation => map
    .reduce((mutation, mapping) => {
        mutation[mapping[0]] = get(attachment, mapping[1], '');
        return mutation;
    }, {});

/**
 * Clears all settings and refreshes the ui
 */
const clearAllSettings = (
    model: SettingsModel,
    map: MutationMap,
): void => {
    const mutation: Mutation = mutationMapper(map, {});
    mutateSettings(model, mutation);
    triggerChange(model, map);
};

/**
 * Change the action & text of the trigger button
 */
const swapTrigger = ({ $trigger, action, text }: SwapParams): void => {
    $trigger.attr(TP_TRIGGER_ACTION, action);
    $trigger.text(text);
};

/**
 * Get selection from the media frame
 */
const getSelection = (frame: Mediaframe): AudioAttachment => frame
    .state()
    .get('selection')
    .first()
    .toJSON();

/**
 * Handle media frame selections
 */
const handleSelection = ({ model, map, frame }: SelectionParams): void => {
    const attachment: AudioAttachment = getSelection(frame);
    const mutation: Mutation = mutationMapper(map, attachment);
    mutateSettings(model, mutation);
    triggerChange(model, map);
};

/**
 * Route trigger clicks
 */
const onTriggerClick = ({ $trigger, model }: TriggerEvent): void => {
    const action: TriggerAction = $trigger.attr(TP_TRIGGER_ACTION);
    switch (action) {
        case 'SELECT_TRACK': {
            audioframe.open();
            swapTrigger({
                $trigger,
                action: 'CLEAR_TRACK',
                text: 'Clear Track',
            });
            return;
        }
        case 'CLEAR_TRACK': {
            clearAllSettings(model, mutationMap);
            swapTrigger({
                $trigger,
                action: 'SELECT_TRACK',
                text: 'Select Track',
            });
        }
        default: {
            return;
        }
    }
};

/**
 * Entry point
 */
export default (): void => {
    const { elementor, elementor: { modules: { controls: { BaseData } } } } = GLOBAL;

    const settings: SettingsModel = BaseData.extend({
        onReady() {
            if (process.env.NODE_ENV === 'development') {
                GLOBAL.mtp = this;
            }
            this.$el.on('click', TP_TRIGGER, (e: JQuery.Event) => onTriggerClick({
                $trigger: $(e.currentTarget),
                model: this.elementSettingsModel,
            }));
            audioframe.on('insert select', () => handleSelection({
                model: this.elementSettingsModel,
                map: mutationMap,
                frame: audioframe,
            }));
        },
    });

    elementor.addControlView('melody-track-picker', settings);
};
