import * as common from '../common';

describe('makeControlFactory', () => {
    it('should return a configured function that registers a control', () => {
        global.elementor = {
            addControlView: jest.fn(),
            modules: {
                controls: {
                    BaseData: {
                        extend: jest.fn(),
                    },
                },
            },
        };
        const result =  common.makeControlFactory('lol-handle', () => 0);
        expect(typeof result).toBe('function');
        result();
        expect(global.elementor.addControlView).toHaveBeenCalled();
    });
});

describe('triggerChange()', () => {
    let map;
    const model = {};

    beforeEach(() => {
        map = [
            ['melody_track_id', 1],
            ['melody_track_title', 'title'],
            ['melody_track_artist', 'artist'],
        ];
        model.trigger = jest.fn();
    });

    it('calls the trigger method on the model for each map item', () => {
        common.triggerChange(model, map);
        expect(model.trigger).toHaveBeenCalledTimes(3);
    });

    it ('the trigger method is called with the correct arguments', () => {
        common.triggerChange(model, map);
        const { trigger: { mock: { calls } } } = model;
        expect(calls[0]).toEqual(['change:external:melody_track_id', model]);
        expect(calls[1]).toEqual(['change:external:melody_track_title', model]);
        expect(calls[2]).toEqual(['change:external:melody_track_artist', model]);
    });
});

describe('mutationMapper()', () => {
    let attachment;
    let mutationMap;

    beforeEach(() => {
        attachment = {
            id: 34,
            title: 'sweet',
            meta: {
                album: 'dude',
                artist: 'nice',
            },
            image: {
                id: 1,
                src: 'ur-mom.jpg',
            },
            url: 'http://rad.com/uploads/cool-music.mp3',
        };

        mutationMap = [
            ['melody_track_id', 'id'],
            ['melody_track_title', 'title'],
            ['melody_track_album', 'meta.album'],
            ['melody_track_artist', 'meta.artist'],
            ['melody_internal_track_url', 'url'],
            ['melody_track_artwork', { url: 'image.src', id: 'image.id' }],
        ];
    });

    it('maps attachment properties to a new object with specified keys', () => {
        const mutation = common.mutationMapper(mutationMap, attachment);
        expect(mutation).toMatchObject({
            melody_track_id: 34,
            melody_track_title: 'sweet',
            melody_track_album: 'dude',
            melody_track_artist: 'nice',
            melody_internal_track_url: 'http://rad.com/uploads/cool-music.mp3',
        });
    });

    it('maps artwork with id and url properties', () => {
        const mutation = common.mutationMapper(mutationMap, attachment);
        expect(mutation).toMatchObject({
            melody_track_artwork: {
                id: 1,
                url: 'ur-mom.jpg',
            },
        });
    });
});

describe('mutateSettings()', () => {
    it('should call the set method on the settings model', () => {
        const settings = {};
        settings.set = jest.fn();
        const mutation = {
            melody_track_album: 'album',
            melody_track_title: 'title',
        };
        common.mutateSettings(settings, mutation);
        expect(settings.set).toHaveBeenCalled();
        expect(settings.set.mock.calls[0][0]).toMatchObject(mutation);
    });
});

describe('clearAllSettings()', () => {
    const settingsModel = {};
    let map;

    beforeEach(() => {
        settingsModel.set = jest.fn();
        settingsModel.trigger = jest.fn();
        map = [
            ['melody_track_id', 1],
            ['melody_track_title', 'title'],
            ['melody_track_artist', 'artist'],
        ];
    });

    it('resets the settings specified in the map on the model', () => {
        common.clearAllSettings(settingsModel, map);
        expect(settingsModel.set).toHaveBeenCalled();
        expect(settingsModel.set.mock.calls[0][0]).toMatchObject({
            melody_track_id: '',
            melody_track_title: '',
            melody_track_artist: '',
        });
    });

    it('should call triggerChange() with a reset mutation', () => {
        common.clearAllSettings(settingsModel, map);
        expect(settingsModel.trigger).toHaveBeenCalledTimes(3);
    });
});
