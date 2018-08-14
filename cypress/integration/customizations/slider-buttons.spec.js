import * as utils from '../../support/utils';

describe('slider button customizations', () => {
    before(() => {
        cy.login('admin', 'z');
        cy.visit(utils.elementorEditor(9900));

        cy
            .getPreview()
            .find('[id^="melody-widgetRoot:"]')
            .click();
    });

    describe('color customizations', () => {
        beforeEach(() => {
            if (!utils.widgetHasTracks()) {
                cy.addTrack(8001);
            }
        });

        it('primary color customization gets applied', () => {
            cy
                .selectTab('style')
                .setColor('melody_slider_buttons_primary_color', '#bada55');

            cy
                .getPreview()
                .find('.melody-playbackCtrl')
                .should('have.css', 'color', utils.hexToRgb('#bada55'));
        });

        it('hover color customization gets applied', () => {
            cy
                .selectTab('style')
                .setColor('melody_slider_buttons_hover_color', '#0d9df7');

            cy
                .getPreview()
                .find('.melody-playbackCtrl')
                .each($btn => $btn.addClass('melody-c-btn-hover-color--hovered'))
                .should('have.css', 'color', utils.hexToRgb('#0d9df7'))
                .each($btn => $btn.removeClass('melody-c-btn-hover-color--hovered'));
        });

        it('enabled color customization gets applied', () => {
            cy
                .selectTab('style')
                .setColor('melody_slider_buttons_on_color', '#e62b2b');

            cy
                .getPreview()
                .find('.melody-shuffle', '.melody-repeat')
                .each($btn => $btn.addClass('melody-c-on-color--enabled'))
                .should('have.css', 'color', utils.hexToRgb('#e62b2b'))
                .each($btn => $btn.removeClass('melody-c-on-color--enabled'));
        });
    });
});
