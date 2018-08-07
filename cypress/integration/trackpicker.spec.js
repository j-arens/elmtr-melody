import { elementorEditor } from '../support/utils';

describe('track picker', () => {
    beforeEach(() => {
        // login and load page editor
        cy.login('admin', 'z');
        cy.visit(elementorEditor(168));

        // click on melody slider instance in the preview
        cy
            .getPreview()
            .find('[id^="melody-widgetRoot:"]')
            .click();
    });

    it('adds a track from the media picker and clears it', () => {
        // this test expects to start with no tracks
        cy.clearTracks();

        // open the media frame
        cy
            .selectTab('content')
            .get('.elementor-repeater-add')
            .click()
            .get('[data-setting="melody_audio_source"]')
            .select('media-library')
            .get('[data-melody-tp-trigger]')
            .click()
        
        // select track from media library
        cy.selectMediaAttachment(120);

        const titleInput = 'input[data-setting="melody_track_title"]';
        const albumInput = 'input[data-setting="melody_track_album"]';
        const artistInput = 'input[data-setting="melody_track_artist"]';

        // assert track has been added
        cy.get(titleInput).should('have.value', 'Masquerade Theme (skit)');
        cy.get(albumInput).should('have.value', 'In The Mood for Life');
        cy.get(artistInput).should('have.value', 'WAX TAILOR');

        // assert track is loaded in the melody instance
        cy.getPreview().find('[data-cy="track-title"]').should('contain', 'Masquerade Theme (skit)');
        cy.getPreview().find('[data-cy="track-artist"]').should('contain', 'WAX TAILOR');


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
        // this test expects to start with no tracks
        cy.clearTracks();

        // setup trackpicker for external track input
        cy
            .selectTab('content')
            .get('.elementor-repeater-add')
            .click()
            .get('[data-setting="melody_audio_source"]')
            .select('external-source');

        const titleInput = 'input[data-setting="melody_track_title"]';
        const artistInput = 'input[data-setting="melody_track_artist"]';

        // add external track details
        cy.get(titleInput).type('lol title');
        cy.get(artistInput).type('lol artist');

        // assert track is loaded in the melody instance
        cy.getPreview().find('[data-cy="track-title"]').should('contain', 'lol title');
        cy.getPreview().find('[data-cy="track-artist"]').should('contain', 'lol artist');
    });
});
