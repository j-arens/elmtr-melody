import { prefixClasses } from '@utils/index';

export const baseBtns = (prefix: string) => prefixClasses(
    `elementor-element-${prefix}-`,
    'dock-controls-secondary-color',
    'dock-controls-text-color',
    'dock-controls-font',
);

export const dockControls = (prefix: string) => prefixClasses(
    `elementor-element-${prefix}-`,
    'dock-controls-primary-color',
);

export const dockArrow = (prefix: string) => prefixClasses(
    `elementor-element-${prefix}-`,
    'dock-controls-arrow-color',
    'dock-controls-border-color',
);

export const controlsGroup = (prefix: string) => prefixClasses(
    `elementor-element-${prefix}-`,
    'dock-controls-border-color',
);

export const controlIcon = (prefix: string) => prefixClasses(
    `elementor-element-${prefix}-`,
    'dock-controls-icon-color',
);
