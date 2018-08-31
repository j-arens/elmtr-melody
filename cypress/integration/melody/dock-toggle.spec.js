import * as utils from '../../support/utils';

describe('dock toggle', () => {
    before(() => {
        cy
            .login('admin', 'z')
            .visit(utils.elementorEditor(9900))
            .disableUnloadAlert()
            .getPreview()
            .find('[id^="melody-widgetRoot:"]')
            .click()
            .clearTracks()
            .addTrack(8001)
            .wait(1000);
    });

    it('toggles the dock controls', () => {
        cy
            .getPreview()
            .find('[data-cy="dock-toggle"]')
            .click()
            .getPreview()
            .find('[data-cy="dock-controls"]')
            .should('be.visible')
            .getPreview()
            .find('[data-cy="dock-toggle"]')
            .click()
            .getPreview()
            .find('[data-cy="dock-controls"]')
            .should('not.be.visible');
    });
});
