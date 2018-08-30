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

    it('image filter customizations get applied', () => {
        cy.setImageFilter('meldoy_slider_preview_image_filters_css_filter', {
            blur: ['meldoy_slider_preview_image_filters_blur', 1.2],
            brightness: ['meldoy_slider_preview_image_filters_brightness', 34],
            contrast: ['meldoy_slider_preview_image_filters_contrast', 65],
            saturation: ['meldoy_slider_preview_image_filters_saturate', 177],
            hue: ['meldoy_slider_preview_image_filters_hue', 219],
        });

        cy
            .getPreview()
            .find('[data-cy="track-artwork"]')
            .should('have.css', 'filter', 'brightness(0.34) contrast(0.65) saturate(1.77) blur(1.2px) hue-rotate(219deg)');
    });

    it('slide animation duration gets applied', () => {
        cy.setSlider('melody_preview_animation_duration', 'size', 400);

        cy
            .getPreview()
            .find('[data-cy="artwork-slider"]')
            .should('have.css', 'transition-duration', '0.4s');
    });

    it('slider animation timing function gets applied', () => {
        cy.get('.elementor-control-melody_preview_animation_timing select').select('ease-in-out');

        cy
            .getPreview()
            .find('[data-cy="artwork-slider"]')
            .should('have.css', 'transition-timing-function', 'ease-in-out');
    });
});
