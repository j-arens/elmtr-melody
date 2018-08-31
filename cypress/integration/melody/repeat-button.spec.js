import * as utils from '../../support/utils';

describe('repeat button', () => {
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

    it('toggles repeat', () => {
        cy
            .getPreview()
            .find('[data-cy~="repeat"]')
            .click()
            .window()
            .then(window => {
                const { MELODY: { audioInterface } } =  utils.getPreviewWindow(window);
                expect(audioInterface.loop).to.be.true;
            })
            .getPreview()
            .find('[data-cy~="repeat"]')
            .click()
            .window()
            .then(window => {
                const { MELODY: { audioInterface } } =  utils.getPreviewWindow(window);
                expect(audioInterface.loop).to.be.false;
            });
    });
});
