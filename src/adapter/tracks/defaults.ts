const { MELODY_ENV: { pluginsUrl } } = (window as any);

export const defaultTrack = {
    source_url: `${pluginsUrl}/elmtr-melody/public/resources/placeholder-track.mp3`,
    download_url: '',
    artwork: '',
    media_details: {
        artist: 'Artist',
        album: 'Album',
        title: 'Title',
        length: 0,
    },
    attributes: {
        origin: 'internal',
    },
};
