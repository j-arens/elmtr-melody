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
Cypress.Commands.add('login', (username, password) => cy
    .log('COMMAND: login')
    .request({
        url: '/wp-login.php',
        method: 'POST',
        form: true,
        body: {
            log: username,
            pwd: password,
        },
    }));

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
