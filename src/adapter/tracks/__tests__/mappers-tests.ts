import {
    external,
    mediaPicker,
} from '../mappers';
const externalTrack = require('@fixtures/elementor-externalTrack');
const mediapickerTrack = require('@fixtures/elementor-internalTrack');

describe('external mapper', () => {
    it('normalizes external track object shape', () => {
        const result = external(externalTrack);
        expect(result).toMatchObject({
            source_url: 'http://external-track/track.mp3',
            download_url: 'http://lol.com/downloads/1',
            artwork: {
                source_url: 'http://lol.com/track-artwork.jpg',
                sizes: [],
            },
            media_details: {
                artist: 'lol-artist',
                album: 'lol-album',
                title: 'lol-title',
            },
            attributes: {
                origin: 'external',
            },
        });
    });
});

describe('media picker mapper', () => {
    it('normlizes wp media lib track object shape', () => {
        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.1;
        global.Math = mockMath;
        const result = mediaPicker(mediapickerTrack);
        expect(result).toMatchObject({
            source_url: 'http://wpmp-track/track.mp3',
            download_url: 'https://lolz-music.com?melody=/download&clientId=10000&attachment=1',
            artwork: {
                source_url: 'http://lol.com/track-artwork.jpg',
                sizes: [],
            },
            media_details: {
                artist: 'lol-artist',
                album: 'lol-album',
                title: 'lol-title',
            },
            attributes: {
                origin: 'internal',
            },
        });
    });
});
