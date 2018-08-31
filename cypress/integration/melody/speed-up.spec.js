import * as utils from '../../support/utils';

describe('speed up control', () => {
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

    it('increases playback speed to 1.25x', () => {
        cy
            .getPreview()
            .find('[data-cy="dock-toggle"]')
            .click()
            .getPreview()
            .find('[data-cy="speed-up"]')
            .click()
            .window()
            .then(window => {
                const { MELODY: { audioInterface } } =  utils.getPreviewWindow(window);
                expect(audioInterface.playbackRate).to.equal(1.25);
            })
            .getPreview()
            .find('[data-cy~="catalyst"]')
            .should('have.attr', 'data-playbackrate', 'x1.25');
    });

    it('increases playback speed to 1.5x', () => {
        cy
            .getPreview()
            .find('[data-cy="speed-up"]')
            .click()
            .window()
            .then(window => {
                const { MELODY: { audioInterface } } =  utils.getPreviewWindow(window);
                expect(audioInterface.playbackRate).to.equal(1.5);
            })
            .getPreview()
            .find('[data-cy~="catalyst"]')
            .should('have.attr', 'data-playbackrate', 'x1.5');
    });

    it('increases playback speed to 1.75x', () => {
        cy
            .getPreview()
            .find('[data-cy="speed-up"]')
            .click()
            .window()
            .then(window => {
                const { MELODY: { audioInterface } } =  utils.getPreviewWindow(window);
                expect(audioInterface.playbackRate).to.equal(1.75);
            })
            .getPreview()
            .find('[data-cy~="catalyst"]')
            .should('have.attr', 'data-playbackrate', 'x1.75');
    });

    it('increases playback speed to 2x', () => {
        cy
            .getPreview()
            .find('[data-cy="speed-up"]')
            .click()
            .window()
            .then(window => {
                const { MELODY: { audioInterface } } =  utils.getPreviewWindow(window);
                expect(audioInterface.playbackRate).to.equal(2);
            })
            .getPreview()
            .find('[data-cy~="catalyst"]')
            .should('have.attr', 'data-playbackrate', 'x2');
    });

    it('should be disabled if speed is at 2x', () => {
        cy
            .getPreview()
            .find('[data-cy="speed-up"]')
            .should('have.css', 'cursor', 'not-allowed')
            .should('have.css', 'opacity', '0.5')
            .click()
            .window()
            .then(window => {
                const { MELODY: { audioInterface } } =  utils.getPreviewWindow(window);
                expect(audioInterface.playbackRate).to.equal(2);
            });
    });
});
