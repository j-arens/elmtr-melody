import * as utils from '../../support/utils';

describe('dock toggle', () => {
    before(() => {
        cy
            .login('admin', 'z')
            .visit(utils.elementorEditor(9900))
            .disableUnloadAlert()
            .getPreview()
            .find('[id^="melody-widgetRoot:"]')
            .click();
    });

    it('downloads a track', () => {
        cy
            .window()
            .then(window => {
                const w = utils.getPreviewWindow(window);
                cy.stub(w, 'open');
            })
            .clearTracks()
            .addTrack(8001)
            .toggleSwitch('melody_track_downloadable')
            .wait(1000)
            .getPreview()
            .find('[data-cy="dock-toggle"]')
            .click()
            .getPreview()
            .find('[data-cy="download"]')
            .click()
            .wait(1000);

        cy
            .window()
            .then(window => {
                const w = utils.getPreviewWindow(window);
                expect(w.open).to.be.called;
                expect(w.open).to.be.calledWith('http://localhost:4000?melody=/download&attachment=8001', '_blank');
            });

        cy
            .request('http://localhost:4000?melody=/download&attachment=8001')
            .then(req => {
                expect(req.status).to.equal(200);
                expect(req.headers['content-type']).to.equal('audio/mpeg');
                expect(req.headers['content-disposition']).to.equal('attachment; filename="sunspots-by-jeremy-blake.mp3"');
            });
    });
});
