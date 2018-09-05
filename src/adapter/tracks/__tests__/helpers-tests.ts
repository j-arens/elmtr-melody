import {
    getDownloadUrl,
    mergeIntoDefault,
} from '../helpers';
const externalTrack = require('@fixtures/elementor-externalTrack');
const mediapickerTrack = require('@fixtures/elementor-internalTrack');

describe('getDownloadUrl()', () => {
    it('should use the source defined in the data for external tracks', () => {
        const result = getDownloadUrl(externalTrack, 'external');
        expect(result).toBe('http://lol.com/downloads/1');
    });

    it('should generate a download url for internal tracks', () => {
        const result = getDownloadUrl(mediapickerTrack, 'internal');
        expect(result).toBe('https://lolz-music.com?melody=/download&attachment=1');
    });
});

describe('mergeIntoDefault()', () => {
    it('should merge normalized tracks with a default track', () => {
        const result = mergeIntoDefault({
            attributes: {
                origin: 'lol',
            },
        });
        expect(result).toMatchObject({
            source_url: 'http://my-site.com/plugins-url/elmtr-melody/public/resources/placeholder-track.mp3',
            download_url: '',
            artwork: {
                source_url: '',
                sizes: [],
            },
            media_details: {
                artist: 'Artist',
                album: 'Album',
                title: 'Title',
            },
            attributes: {
                origin: 'lol',
            },
        });
    });
});
