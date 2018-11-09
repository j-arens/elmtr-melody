import {
    clearAllSettings,
    getSelection,
    isNumber,
    isString,
    makeControlFactory,
    mutateSettings,
    mutationMapper,
    triggerChange,
} from './common';
import {
    GLOBAL,
    TP_TRIGGER,
    TP_TRIGGER_ACTION,
} from './constants';
import { makeAudioframe } from './mediaframe';
import {
    AudioAttachment,
    ElementorDataModel,
    Mediaframe,
    Mutation,
    MutationMap,
    SelectionParams,
    SwapParams,
    TPTriggerAction,
    TriggerEvent,
 } from './type';

const CLEAR_TRACK = 'CLEAR_TRACK';
const SELECT_TRACK = 'SELECT_TRACK';

const mutationMap: MutationMap[] = [
    {
        key: 'melody_track_id',
        path: 'id',
        validate: isNumber,
        fallback: 0,
    },
    {
        key: 'melody_track_title',
        path: 'title',
        validate: isString,
        fallback: '',
    },
    {
        key: 'melody_track_album',
        path: 'meta.album',
        validate: isString,
        fallback: '',
    },
    {
        key: 'melody_track_artist',
        path: 'meta.artist',
        validate: isString,
        fallback: '',
    },
    {
        key: 'melody_internal_track_url',
        path: 'url',
        validate: isString,
        fallback: '',
    },
    {
        key: 'melody_track_artwork.url',
        path: 'image.src',
        validate: isString,
        fallback: '',
    },
    {
        key: 'melody_track_artwork.id',
        path: 'image.id',
        validate: isString,
        fallback: '0',
    },
    {
        key: 'melody_track_picker_control.id',
        path: 'id',
        validate: isNumber,
        fallback: 0,
    },
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
    swapTrigger({
        $trigger: frame._melody_$trigger,
        action: CLEAR_TRACK,
        text: 'Clear Track',
    });
};

/**
 * Route trigger clicks
 */
export const onTriggerClick = ({ $trigger, model, frame }: TriggerEvent): number => {
    const action: TPTriggerAction = $trigger.attr(TP_TRIGGER_ACTION);
    switch (action) {
        case SELECT_TRACK: {
            frame._melody_$trigger = $trigger;
            frame.open();
            return 1;
        }
        case CLEAR_TRACK: {
            clearAllSettings(model, mutationMap);
            swapTrigger({
                $trigger,
                action: SELECT_TRACK,
                text: 'Select Track',
            });
            return 2;
        }
        default: {
            return 0;
        }
    }
};

/**
 * Setup audioframe
 */
export const bindAudioframe = (model: ElementorDataModel): Mediaframe => {
    const audioframe = makeAudioframe();
    audioframe.on('insert select', () => handleSelection({
        model: model.elementSettingsModel,
        map: mutationMap,
        frame: audioframe,
    }));
    return audioframe;
};

/**
 * Setup event listeners
 */
export const bindEvents = (
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
    if (process.env.NODE_ENV === 'development') {
        GLOBAL.mtp = this;
    }
}

/**
 * Track picker
 */
export default makeControlFactory('melody-track-picker', onReady);
