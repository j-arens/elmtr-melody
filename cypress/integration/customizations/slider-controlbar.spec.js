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
        cy.setColor('#697b7b', 'melody_slider_control_bar_bg_color');

        cy
            .getPreview()
            .find('[data-cy="controlbar"]')
            .should('have.css', 'background-color', utils.hexToRgb('#697b7b'));
    });

    it('box shadow customization gets applied', () => {
        const handle = 'melody_slider_control_bar_box_shadow_box_shadow_type';
        const innerHandle = 'melody_slider_control_bar_box_shadow_box_shadow';
        const shadow =  {
            color: '#0c0003',
            x: 20,
            y: 20,
            blur: 20,
            spread: 20,
            position: ' ',
        };

        cy.setBoxShadow(handle, innerHandle, shadow);

        cy
            .getPreview()
            .find('[data-cy="controlbar"]')
            .should('have.css', 'box-shadow', `${utils.hexToRgb('#0c0003')} 20px 20px 20px 20px`);
    });
});
