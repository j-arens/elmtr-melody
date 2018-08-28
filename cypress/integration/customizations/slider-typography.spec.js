import * as utils from '../../support/utils';

describe('slider typography customizations', () => {
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
            .toggleAccordion('section_melody_typography');
    });

    describe('track title customizations', () => {
        it('font style customization gets applied', () => {
            cy.setFontStyle('melody_title_typography', {
                family: ['[data-setting="melody_title_font_family"]', 'Indie Flower'],
                size: ['melody_title_font_size', 40],
                weight: ['.elementor-control-melody_title_font_weight select', '400'],
                transform: ['.elementor-control-melody_title_text_transform select', 'none'],
                style: ['.elementor-control-melody_title_font_style select', 'normal'],
                decoration: ['.elementor-control-melody_title_text_decoration select', 'underline'],
                lineHeight: ['melody_title_line_height', 1.3],
                letterSpacing: ['melody_title_letter_spacing', 1],
            });

            cy
                .getPreview()
                .find('[data-cy="track-title"]')
                .should('have.css', 'font-family', '"Indie Flower", sans-serif')
                .should('have.css', 'font-size', '40px')
                .should('have.css', 'text-transform', 'none')
                .should('have.css', 'font-style', 'normal')
                .should('have.css', 'line-height', '52px')
                .should('have.css', 'letter-spacing', '1px');

            cy
                .getPreview()
                .find('[data-cy="track-title"]')
                .then($el => expect($el).css('font-weight').match(/400|regular/));

            cy
                .getPreview()
                .find('[data-cy="track-title"]')
                .then($el => expect($el).css('text-decoration').match(/^underline/));
        });

        it('shadow style customizations gets applied', () => {
            cy.setTextShadow('melody_title_text_shadow_text_shadow_type', {
                color: ['#30ace5', 'melody_title_text_shadow_text_shadow'],
                blur: ['melody_title_text_shadow_text_shadow', 20],
                x: ['melody_title_text_shadow_text_shadow', 8],
                y: ['melody_title_text_shadow_text_shadow', 4],
            });

            cy
                .getPreview()
                .find('[data-cy="track-title"]')
                .should('have.css', 'text-shadow', `${utils.hexToRgb('#30ace5')} 8px 4px 20px`);
        });

        it('color customization gets applied', () => {
            cy.setColor('#00ffe1', 'melody_title_color');

            cy
                .getPreview()
                .find('[data-cy="track-title"]')
                .should('have.css', 'color', utils.hexToRgb('#00ffe1'));
        });
    });

    describe('artist title customizations', () => {
        it('font style customization gets applied', () => {
            cy.setFontStyle('melody_artist_typography', {
                family: ['[data-setting="melody_artist_font_family"]', 'Source Sans Pro'],
                size: ['melody_artist_font_size', 22],
                weight: ['.elementor-control-melody_artist_font_weight select', 'bold'],
                transform: ['.elementor-control-melody_artist_text_transform select', 'uppercase'],
                style: ['.elementor-control-melody_artist_font_style select', 'normal'],
                decoration: ['.elementor-control-melody_artist_text_decoration select', 'underline'],
                lineHeight: ['melody_artist_line_height', 1],
                letterSpacing: ['melody_artist_letter_spacing', 2],
            });

            cy
                .getPreview()
                .find('[data-cy="track-artist"]')
                .should('have.css', 'font-family', '"Source Sans Pro", sans-serif')
                .should('have.css', 'font-size', '22px')
                .should('have.css', 'text-transform', 'uppercase')
                .should('have.css', 'font-style', 'normal')
                .should('have.css', 'line-height', '22px')
                .should('have.css', 'letter-spacing', '2px');

            cy
                .getPreview()
                .find('[data-cy="track-artist"]')
                .then($el => expect($el).css('font-weight').match(/700|bold/));

            cy
                .getPreview()
                .find('[data-cy="track-title"]')
                .then($el => expect($el).css('text-decoration').match(/^underline/));
        });

        it('shadow style customizations gets applied', () => {
            cy.setTextShadow('melody_artist_text_shadow_text_shadow_type', {
                color: ['#f470bf', 'melody_artist_text_shadow_text_shadow'],
                blur: ['melody_artist_text_shadow_text_shadow', 15],
                x: ['melody_artist_text_shadow_text_shadow', 2],
                y: ['melody_artist_text_shadow_text_shadow', 6],
            });

            cy
                .getPreview()
                .find('[data-cy="track-artist"]')
                .should('have.css', 'text-shadow', `${utils.hexToRgb('#f470bf')} 2px 6px 15px`);
        });

        it('color customization gets applied', () => {
            cy.setColor('#f3a5ff', 'melody_artist_color');

            cy
                .getPreview()
                .find('[data-cy="track-artist"]')
                .should('have.css', 'color', utils.hexToRgb('#f3a5ff'));
        });
    });

    describe('time font customizations', () => {
        it('font style customization gets applied', () => {
            cy.setFontStyle('melody_time_typography', {
                family: ['[data-setting="melody_time_font_family"]', 'Muli'],
                size: ['melody_time_font_size', 21],
                weight: ['.elementor-control-melody_time_font_weight select', 'bold'],
                transform: ['.elementor-control-melody_time_text_transform select', 'lowercase'],
                style: ['.elementor-control-melody_time_font_style select', 'normal'],
                decoration: ['.elementor-control-melody_time_text_decoration select', 'overline'],
                lineHeight: ['melody_time_line_height', 2.4],
                letterSpacing: ['melody_time_letter_spacing', 1.3],
            });

            ['[data-cy="time-elapsed"]', '[data-cy="time-left"]'].forEach(selector => {
                cy
                    .getPreview()
                    .find(selector)
                    .should('have.css', 'font-family', 'Muli, sans-serif')
                    .should('have.css', 'font-size', '21px')
                    .should('have.css', 'text-transform', 'lowercase')
                    .should('have.css', 'font-style', 'normal')
                    .should('have.css', 'line-height', '50.4px')
                    .should('have.css', 'letter-spacing', '1.3px');

                cy
                    .getPreview()
                    .find(selector)
                    .then($el => expect($el).css('font-weight').match(/700|bold/));

                cy
                    .getPreview()
                    .find(selector)
                    .then($el => expect($el).css('text-decoration').match(/^overline/));
            });
        });

        it('shadow style customizations gets applied', () => {
            cy.setTextShadow('melody_time_text_shadow_text_shadow_type', {
                color: ['#f21852', 'melody_time_text_shadow_text_shadow'],
                blur: ['melody_time_text_shadow_text_shadow', 9],
                x: ['melody_time_text_shadow_text_shadow', 4],
                y: ['melody_time_text_shadow_text_shadow', 3],
            });

            ['[data-cy="time-elapsed"]', '[data-cy="time-left"]'].forEach(selector => {
                cy
                    .getPreview()
                    .find(selector)
                    .should('have.css', 'text-shadow', `${utils.hexToRgb('#f21852')} 4px 3px 9px`);
            });
        });

        it('color customization gets applied', () => {
            cy.setColor('#ff8e8e', 'melody_time_color');

            ['[data-cy="time-elapsed"]', '[data-cy="time-left"]'].forEach(selector => {
                cy
                    .getPreview()
                    .find(selector)
                    .should('have.css', 'color', utils.hexToRgb('#ff8e8e'));
            });
        });
    });
});
