import * as utils from '../../support/utils';

describe('toolbar dock customizations', () => {
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
            .toggleAccordion('section_melody_toolbar_dock');
    });

    describe('dock controls customizations', () => {
        before(() => {
            cy.getPreview().find('[data-cy="dock-toggle"]').click();
        });

        after(() => {
            cy.getPreview().find('[data-cy="dock-toggle"]').click();
        });

        it('primary color customization gets applied', () => {
            cy.setColor('#23a455', 'melody_toolbar_dock_controls_primary_color');

            cy
                .getPreview()
                .find('[data-cy="dock-controls"]')
                .should('have.css', 'background-color', utils.hexToRgb('#23a455'));
        });

        // @TODO: test psuedo element color
        // it('secondary color customization gets applied', () => {
        //     cy.setColor('#242dd6', 'melody_slider_dock_controls_secondary_color');

        //     cy
        //         .getPreview()
        //         .find('[data-cy="dock-controls"] button')
        //         .should('have.css', 'before::background-color', utils.hexToRgb('#242dd6'));
        // });

        it('border color customization gets applied', () => {
            cy.setColor('#d82bd8', 'melody_toolbar_dock_controls_border_color');

            cy
                .getPreview()
                .find('[data-cy="dock-controls-wrap"]')
                .should('have.css', 'border-color', utils.hexToRgb('#d82bd8'));

            cy
                .getPreview()
                .find('[data-cy="dock-controls"] button + button')
                .should('have.css', 'border-top-color', utils.hexToRgb('#d82bd8'));
        });

        it('icon color customization gets applied', () => {
            cy.setColor('#ff0f0f', 'melody_toolbar_dock_controls_icon_color');

            cy
                .getPreview()
                .find('[data-cy="dock-controls-wrap"] svg')
                .should('have.css', 'fill', utils.hexToRgb('#ff0f0f'));
        });

        it('text color customization gets applied', () => {
            cy.setColor('#4f0f2f', 'melody_toolbar_dock_controls_text_color');

            cy
                .getPreview()
                .find('[data-cy="dock-controls-wrap"] button')
                .should('have.css', 'color', utils.hexToRgb('#4f0f2f'));
        });

        it('font style customizations get applied', () => {
            cy.setFontStyle('melody_toolbar_dock_controls_font_typography', {
                family: ['[data-setting="melody_toolbar_dock_controls_font_font_family"]', 'Suez One'],
                size: ['melody_toolbar_dock_controls_font_font_size', 13],
                weight: ['.elementor-control-melody_toolbar_dock_controls_font_font_weight select', '700'],
                transform: ['.elementor-control-melody_toolbar_dock_controls_font_text_transform select', 'uppercase'],
                style: ['.elementor-control-melody_toolbar_dock_controls_font_font_style select', 'italic'],
                decoration: ['.elementor-control-melody_toolbar_dock_controls_font_text_decoration select', 'underline'],
                lineHeight: ['melody_toolbar_dock_controls_font_line_height', 1.9],
                letterSpacing: ['melody_toolbar_dock_controls_font_letter_spacing', 1.8],
            });

            cy
                .getPreview()
                .find('[data-cy="dock-controls-wrap"] button')
                .should('have.css', 'font-family', '"Suez One", sans-serif')
                .should('have.css', 'font-size', '13px')
                .should('have.css', 'text-transform', 'uppercase')
                .should('have.css', 'font-style', 'italic')
                .should('have.css', 'line-height', '24.7px')
                .should('have.css', 'letter-spacing', '1.8px');

            cy
                .getPreview()
                .find('[data-cy="dock-controls-wrap"] button', { multiple: true })
                .then($el => expect($el).css('font-weight').match(/700|bold/));

            cy
                .getPreview()
                .find('[data-cy="dock-controls-wrap"] button', { multiple: true })
                .then($el => expect($el).css('text-decoration').match(/^underline/));
        });
    });
});
