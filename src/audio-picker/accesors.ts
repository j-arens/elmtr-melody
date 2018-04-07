import { Model } from 'backbone';
import { $, CONTAINER_CLASS, TRACKS_KEY } from './constants';
import {
    TrackMutation,
    TrackResources,
    TrackState,
} from './type';

/**
 * Get an attribute off of a Model
 */
export const getAttr = (
    model: Model,
    key: string,
): any => model.get(key);

/**
 * Set attributes on a Model
 */
export const setAttrs = (
    model: Model,
    attrs: object,
): any => model.set(attrs);

/**
 * Get a TrackModel
 */
export const getTrackModel = (
    model: Model,
    index: number,
): Model => getAttr(model, TRACKS_KEY).at(index);

/**
 * Get the field's container element
 */
export const getFieldContainer = (
    { target }: JQuery.Event,
): JQuery => $(target).closest(CONTAINER_CLASS);

/**
 * Get the index of a $container in the context of other $containers
 */
export const getContainerIndex = (
    $container: JQuery,
): number => $container.index(CONTAINER_CLASS);

/**
 * Get TrackResources when a en event happens on a field
 */
export function getTrackResources(
    e: JQuery.Event,
    settings: Model,
): TrackResources {
    const $container = getFieldContainer(e);
    const index = getContainerIndex($container);
    const model = getTrackModel(settings, index);
    const state = getAttr(model, 'melody_wp_media_picker');
    return { $container, index, model, state };
}

/**
 * Mutate and update TrackState
 */
export function setTrackState(
    model: Model,
    state: TrackState,
    mutation: TrackMutation,
): TrackState {
    const updated = Object.assign({}, state, mutation);
    const newModel = setAttrs(model, { melody_wp_media_picker: updated });
    return getAttr(newModel, 'melody_wp_media_picker');
}
