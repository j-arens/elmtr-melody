// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/**
 * Authenticate with wp-login
 * 
 * @param {string} username
 * @param {string} password
 */
Cypress.Commands.add('login', (username, password) => {
    cy.log('COMMAND: login');
    Cypress.Cookies.defaults({
        whitelist: /wordpress_.*/,
    });
    cy.request({
        url: '/wp-login.php',
        method: 'POST',
        form: true,
        body: {
            log: username,
            pwd: password,
        },
    });
});

/**
 * Select the elementor preview iframe and perform cy commands on it
 */
Cypress.Commands.add('getPreview', () => cy
    .log('COMMAND: getPreview')
    .get('#elementor-preview-iframe')
    .then($preview => {
        const $body = $preview.contents().find('body');
        return cy.wrap($body);
    })
);

/**
 * Select a main widget editing tab in the elementor sidebar
 * 
 * @param {string} tab
 */
Cypress.Commands.add('selectTab', tab => cy
    .log('COMMAND: selectTab')
    .get(`.elementor-tab-control-${tab}`)
    .click()
);

/**
 * Removes all tracks from a melody widget
 */
Cypress.Commands.add('clearTracks', () => cy
    .log('COMMAND: clearTracks')
    .selectTab('content')
    .get('.elementor-repeater-fields-wrapper')
    .then((wrapper) => {
        if (wrapper.find('.elementor-repeater-fields').length) {
            cy
                .get('.elementor-repeater-fields')
                .each(($el) => $el.find('.elementor-repeater-tool-remove').click());
        }
    })
);

/**
 * Select an attachment by id from a media frame
 * 
 * @param {string|number} id
 */
Cypress.Commands.add('selectMediaAttachment', id => cy
    .log('COMMAND: selectMediaAttachment')
    .get('.media-router a:last-child')
    .then($els => {
        if ($els.length > 1) {
            return cy.wrap($els.get($els.length - 1));
        }
        return cy.wrap($els.get(0));
    })
    .click()
    .closest('.media-frame')
    .find(`.attachments-browser [data-id="${id}"]`)
    .click()
    .closest('.media-frame')
    .find('.media-button-select')
    .click()
);

/**
 * Adds a track from the media library
 * 
 * @param {string|number} id
 */
Cypress.Commands.add('addTrack', id => cy
    .log('COMMAND: addTrack')
    .selectTab('content')
    .get('.elementor-repeater-add')
    .click()
    .get('[data-setting="melody_audio_source"]')
    .then($els => {
        if ($els.length > 1) {
            return cy.wrap($els.get($els.length - 1));
        }
        return cy.wrap($els.get(0));
    })
    .select('media-library')
    .closest('.elementor-repeater-fields')
    .find('[data-melody-tp-trigger]')
    .click()
    .selectMediaAttachment(id)
);

/**
 * Selects the nearest color picker, sets a hex value, and closes it
 * 
 * @param {string} handle
 * @param {string} hex
 */
Cypress.Commands.add('setColor', (hex, handle = '') => {
    const btn = 'button.wp-color-result';
    const scope = handle ? `.elementor-control-${handle} ` : '';
    const selector = scope + btn;

    cy
        .log('COMMAND: setColor')
        .get(selector)
        .click()
        .parent()
        .find('input.wp-color-picker')
        .clear()
        .type(hex);

    cy
        .get(selector)
        .click();
});

/**
 * Elementor fires a prompt that causes the electron browser
 * to hang if the editor has unsaved changes (basically every test)
 */
Cypress.Commands.add('disableUnloadAlert', () => cy
    .window()
    .then(w => w.jQuery(w).unbind('beforeunload'))
);

/**
 * Set a slider control value
 * 
 * @param {string} handle
 * @param {string} setting
 * @param {string} value
 */
Cypress.Commands.add('setSlider', (handle, setting, value) => cy
    .log('COMMAND: setSlider')
    .get(`.elementor-control-${handle} input[data-setting="${setting}"]`)
    .clear()
    .type(value)
);

/**
 * Set a choose control value
 * 
 * @param {string} handle
 * @param {number} index
 */
Cypress.Commands.add('setChoices', (handle, index) => cy
    .log('COMMAND: setChoices')
    .get(`.elementor-control-${handle} .elementor-choices label`)
    .eq(index)
    .then($label => {
        if (!$label.prev().is(':checked')) {
            $label.click();
        }
    })
);

/**
 * Expand/close an accordion of controls
 * 
 * @param {string} handle
 */
Cypress.Commands.add('toggleAccordion', handle => cy
    .log('COMMAND: toggleAccordion')
    .get(`.elementor-control-${handle}`)
    .click()
);

/**
 * Set the value(s) of a dimension control
 * 
 * @param {string} handle
 * @param {Object} config
 * @param {boolean} config.linked
 * @param {array<mixed>} config.values
 */
Cypress.Commands.add('setDimensions', (handle, { linked, values }) => {
    cy
        .log('COMMAND: setDimensions')
        .get(`.elementor-control-${handle}`)
        .find('button.elementor-link-dimensions')
        .then($button => {
            const shouldLink = $button.hasClass('unlinked') && linked;
            const shouldUnlink = !shouldLink && !linked;
            if (shouldLink || shouldUnlink) {
                $button.click();
            }
        })
        .closest('ul.elementor-control-dimensions')
        .find('li.elementor-control-dimension input')
        .then($inputs => values.forEach((value, i) => cy
            .wrap($inputs[i])
            .clear()
            .type(value.toString())));
});

/**
 * Open a control's popover
 * 
 * @param {string} handle
 */
Cypress.Commands.add('openPopover', handle => cy
    .log('COMMAND: openPopover')
    .get(`.elementor-control-${handle}`)
    .find('.elementor-control-popover-toggle-toggle')
    .click({ force: true })
    .closest(`.elementor-control-${handle}`)
    .next()
);

/**
 * Close a control's popover
 * 
 * @param {string} handle
 */
Cypress.Commands.add('closePopover', handle => cy
    .log('COMMAND: closePopover')
    .get(`.elementor-control-${handle}`)
    .find('.elementor-control-popover-toggle-toggle')
    .click({ force: true })
);

/**
 * Run a series operations mapped by key within a scope
 * 
 * @param {jQuery} $scope
 * @param {object} map
 * @param {object} operations
 */
Cypress.Commands.add('subProcess', ($scope, map, operations) => {
    cy.log('COMMAND: subProcess');
    const ctx = cy.wrap($scope);
    Object.keys(map).forEach(k => operations[k] ? operations[k](ctx, ...map[k]) : null);
});

/**
 * Set the value(s) of a box shadow control
 * 
 * @param {string} handle
 * @param {string} popoverHandle
 * @param {object} config
 */
Cypress.Commands.add('setBoxShadow', (handle, config) => cy
    .log('COMMAND: setBoxShadow')
    .openPopover(handle)
    .then($popover => cy.subProcess($popover, config, {
        color: (ctx, value, selector) => ctx.setColor(value, selector),
        x: (ctx, selector, value) => ctx.setSlider(selector, 'horizontal', value),
        y: (ctx, selector, value) => ctx.setSlider(selector, 'vertical', value),
        blur: (ctx, selector, value) => ctx.setSlider(selector, 'blur', value),
        spread: (ctx, selector, value) => ctx.setSlider(selector, 'spread', value),
        position: (ctx, selector, value) => ctx.get(selector).select(value),
    }))
    .closePopover(handle)
);

/**
 * Set the value of a text-based input
 * 
 * @param {string} handle
 * @param {string|number} value
 */
Cypress.Commands.add('setInput', (handle, value) => cy
    .log('COMMAND: setInput')
    .get(`.elementor-control-${handle} input[data-setting="${handle}"]`)
    .clear()
    .type(value)
);

/**
 * Set the values of a font style control
 * 
 * @param {string} handle
 * @param {object} config
 */
Cypress.Commands.add('setFontStyle', (handle, config) => cy
    .log('COMMAND: setFontStyle')
    .openPopover(handle)
    .then($popover => cy.subProcess($popover, config, {
        family: (ctx, selector, value) => ctx.get(selector).select(value, { force: true }),
        size: (ctx, selector, value) => ctx.setSlider(selector, 'size', value),
        weight: (ctx, selector, value) => ctx.get(selector).select(value),
        transform: (ctx, selector, value) => ctx.get(selector).select(value),
        style: (ctx, selector, value) => ctx.get(selector).select(value),
        decoration: (ctx, selector, value) => ctx.get(selector).select(value),
        lineHeight: (ctx, selector, value) => ctx.setSlider(selector, 'size', value),
        letterSpacing: (ctx, selector, value) => ctx.setSlider(selector, 'size', value),
    }))
    .closePopover(handle)
);

/**
 * Set the values of a text shadow control
 * 
 * @param {string} handle
 * @param {object} config
 */
Cypress.Commands.add('setTextShadow', (handle, config) => cy
    .log('COMMAND: setTextShadow')
    .openPopover(handle)
    .then($popover => cy.subProcess($popover, config, {
        color: (ctx, value, selector) => ctx.setColor(value, selector),
        blur: (ctx, selector, value) => ctx.setSlider(selector, 'blur', value),
        x: (ctx, selector, value) => ctx.setSlider(selector, 'horizontal', value),
        y: (ctx, selector, value) => ctx.setSlider(selector, 'vertical', value),
    }))
    .closePopover(handle)
);

/**
 * Set the values of an image filter control
 * 
 * @param {string} handle
 * @param {object} config
 */
Cypress.Commands.add('setImageFilter', (handle, config) => cy
    .log('COMMAND: setImageFilter')
    .openPopover(handle)
    .then($popover => cy.subProcess($popover, config, {
        blur: (ctx, selector, value) => ctx.setSlider(selector, 'size', value),
        brightness: (ctx, selector, value) => ctx.setSlider(selector, 'size', value),
        contrast: (ctx, selector, value) => ctx.setSlider(selector, 'size', value),
        saturation: (ctx, selector, value) => ctx.setSlider(selector, 'size', value),
        hue: (ctx, selector, value) => ctx.setSlider(selector, 'size', value),
    }))
    .closePopover(handle)
);

/**
 * Toggle a switch control
 *
 * @param {string} handle
 */
Cypress.Commands.add('toggleSwitch', handle => cy
    .log('COMMAND: setSwitch')
    .get(`.elementor-control-${handle} label.elementor-switch`)
    .click()
);
