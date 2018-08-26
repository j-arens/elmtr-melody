import * as utils from '../../support/utils';

describe('slider sliders customizations', () => {
    before(() => {
        cy.login('admin', 'z');
        cy.visit(utils.elementorEditor(9900));
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
            .toggleAccordion('section_sliders_style');
    });

    // @TODO: test before psuedo element color
    // it('primary color customization gets applied', () => {
        
    // });

    // @TODO: test after psuedo element color
    // it('bg color customization gets applied', () => {

    // });

    it('handle color customization gets applied', () => {
        cy.setColor('#130dd8', 'melody_sliders_handle_color');

        cy
            .getPreview()
            .find('[data-cy="glider-handle"]')
            .should('have.css', 'background-color', utils.hexToRgb('#130dd8'));
    });
});
