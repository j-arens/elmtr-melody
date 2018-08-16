import * as utils from '../../support/utils';

describe('slider button customizations', () => {
    before(() => {
        cy.login('admin', 'z');
        cy.visit(utils.elementorEditor(9900));
        cy.disableUnloadAlert();

        cy
            .getPreview()
            .find('[id^="melody-widgetRoot:"]')
            .click();
    });

    describe('color customizations', () => {
        before(() => {
            cy
                .clearTracks()
                .addTrack(8001);
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

    describe('placement customizations', () => {
        it('size customization gets applied', () => {
            cy
                .selectTab('style')
                .setSlider('melody_slider_buttons_btn_max_width', 'size', '25');

            cy
                .getPreview()
                .find('.melody-playbackCtrl')
                .should('have.css', 'max-width', '25px');
        });

        it('spacing customization gets applied', () => {
            cy
                .selectTab('style')
                .setSlider('melody_slider_buttons_btn_space', 'size', '40');

            cy
                .getPreview()
                .find('.melody-playbackCtrl:not(:first-child)')
                .should('have.css', 'margin-left', '40px');
        });

        it('alignment customization gets applied', () => {
            cy
                .selectTab('style')
                .setChoices('melody_slider_buttons_btn_flex_alignment', 0);

            cy
                .getPreview()
                .find('[data-cy="controlbar"]')
                .should('have.css', 'justify-content', 'flex-start');
        });
    });
});
