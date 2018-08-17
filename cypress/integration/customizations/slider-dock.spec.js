import * as utils from '../../support/utils';

describe('slider dock customizations', () => {
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
            .toggleAccordion('section_melody_slider_dock');
    });

    describe('dock toggle customizations', () => {
        it('color customization gets applied', () => {
            cy.setColor('melody_slider_dock_toggle_primary_color', '#28dfef');

            cy
                .getPreview()
                .find('[data-cy="dock-toggle"]')
                .should('have.css', 'color', utils.hexToRgb('#28dfef'));
        });

        it('size customiztion gets applied', () => {
            cy.setSlider('melody_slider_dock_toggle_max_width', 'size', 25);

            cy
                .getPreview()
                .find('[data-cy="dock-toggle"]')
                .should('have.css', 'max-width', '25px');
        });
    });

    describe('dock controls customizations', () => {
        before(() => {
            cy.getPreview().find('[data-cy="dock-toggle"]').click();
        });

        after(() => {
            cy.getPreview().find('[data-cy="dock-toggle"]').click();
        });

        it('primary color customization gets applied', () => {
            cy.setColor('melody_slider_dock_controls_primary_color', '#23a455');

            cy
                .getPreview()
                .find('[data-cy="dock-controls"]')
                .should('have.css', 'background-color', utils.hexToRgb('#23a455'));
        });

        // @TODO: test psuedo element color
        // it('secondary color customization gets applied', () => {
        //     cy.setColor('melody_slider_dock_controls_secondary_color', '#242dd6');

        //     cy
        //         .getPreview()
        //         .find('[data-cy="dock-controls"] button')
        //         .should('have.css', 'before::background-color', utils.hexToRgb('#242dd6'));
        // });

        it('border color customization gets applied', () => {
            cy.setColor('melody_slider_dock_controls_border_color', '#d82bd8');

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
            cy.setColor('melody_slider_dock_controls_icon_color', '#ff0f0f');

            cy
                .getPreview()
                .find('[data-cy="dock-controls-wrap"] svg')
                .should('have.css', 'fill', utils.hexToRgb('#ff0f0f'));
        });

        it('text color customization gets applied', () => {
            cy.setColor('melody_slider_dock_controls_text_color', '#4f0f2f');

            cy
                .getPreview()
                .find('[data-cy="dock-controls-wrap"] button')
                .should('have.css', 'color', utils.hexToRgb('#4f0f2f'));
        });

        // @TODO: test font style customizations
    });
});
