import * as utils from '../../support/utils';

describe('next button', () => {
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
            .addTrack(8003)
            .wait(1500);
    });

    it('advances to the next track', () => {
        cy
            .getPreview()
            .find('[data-cy~="next"]')
            .click()
            .window()
            .then(window => {
                const { MELODY: { audioInterface } } =  utils.getPreviewWindow(window);
                expect(audioInterface.src).to.contain('exhale-by-jeremy-blake.mp3');
            });
    });
});
