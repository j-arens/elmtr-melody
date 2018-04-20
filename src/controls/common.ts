import { Model } from 'backbone';
import { GLOBAL } from './constants';
import {
    Attachment,
    Mediaframe,
    SettingsModel,
    MutationMap,
    Mutation,
} from './type';

const get = require('lodash.get');

/**
 * Create an initialization fn for a new control 
 */
export const makeControlFactory = (handle: string, onReady: () => any) => () => {
    const { elementor, elementor: { modules: { controls: { BaseData } } } } = GLOBAL;
    elementor.addControlView(handle, BaseData.extend({ onReady }));
}

/**
 * Get selection from a media frame
 */
export const getSelection = (frame: Mediaframe): Attachment => frame
    .state()
    .get('selection')
    .first()
    .toJSON();

/**
 * Trigger change event for a control model
 */
export const triggerChange = (
    model: SettingsModel,
    map: MutationMap,
): void => {
    map.forEach(mapping =>
        model.trigger(`change:external:${mapping[0]}`, model),
    );
};

/**
 * Map atttachment properties into a mutation
 */
export const mutationMapper = (
    map: MutationMap,
    attachment: Attachment,
): Mutation => map
    .reduce((mutation, mapping) => {
        mutation[mapping[0]] = get(attachment, mapping[1], '');
        return mutation;
    }, {});

/**
 * Mutates settings model
 */
export const mutateSettings = (
    settings: SettingsModel,
    mutation: Mutation,
): Model =>  settings.set(mutation);

/**
 * Clear all settings and refresh the ui for a control
 */
export const clearAllSettings = (
    model: SettingsModel,
    map: MutationMap,
): void => {
    const mutation: Mutation = mutationMapper(map, {});
    mutateSettings(model, mutation);
    triggerChange(model, map);
};