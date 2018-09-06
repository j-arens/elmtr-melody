import Wiretap from '../Wiretap';

describe('Wiretap', () => {
    it('subscribes to events on elementor channels', () => {
        const { elementor: { channels: { data } } } = global;
        const tap = new Wiretap();
        const fn = jest.fn();
        tap.on('data', 'lol', fn);
        expect(data.listenTo).toHaveBeenCalledWith(data, 'lol', fn);
    });

    it('unsubscribes from events on elementor channels', () => {
        const { elementor: { channels: { data } } } = global;
        const tap = new Wiretap();
        const fn = jest.fn();
        tap.off('data', 'lol', fn);
        expect(data.stopListening).toHaveBeenCalledWith(data, 'lol', fn);
    });
});
