import * as utils from '../../support/utils';

describe('catalyst button', () => {
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

    it('plays audio', () => {
        cy
            .getPreview()
            .find('[data-cy~="catalyst"]')
            .click()
            .wait(1000)
            .window()
            .then(window => {
                const { MELODY: { audioInterface } } =  utils.getPreviewWindow(window);
                expect(audioInterface.played.length).to.be.greaterThan(0);
                expect(audioInterface.paused).to.be.false;
            });
    });

    it('pauses audio', () => {
        cy
            .getPreview()
            .find('[data-cy~="catalyst"]')
            .click()
            .window()
            .then(window => {
                const { MELODY: { audioInterface } } =  utils.getPreviewWindow(window);
                expect(audioInterface.paused).to.be.true;
            });
    });
});
