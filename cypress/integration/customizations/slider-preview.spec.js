import * as utils from '../../support/utils';

describe('slider preview customizations', () => {
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
            .toggleAccordion('section_melody_preview');
    });

    it('background color customization gets applied', () => {
        cy.setColor('#61ce70', 'melody_preview_bg_color');

        cy
            .getPreview()
            .find('[data-cy="preview"]')
            .should('have.css', 'background-color', utils.hexToRgb('#61ce70'));
    });

    it('min-height customization gets applied', () => {
        cy.setInput('melody_preview_min_height', 250);

        cy
            .getPreview()
            .find('[data-cy="preview"]')
            .should('have.css', 'min-height', '250px');
    });

    it('padding customization gets applied', () => {
        cy.setDimensions('melody_preview_padding', {
            linked: true,
            values: [35],
        });

        cy
            .getPreview()
            .find('[data-cy="preview"]')
            .should('have.css', 'padding', '35px')
    });

    it('image size customization gets applied', () => {
        cy.setSlider('melody_preview_image_size', 'size', 85);

        cy
            .getPreview()
            .find('[data-cy="track-artwork"]')
            .should('have.css', 'background-size', '85%');
    });

    it('image repeat customization gets applied', () => {
        cy.get('[data-setting="melody_preview_image_repeat"]').select('repeat');

        cy
            .getPreview()
            .find('[data-cy="track-artwork"]')
            .should('have.css', 'background-repeat', 'repeat');
    });

    it('image position customization gets applied', () => {
        cy.get('[data-setting="melody_preview_image_position"]').select('right bottom');

        cy
            .getPreview()
            .find('[data-cy="track-artwork"]')
            .should('have.css', 'background-position', '100% 100%');
    });

    it('image attachment customization gets applied', () => {
        cy.get('[data-setting="melody_preview_image_attachment"]').select('fixed');

        cy
            .getPreview()
            .find('[data-cy="track-artwork"]')
            .should('have.css', 'background-attachment', 'fixed');
    });

    // @TODO: image filter customization tests
    // it('image filter customizations get applied', () => {

    // });
});
