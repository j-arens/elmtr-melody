const { MELODY_ENV: { pluginsUrl } } = (window as any);

export const defaultTrack = {
    source_url: `${pluginsUrl}/elmtr-melody/assets/audio/placeholder-track.mp3`,
    favorite: false,
    artwork: '',
    media_details: {
        artist: 'Artist',
        album: 'Album',
        title: 'Title',
        length: 0,
    },
};