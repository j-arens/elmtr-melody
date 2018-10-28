import { elementorEditor } from '../../support/utils';

describe('trackpicker external track selecting', () => {
    before(() => {
        cy.login('admin', 'z');
        cy.visit(elementorEditor(9900));
        cy.disableUnloadAlert();

        cy
            .getPreview()
            .find('[id^="melody-widgetRoot:"]')
            .click();
    });

    it('adds an externally hosted track', () => {
        cy.clearTracks();

        cy
            .selectTab('content')
            .get('.elementor-repeater-add')
            .click()
            .get('[data-setting="melody_audio_source"]')
            .select('external-source');

        const titleInput = 'input[data-setting="melody_track_title"]';
        const artistInput = 'input[data-setting="melody_track_artist"]';
        const artworkUpload = '.elementor-control-media-upload-button';
        const artwork = '.elementor-control-melody_track_artwork .elementor-control-media-image';
        const artworkPattern = /\/waves\.jpeg"\)$/;

        // add external track details
        cy.get(titleInput).type('lol title');
        cy.get(artistInput).type('lol artist');
        cy.get(artworkUpload).click();
        cy.selectMediaAttachment(8002);

        // assert artwork preview is correct
        cy.get(artwork).then(el => expect(el).css('background-image').match(artworkPattern));

        // // assert track is loaded in the melody instance
        cy.getPreview().find('[data-cy="error-msg"]').should('contain', 'Unable to load track, the source was not found');
    });
});
