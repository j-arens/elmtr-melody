import * as utils from '../../support/utils';

describe('toolbar toolbar customizations', () => {
    before(() => {
        cy.login('admin', 'z');
        cy.visit(utils.elementorEditor(9901));
        cy.disableUnloadAlert();

        cy
            .getPreview()
            .find('[id^="melody-widgetRoot:"]')
            .click();

        cy
            .clearTracks()
            .addTrack(8001);

        cy
            .selectTab('style')
            .toggleAccordion('section_melody_toolbar');
    });

    describe('toolbar customizations', () => {
        it('background color gets applied', () => {
            cy.setColor('#2b1f6d', 'melody_toolbar_bg_color');

            cy
                .getPreview()
                .find('[data-cy="toolbar"]')
                .should('have.css', 'background-color', utils.hexToRgb('#2b1f6d'));
        });

        it('padding gets applied', () => {
            cy.setDimensions('melody_toolbar_padding', {
                linked: true,
                values: [6],
            });

            cy
                .getPreview()
                .find('[data-cy="toolbar"]')
                .should('have.css', 'padding', '6px');
        });
    });

    describe('primary controls', () => {
        it('controls width gets applied', () => {
            cy.setSlider('melody_toolbar_primary_controls_width', 'size', 50);

            cy
                .getPreview()
                .find('.melody-controls-primary')
                .should('have.css', 'flex-basis', '50%');
        });

        it('order gets applied', () => {
            cy.setInput('melody_toolbar_primary_controls_order', 2);

            cy
                .getPreview()
                .find('.melody-controls-primary')
                .should('have.css', 'order', '2');
        });
    });

    describe('secondary controls', () => {
        it('controls width gets applied', () => {
            cy.setSlider('melody_toolbar_secondary_controls_width', 'size', 50);

            cy
                .getPreview()
                .find('.melody-controls-secondary')
                .should('have.css', 'flex-basis', '50%');
        });

        it('order gets applied', () => {
            cy.setInput('melody_toolbar_secondary_controls_order', 3);

            cy
                .getPreview()
                .find('.melody-controls-secondary')
                .should('have.css', 'order', '3');
        });
    });

    describe('track info', () => {
        it('track info width gets applied', () => {
            cy.setSlider('melody_toolbar_trackinfo_width', 'size', 100);

            cy
                .getPreview()
                .find('[data-cy="track-info"]')
                .should('have.css', 'flex-basis', '100%');
        });

        it('order gets applied', () => {
            cy.setInput('melody_toolbar_trackinfo_order', 1);

            cy
                .getPreview()
                .find('[data-cy="track-info"]')
                .should('have.css', 'order', '1');
        });
    });
});
