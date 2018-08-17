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
    .click()
    .get(`.attachments-browser [data-id="${id}"]`)
    .click()
    .get('.media-button-select')
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
    .select('media-library')
    .get('[data-melody-tp-trigger]')
    .click()
    .selectMediaAttachment(id)
);

/**
 * Selects the nearest color picker, sets a hex value, and closes it
 * 
 * @param {string} handle
 * @param {string} hex
 */
Cypress.Commands.add('setColor', (handle, hex) => {
    cy
        .log('COMMAND: setColor')
        .get(`.elementor-control-${handle} button.wp-color-result`)
        .click()
        .parent()
        .find('input.wp-color-picker')
        .clear()
        .type(hex);

    cy
        .get(`.elementor-control-${handle} button.wp-color-result`)
        .click();
});

/**
 * Elementor fires a prompt that causes the electron browser
 * to hang if the editor has unsaved changes (basically every test)
 */
Cypress.Commands.add('disableUnloadAlert', () => cy
    .window()
    .then(w => w.elementor.$window.unbind('beforeunload'))
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
 * Set the value(s) of a box shadow control
 * 
 * @param {string} handle
 * @param {string} popoverHandle
 * @param {object} config
 * @param {string} config.color
 * @param {number} config.x
 * @param {number} config.y
 * @param {number} config.blur
 * @param {number} config.spread
 * @param {string} config.position
 */
Cypress.Commands.add('setBoxShadow', (handle, popoverHandle, config) => cy
    .log('COMMAND: setBoxShadow')
    .get(`.elementor-control-${handle}`)
    .find('.elementor-control-popover-toggle-toggle')
    .click({ force: true })
    .closest(`.elementor-control-${handle}`)
    .next()
    .then($popover => {
        const ctx = cy.wrap($popover);
        const fns = {
            color: value => ctx.setColor(popoverHandle, value),
            x: value => ctx.setSlider(popoverHandle, 'horizontal', value),
            y: value => ctx.setSlider(popoverHandle, 'vertical', value),
            blur: value => ctx.setSlider(popoverHandle, 'blur', value),
            spread: value => ctx.setSlider(popoverHandle, 'spread', value),
            position: value => ctx.get(`[data-setting="${popoverHandle}_position"]`).select(value),
        };
        Object.keys(config).forEach(k => fns[k] ? fns[k](config[k]) : null);
    })
    .closest('.elementor-controls-popover')
    .prev()
    .find('.elementor-control-field')
    .click()
);
