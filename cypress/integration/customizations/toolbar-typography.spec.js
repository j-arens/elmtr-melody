import * as utils from '../../support/utils';

describe('toolbar typography customizations', () => {
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
            .toggleAccordion('section_melody_typography');
    });

    describe('track title and artist customizations', () => {
        it('font style customization gets applied', () => {
            cy.setFontStyle('melody_toolbar_title_typography', {
                family: ['[data-setting="melody_toolbar_title_font_family"]', 'Indie Flower'],
                size: ['melody_toolbar_title_font_size', 40],
                weight: ['.elementor-control-melody_toolbar_title_font_weight select', '400'],
                transform: ['.elementor-control-melody_toolbar_title_text_transform select', 'none'],
                style: ['.elementor-control-melody_toolbar_title_font_style select', 'normal'],
                decoration: ['.elementor-control-melody_toolbar_title_text_decoration select', 'underline'],
                lineHeight: ['melody_toolbar_title_line_height', 1.3],
                letterSpacing: ['melody_toolbar_title_letter_spacing', 1],
            });

            ['[data-cy="track-title"]', '[data-cy="track-artist"]'].forEach(selector => {
                cy
                    .getPreview()
                    .find(selector)
                    .should('have.css', 'font-family', '"Indie Flower", sans-serif')
                    .should('have.css', 'font-size', '40px')
                    .should('have.css', 'text-transform', 'none')
                    .should('have.css', 'font-style', 'normal')
                    .should('have.css', 'line-height', '52px')
                    .should('have.css', 'letter-spacing', '1px');

                cy
                    .getPreview()
                    .find(selector)
                    .then($el => expect($el).css('font-weight').match(/400|regular/));

                cy
                    .getPreview()
                    .find(selector)
                    .then($el => expect($el).css('text-decoration').match(/^underline/));
            });
        });

        it('shadow style customizations gets applied', () => {
            cy.setTextShadow('melody_toolbar_title_text_shadow_text_shadow_type', {
                color: ['#30ace5', 'melody_toolbar_title_text_shadow_text_shadow'],
                blur: ['melody_toolbar_title_text_shadow_text_shadow', 20],
                x: ['melody_toolbar_title_text_shadow_text_shadow', 8],
                y: ['melody_toolbar_title_text_shadow_text_shadow', 4],
            });

            ['[data-cy="track-title"]', '[data-cy="track-artist"]'].forEach(selector => {
                cy
                    .getPreview()
                    .find(selector)
                    .should('have.css', 'text-shadow', `${utils.hexToRgb('#30ace5')} 8px 4px 20px`);
            });
        });

        it('color customization gets applied', () => {
            cy.setColor('#00ffe1', 'melody_toolbar_title_color');

            ['[data-cy="track-title"]', '[data-cy="track-artist"]'].forEach(selector => {
                cy
                    .getPreview()
                    .find(selector)
                    .should('have.css', 'color', utils.hexToRgb('#00ffe1'));
            });
        });
    });

    describe('time customizations', () => {
        it('font style customization gets applied', () => {
            cy.setFontStyle('melody_toolbar_time_typography', {
                family: ['[data-setting="melody_toolbar_time_font_family"]', 'Indie Flower'],
                size: ['melody_toolbar_time_font_size', 40],
                weight: ['.elementor-control-melody_toolbar_time_font_weight select', '400'],
                transform: ['.elementor-control-melody_toolbar_time_text_transform select', 'none'],
                style: ['.elementor-control-melody_toolbar_time_font_style select', 'normal'],
                decoration: ['.elementor-control-melody_toolbar_time_text_decoration select', 'underline'],
                lineHeight: ['melody_toolbar_time_line_height', 1.3],
                letterSpacing: ['melody_toolbar_time_letter_spacing', 1],
            });

            ['[data-cy="time-elapsed"]', '[data-cy="time-left"]'].forEach(selector => {
                cy
                    .getPreview()
                    .find(selector)
                    .should('have.css', 'font-family', '"Indie Flower", sans-serif')
                    .should('have.css', 'font-size', '40px')
                    .should('have.css', 'text-transform', 'none')
                    .should('have.css', 'font-style', 'normal')
                    .should('have.css', 'line-height', '52px')
                    .should('have.css', 'letter-spacing', '1px');

                cy
                    .getPreview()
                    .find(selector)
                    .then($el => expect($el).css('font-weight').match(/400|regular/));

                cy
                    .getPreview()
                    .find(selector)
                    .then($el => expect($el).css('text-decoration').match(/^underline/));
            });
        });

        it('shadow style customizations gets applied', () => {
            cy.setTextShadow('melody_toolbar_time_text_shadow_text_shadow_type', {
                color: ['#30ace5', 'melody_toolbar_time_text_shadow_text_shadow'],
                blur: ['melody_toolbar_time_text_shadow_text_shadow', 20],
                x: ['melody_toolbar_time_text_shadow_text_shadow', 8],
                y: ['melody_toolbar_time_text_shadow_text_shadow', 4],
            });

            ['[data-cy="time-elapsed"]', '[data-cy="time-left"]'].forEach(selector => {
                cy
                    .getPreview()
                    .find(selector)
                    .should('have.css', 'text-shadow', `${utils.hexToRgb('#30ace5')} 8px 4px 20px`);
            });
        });

        it('color customization gets applied', () => {
            cy.setColor('#00ffe1', 'melody_toolbar_time_color');

            ['[data-cy="time-elapsed"]', '[data-cy="time-left"]'].forEach(selector => {
                cy
                    .getPreview()
                    .find(selector)
                    .should('have.css', 'color', utils.hexToRgb('#00ffe1'));
            });
        });
    });

    // @TODO: test psuedo element delimiter
    // @TODO: test psuedo element font styles
    // @TODO: test psuedo element color
    describe('seperator customizations', () => {
        // it('font style customization gets applied', () => {
        //     cy.setFontStyle('melody_toolbar_separator_font_typography', {
        //         family: ['[data-setting="melody_toolbar_separator_font_font_family"]', 'Indie Flower'],
        //         size: ['melody_toolbar_separator_font_font_size', 40],
        //         weight: ['.elementor-control-melody_toolbar_separator_font_font_weight select', '400'],
        //         transform: ['.elementor-control-melody_toolbar_separator_font_text_transform select', 'none'],
        //         style: ['.elementor-control-melody_toolbar_separator_font_font_style select', 'normal'],
        //         decoration: ['.elementor-control-melody_toolbar_separator_font_text_decoration select', 'underline'],
        //         lineHeight: ['melody_toolbar_separator_font_line_height', 1.3],
        //         letterSpacing: ['melody_toolbar_separator_font_letter_spacing', 1],
        //     });

        //     cy
        //         .getPreview()
        //         .find('[data-cy="seperator"]')
        //         .should('have.css', 'font-family', '"Indie Flower", sans-serif')
        //         .should('have.css', 'font-size', '40px')
        //         .should('have.css', 'text-transform', 'none')
        //         .should('have.css', 'font-style', 'normal')
        //         .should('have.css', 'line-height', '52px')
        //         .should('have.css', 'letter-spacing', '1px');

        //     cy
        //         .getPreview()
        //         .find('[data-cy="seperator"]')
        //         .then($el => expect($el).css('font-weight').match(/400|regular/));

        //     cy
        //         .getPreview()
        //         .find('[data-cy="seperator"]')
        //         .then($el => expect($el).css('text-decoration').match(/^underline/));
        // });

        it('spacing gets applied', () => {
            cy.setSlider('melody_toolbar_typography_separator_spacing', 'size', 20);

            cy
                .getPreview()
                .find('[data-cy="seperator"]')
                .should('have.css', 'margin', '0px 20px');
        });
    });
});
