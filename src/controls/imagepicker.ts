import { makeImageframe } from './mediaframe';
import {
    makeControlFactory,
    getSelection,
    triggerChange,
    mutationMapper,
    clearAllSettings,
    mutateSettings,
} from './common';
import {
    GLOBAL,
} from './constants';
import {
    ImageAttachment,
    Mediaframe,
    Mutation,
    MutationMap,
    SelectionParams,
    SettingsModel,
    SwapParams,
    IPTriggerAction,
    TriggerEvent,
    ElementorDataModel,
 } from './type';

 const mutationMap: MutationMap = [
    ['melody_track_id', 'id'],
];

const IP_TRIGGER = '';
const IP_TRIGGER_ACTION = '';

/**
 * Handle media frame selections
 */
const handleSelection = ({ model, map, frame }: SelectionParams): void => {
    const attachment: ImageAttachment = getSelection(frame);
    const mutation: Mutation = mutationMapper(map, attachment);
    mutateSettings(model, mutation);
    triggerChange(model, map);
};

/**
 * Route trigger clicks
 */
const onTriggerClick = ({ $trigger, model, frame }: TriggerEvent): void => {
    const action: IPTriggerAction = $trigger.attr(IP_TRIGGER_ACTION);
    switch (action) {
        case 'SELECT_IMAGE': {
            frame.open();
            // swapTrigger({
            //     $trigger,
            //     action: 'CLEAR_TRACK',
            //     text: 'Clear Track',
            // });
            return;
        }
        case 'CLEAR_IMAGE': {
            clearAllSettings(model, mutationMap);
            // swapTrigger({
            //     $trigger,
            //     action: 'SELECT_TRACK',
            //     text: 'Select Track',
            // });
        }
        default: {
            return;
        }
    }
};

/**
 * Setup audioframe
 */
const bindImageframe = (model: ElementorDataModel): Mediaframe => {
    const imageframe = makeImageframe();
    imageframe.on('insert select', () => handleSelection({
        model: model.elementSettingsModel,
        map: mutationMap,
        frame: imageframe,
    }));
    return imageframe;
}

/**
 * Setup event listeners
 */
const bindEvents = (
    model: ElementorDataModel,
    imageframe: Mediaframe,
): JQuery => model.$el.on('click', IP_TRIGGER, (e: JQuery.Event) => onTriggerClick({
    $trigger: $(e.currentTarget),
    model: model.elementSettingsModel,
    frame: imageframe,
}));

/**
 * BaseData ready method
 */
function onReady() {
    bindEvents(this, bindImageframe(this));
    process.env.NODE_ENV === 'development' && (GLOBAL.mtp = this);
}

/**
 * Image picker
 */
export default makeControlFactory('melody-image-picker', onReady);
