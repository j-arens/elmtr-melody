import * as utils from '../../support/utils';

describe('shuffle button', () => {
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

    it('toggles shuffle', () => {
        cy
            .getPreview()
            .find('[data-cy~="shuffle"]')
            .click()
            .window()
            .then(window => {
                const { MELODY: { store } } =  utils.getPreviewWindow(window);
                expect(store.getState().audio.shuffle).to.be.true;
            })
            .getPreview()
            .find('[data-cy~="shuffle"]')
            .click()
            .window()
            .then(window => {
                const { MELODY: { store } } =  utils.getPreviewWindow(window);
                expect(store.getState().audio.shuffle).to.be.false;
            });
    });
});
