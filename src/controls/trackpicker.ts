import { makeAudioframe } from './mediaframe';
import {
    GLOBAL,
    TP_TRIGGER,
    TP_TRIGGER_ACTION,
} from './constants';
import {
    makeControlFactory,
    getSelection,
    triggerChange,
    mutationMapper,
    clearAllSettings,
    mutateSettings,
} from './common';
import {
    AudioAttachment,
    Mediaframe,
    Mutation,
    MutationMap,
    SelectionParams,
    SwapParams,
    TPTriggerAction,
    TriggerEvent,
    ElementorDataModel,
 } from './type';

const mutationMap: MutationMap = [
    ['melody_track_id', 'id'],
    ['melody_track_title', 'title'],
    ['melody_track_album', 'meta.album'],
    ['melody_track_artist', 'meta.artist'],
    ['melody_internal_track_url', 'url'],
    ['melody_internal_track_duration', 'fileLength'],
    ['melody_track_image', 'image.src'],
];

/**
 * Change the action & text of the trigger button
 */
const swapTrigger = ({ $trigger, action, text }: SwapParams): void => {
    $trigger.attr(TP_TRIGGER_ACTION, action);
    $trigger.text(text);
};

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
const onTriggerClick = ({ $trigger, model, frame }: TriggerEvent): void => {
    const action: TPTriggerAction = $trigger.attr(TP_TRIGGER_ACTION);
    switch (action) {
        case 'SELECT_TRACK': {
            frame.open();
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
 * Setup audioframe
 */
const bindAudioframe = (model: ElementorDataModel): Mediaframe => {
    const audioframe = makeAudioframe();
    audioframe.on('insert select', () => handleSelection({
        model: model.elementSettingsModel,
        map: mutationMap,
        frame: audioframe,
    }));
    return audioframe;
}

/**
 * Setup event listeners
 */
const bindEvents = (
    model: ElementorDataModel,
    audioframe: Mediaframe,
): JQuery => model.$el.on('click', TP_TRIGGER, (e: JQuery.Event) => onTriggerClick({
    $trigger: $(e.currentTarget),
    model: model.elementSettingsModel,
    frame: audioframe,
}));

/**
 * BaseData ready method
 */
function onReady() {
    bindEvents(this, bindAudioframe(this));
    process.env.NODE_ENV === 'development' && (GLOBAL.mtp = this);
}

/**
 * Track picker
 */
export default makeControlFactory('melody-track-picker', onReady);
