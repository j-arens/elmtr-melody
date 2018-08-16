import * as utils from '../../support/utils';

describe('slider controlbar customizations', () => {
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
            .toggleAccordion('section_melody_controlbar_style');
    });

    it('padding customization gets applied', () => {
        cy.setDimensions('melody_slider_control_bar_padding', {
            linked: true,
            values: [35],
        });

        cy
            .getPreview()
            .find('[data-cy="controlbar"]')
            .should('have.css', 'padding', '35px');
    });

    it('background color customization gets applied', () => {
        cy.setColor('melody_slider_control_bar_bg_color', '#697b7b');

        cy
            .getPreview()
            .find('[data-cy="controlbar"]')
            .should('have.css', 'background-color', utils.hexToRgb('#697b7b'));
    });

    // it('box shadow customization gets applied', () => {
    //     cy.setBoxShadow('melody_slider_control_bar_box_shadow_box_shadow_type', {
    //         color: ctx => ctx.setColor('melody_slider_control_bar_box_shadow_box_shadow', '#0c0003'),
    //         x: ctx => ctx.setSlider('melody_slider_control_bar_box_shadow_box_shadow', 'horizontal', 20),
    //         y: ctx => ctx.setSlider('melody_slider_control_bar_box_shadow_box_shadow', 'vertical', 20),
    //         blur: ctx => ctx.setSlider('melody_slider_control_bar_box_shadow_box_shadow', 'blur', 20),
    //         spread: ctx => ctx.setSlider('melody_slider_control_bar_box_shadow_box_shadow', 'spread', 20),
    //         position: ctx => ctx.get('[data-setting="melody_slider_control_bar_box_shadow_box_shadow_position"]').select(' '),
    //     });
    // });
});
