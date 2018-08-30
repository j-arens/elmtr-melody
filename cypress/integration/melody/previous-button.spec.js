import * as utils from '../../support/utils';

describe('previous button', () => {
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

    it('restarts the track if it\'s the only one loaded', () => {
        cy
            .getPreview()
            .find('[data-cy~="catalyst"]')
            .click()
            .wait(1000)
            .click()
            .getPreview()
            .find('[data-cy~="prev"]')
            .click()
            .window()
            .then(window => {
                const { MELODY: { audioInterface } } =  utils.getPreviewWindow(window);
                expect(audioInterface.currentTime).to.eq(0);
                expect(audioInterface.src).to.contain('sunspots-by-jeremy-blake.mp3');
            });
    });

    it('skips to the previous track', () => {
        cy
            .addTrack(8003)
            .wait(1000)
            .getPreview()
            .find('[data-cy~="prev"]')
            .click()
            .window()
            .then(window => {
                const { MELODY: { audioInterface } } =  utils.getPreviewWindow(window);
                expect(audioInterface.src).to.contain('exhale-by-jeremy-blake.mp3');
            });
    });
});
