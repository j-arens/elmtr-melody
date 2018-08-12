import { elementorEditor } from '../support/utils';

describe('track picker', () => {
    beforeEach(() => {
        // login and load page editor
        cy.login('admin', 'z');
        cy.visit(elementorEditor(9900));

        // click on melody slider instance in the preview
        cy
            .getPreview()
            .find('[id^="melody-widgetRoot:"]')
            .click();
    });

    it('adds a track from the media picker and clears it', () => {
        // this test expects no tracks
        cy.clearTracks();

        cy  
            .selectTab('content')
            .get('.elementor-repeater-add')
            .click()
            .get('[data-setting="melody_audio_source"]')
            .select('media-library')
            .get('[data-melody-tp-trigger]')
            .click()
        
        // select track from media library
        cy.selectMediaAttachment(8001);

        const titleInput = 'input[data-setting="melody_track_title"]';
        const albumInput = 'input[data-setting="melody_track_album"]';
        const artistInput = 'input[data-setting="melody_track_artist"]';
        const artwork = '.elementor-control-melody_track_artwork .elementor-control-media-image';
        const artworkPattern = /\/sunspots-by-jeremy-blake-mp3-image\.jpg"\)$/;

        // assert track has been added
        cy.get(titleInput).should('have.value', 'Sunspots');
        cy.get(albumInput).should('have.value', 'false');
        cy.get(artistInput).should('have.value', 'Jeremy Blake');
        cy.get(artwork).then(el => expect(el).css('background-image').match(artworkPattern));

        // assert track is loaded in the melody instance
        cy.getPreview().find('[data-cy="track-title"]').should('contain', 'Sunspots');
        cy.getPreview().find('[data-cy="track-artist"]').should('contain', 'Jeremy Blake');
        cy.getPreview().find('[data-cy="track-artwork"]').then(el => el.css('background-image').match(artworkPattern));


        // clear track
        cy
            .get('[data-melody-tp-trigger]')
            .click();

        // assert track has been cleared
        cy.get(titleInput).should('have.value', '');
        cy.get(albumInput).should('have.value', '');
        cy.get(artistInput).should('have.value', '');

        // assert track has been cleared in the melody instance
        cy.getPreview().find('[data-cy="track-title"]').should('contain', 'Title');
        cy.getPreview().find('[data-cy="track-artist"]').should('contain', 'Artist');
    });

    it('adds an externally hosted track', () => {
        // this test expects no tracks
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
        cy.getPreview().find('[data-cy="track-title"]').should('contain', 'lol title');
        cy.getPreview().find('[data-cy="track-artist"]').should('contain', 'lol artist');
    });
});
