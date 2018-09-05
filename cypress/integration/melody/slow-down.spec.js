import * as utils from '../../support/utils';

describe('slow down control', () => {
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

    it('decreases playback speed to -0.75', () => {
        cy
            .getPreview()
            .find('[data-cy="dock-toggle"]')
            .click()
            .getPreview()
            .find('[data-cy="slow-down"]')
            .click()
            .window()
            .then(window => {
                const { MELODY: { audioInterface } } =  utils.getPreviewWindow(window);
                expect(audioInterface.playbackRate).to.equal(0.75);
            })
            .getPreview()
            .find('[data-cy~="catalyst"]')
            .should('have.attr', 'data-playbackrate', '-0.75');
    });

    it('decreases playback speed to -0.5', () => {
        cy
            .getPreview()
            .find('[data-cy="slow-down"]')
            .click()
            .window()
            .then(window => {
                const { MELODY: { audioInterface } } =  utils.getPreviewWindow(window);
                expect(audioInterface.playbackRate).to.equal(0.5);
            })
            .getPreview()
            .find('[data-cy~="catalyst"]')
            .should('have.attr', 'data-playbackrate', '-0.5');
    });

    it('should be disabled if speed is at -0.5', () => {
        cy
            .getPreview()
            .find('[data-cy="slow-down"]')
            .should('have.css', 'cursor', 'not-allowed')
            .should('have.css', 'opacity', '0.5')
            .click()
            .window()
            .then(window => {
                const { MELODY: { audioInterface } } =  utils.getPreviewWindow(window);
                expect(audioInterface.playbackRate).to.equal(0.5);
            });
    });
});
