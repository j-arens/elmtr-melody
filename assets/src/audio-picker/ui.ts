import {
    REVEAL_SELECTOR,
    HIDDEN_CLASS,
    IMAGE_SELECTOR,
    FIELD_SELECTOR,
} from './constants';
import { capatilize } from './helpers';
import { TriggerAction } from './type';

/**
 * Hide audiopicker container
 */
export function hideUI($container: JQuery): void {
    $container
        .find(`[${REVEAL_SELECTOR}]`)
        .addClass(HIDDEN_CLASS);
}

/**
 * Show audipicker container
 */
export function showUI($container: JQuery): void {
    $container
        .find(`[${REVEAL_SELECTOR}]`)
        .removeClass(HIDDEN_CLASS);
}

/**
 * Update audiopicker container 
 */
export function updateUI($container: JQuery, values): void {
    const fields = [
        'title',
        'album',
        'artist',
    ];
    
    fields.map(field => $container
        .find(`[${FIELD_SELECTOR}="${field}"] input`)
        .val(values[field])
    );
    
    setImage($container, values.artwork);
}

/**
 * Set an image within a container 
 */
export function setImage($container: JQuery, url: string): void {
    $container
        .find('.elementor-control-media')
        .removeClass('media-empty')
        .find(`[${IMAGE_SELECTOR}]`)
        .css({ 'background-image': `url(${url})` });
}

/**
 * Remove an image within a container  
 */
export function removeImage($container: JQuery): void {
    $container
        .find('.elementor-control-media')
        .addClass('media-empty')
        .find(`[${IMAGE_SELECTOR}]`)
        .css({ backgroundImage: '' });
}

/**
 * Swap the action performed by a trigger 
 */
export function swapTrackTrigger(
    $trigger: JQuery,
    action: TriggerAction
): void {
    $trigger.attr('data-melody-ap-trigger-action', action);
    $trigger.text(`${capatilize(action.split('_').shift().toLowerCase())} Track`);
}