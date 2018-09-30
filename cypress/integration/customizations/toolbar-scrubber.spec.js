import * as utils from '../../support/utils';

describe('toolbar sliders customizations', () => {
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
            .toggleAccordion('section_toolbar_scrubber_style');
    });

    it('primary color customization gets applied', () => {
        cy.setColor('#c7c7f9', 'melody_toolbar_scrubber_primary_color');

        cy
            .getPreview()
            .find('[data-cy="slider-body"]')
            .should('have.css', 'background-color', utils.hexToRgb('#c7c7f9'));
    });

    it('secondary color customization gets applied', () => {
        cy.setColor('#4eb285', 'melody_toolbar_scrubber_secondary_color');

        cy
            .getPreview()
            .find('[data-cy="slider-backfill"]')
            .should('have.css', 'background-color', utils.hexToRgb('#4eb285'));
    });

    it('handle color customization gets applied', () => {
        cy.setColor('#ff0a0a', 'melody_toolbar_scrubber_handle_color');

        cy
            .getPreview()
            .find('[data-cy="slider-handle"]')
            .should('have.css', 'background-color', utils.hexToRgb('#ff0a0a'));
    });
});
