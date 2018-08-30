import * as utils from '../../support/utils';

describe('toolbar button customizations', () => {
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

        cy.selectTab('style');
    });

    describe('color customizations', () => {
        it('primary color gets applied', () => {
            cy.setColor('#2a7df9', 'melody_toolbar_btn_primary_color');

            cy
                .getPreview()
                .find('[data-cy~="ctrl"]')
                .should('have.css', 'color', utils.hexToRgb('#2a7df9'));

            cy
                .getPreview()
                .find('[data-cy="vol-ctrl"]')
                .should('have.css', 'color', utils.hexToRgb('#2a7df9'));
        });

        it('secondary color gets applied', () => {
            cy.setColor('#ed5a9e', 'melody_toolbar_btn_hover_color');

            cy
                .getPreview()
                .find('[data-cy~="ctrl"]')
                .each($btn => $btn.addClass('melody-c-btn-hover-color--hovered'))
                .should('have.css', 'color', utils.hexToRgb('#ed5a9e'))
                .each($btn => $btn.removeClass('melody-c-btn-hover-color--hovered'));
        });

        it('enabled color gets applied', () => {
            cy.setColor('#33f230', 'melody_toolbar_btn_on_color');

            cy
                .getPreview()
                .find('.melody-shuffle', '.melody-repeat')
                .each($btn => $btn.addClass('melody-c-on-color--enabled'))
                .should('have.css', 'color', utils.hexToRgb('#33f230'))
                .each($btn => $btn.removeClass('melody-c-on-color--enabled'));
        });
    });

    describe('primary placement customizations', () => {
        it('size gets applied', () => {
            cy.setSlider('melody_toolbar_btns_primary_max_width', 'size', 20);

            cy
                .getPreview()
                .find('.melody-controls-primary [data-cy~="ctrl"]')
                .should('have.css', 'max-width', '20px');
        });

        it('spacing gets applied', () => {
            cy.setSlider('melody_toolbar_btns_primary_space', 'size', 22);

            cy
                .getPreview()
                .find('.melody-controls-primary [data-cy~="ctrl"]:not(:first-child)')
                .should('have.css', 'margin-left', '22px');
        });

        it('alignment gets applied', () => {
            cy.setChoices('melody_toolbar_btns_primary_flex_alignment', 0);

            cy
                .getPreview()
                .find('.melody-controls-primary')
                .should('have.css', 'justify-content', 'flex-start');
        });
    });

    describe('secondary placement customizations', () => {
        it('size gets applied', () => {
            cy.setSlider('melody_toolbar_btns_secondary_max_width', 'size', 20);

            cy
                .getPreview()
                .find('.melody-controls-secondary [data-cy~="ctrl"]')
                .should('have.css', 'max-width', '20px');
        });

        it('spacing gets applied', () => {
            cy.setSlider('melody_toolbar_btns_secondary_space', 'size', 22);

            cy
                .getPreview()
                .find('.melody-controls-secondary [data-cy~="ctrl"]:not(:first-child)')
                .should('have.css', 'margin-left', '22px');
        });

        it('alignment gets applied', () => {
            cy.setChoices('melody_toolbar_btns_secondary_flex_alignment', 2);

            cy
                .getPreview()
                .find('.melody-controls-secondary')
                .should('have.css', 'justify-content', 'flex-end');
        });
    });
});
