const mediaframe = {
    on: jest.fn(),
    open: jest.fn(),
    state: () => this,
    get: () => this,
    first: () => this,
    toJSON: jest.fn(),
};

const makeAudioframe = jest.fn().mockReturnValue(mediaframe);

global.wp = {
    media: jest.fn().mockReturnValue(mediaframe),
};

module.exports = {
    makeAudioframe,
    mediaframe,
};
