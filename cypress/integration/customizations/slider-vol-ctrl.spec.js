import * as utils from '../../support/utils';

describe('slider volume control customizations', () => {
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
            .toggleAccordion('section_melody_slider_vol_control_style');
    });
    
    it('color customization gets applied', () => {
        cy.setColor('#3eefc0', 'melody_slider_vol_control_primary_color');

        cy
            .getPreview()
            .find('[data-cy="vol-ctrl"]')
            .should('have.css', 'color', utils.hexToRgb('#3eefc0'));
    });

    it('size customization gets applied', () => {
        cy.setSlider('melody_slider_vol_control_max_width', 'size', 25);

        cy
            .getPreview()
            .find('[data-cy="vol-ctrl"]')
            .should('have.css', 'max-width', '25px');
    });
});
