module.exports = {
    source_url: 'https://download.me/cool-track.mp3',
    download_url: 'https://download.me/downloads/cool-track.mp3',
    artwork: {
        source_url: 'https://download.me/covers/cool-cover.jpg',
        sizes: [{
            file: 'cool-cover200x200.jpg',
            height: 200,
            width: 200,
            'mime-type': 'image/jpeg',
            uri: 'https://download.me/covers/cool-cover200x200.jpg',
            size: 'thumbnail',
        }],
    },
    media_details: {
        album: 'lol-album',
        artist: 'lol-artist',
        title: 'lol-title',
        length: 345,
    },
    attributes: {
        origin: 'external',
        attachment: 12,
    },
};
