import { Model } from 'backbone';
import * as get from 'lodash.get';
import * as set from 'lodash.set';
import { GLOBAL } from './constants';
import {
    Attachment,
    Mediaframe,
    Mutation,
    MutationMap,
    SettingsModel,
} from './type';

/**
 * Dynamic type validators
 */
const isType = (type: string, value: any): boolean => typeof value === type;
export const isString = isType.bind(null, 'string');
export const isNumber = isType.bind(null, 'number');

/**
 * Create an initialization fn for a new elementor control
 */
export const makeControlFactory = (handle: string, onReady: () => any) => () => {
    const { elementor, elementor: { modules: { controls: { BaseData } } } } = GLOBAL;
    elementor.addControlView(handle, BaseData.extend({ onReady }));
};

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
    map: MutationMap[],
) => map.forEach(mapping =>
        model.trigger(`change:external:${mapping.key.split('.')[0]}`, model),
    );

/**
 * Map atttachment properties into a mutation
 */
export const mutationMapper = (
    map: MutationMap[],
    attachment: Attachment,
): Mutation => map
    .reduce((mutation, mapping) => {
        const { key, path, validate, fallback } = mapping;
        let value = get(attachment, path, '');
        if (validate && !validate(value)) {
            value = fallback;
        }
        set(mutation, key, value);
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
    map: MutationMap[],
): void => {
    const mutation: Mutation = mutationMapper(map, {});
    mutateSettings(model, mutation);
    triggerChange(model, map);
};
