import { isEditMode } from '@utils/index';
import { GLOBAL } from './constants';
import * as InstanceManager from './InstanceManager';
import Wiretap from './Wiretap';

const { jQuery: $ } = GLOBAL;

/**
 * Handle element remove events from elementor
 */
export const onRemove = ({ id }) => {
    const { elementor: { $previewContents } } = GLOBAL;
    const ids = Array.from<Element>($previewContents
        .find(`[data-id=${id}]`)
        .find(`[data-id]`))
        .map(el => el.getAttribute('data-id'));
    InstanceManager.autoRemove(id, ...ids);
};

/**
 * Listen for element:before:remove events from the elementor editor
 */
export const listen = () => {
    if (!isEditMode()) {
        return;
    }
    const tap = new Wiretap();
    tap.on('data', 'element:before:remove', onRemove);
};

export default () => $(listen);
