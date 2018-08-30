import * as utils from '../../support/utils';

describe('toolbar track info customizations', () => {
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
            .toggleAccordion('section_melody_toolbar_trackinfo');
    });

    it('bottom margin gets applied', () => {
        cy.setSlider('melody_toolbar_trackinfo_margin_bottom', 'size', 20);

        cy
            .getPreview()
            .find('[data-cy="inner-track-info"]')
            .should('have.css', 'margin-bottom', '20px');
    });

    it('padding gets applied', () => {
        cy.setDimensions('melody_toolbar_trackinfo_padding', {
            linked: false,
            values: [0, 10, 0, 10],
        });

        cy
            .getPreview()
            .find('[data-cy="track-info"]')
            .should('have.css', 'padding', '0px 10px');
    });
});
