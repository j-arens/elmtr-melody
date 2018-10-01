import AudioInterface from '../';

class MockAudio {
    addEventListener = jest.fn();
    play = jest.fn(() => {
        this.paused = false;
        return Promise.resolve();
    });
    pause = jest.fn(() => {
        this.paused = true;
    });
    load = jest.fn();
    paused = true;
    src = '';
    currentTime = 0;
    loop = false;
    playbackRate = 1;
}

describe('AudioInterface', () => {
    beforeEach(() => {
        global.Audio = MockAudio;
    });

    it('sets the source', () => {
        const source = 'https://lol.com/my-song.mp3';
        const component = new AudioInterface({ src: source, play: false });
        component.componentDidMount();
        expect(component.Audio.src).toBe(source);
    });

    it('plays', () => {
        const component = new AudioInterface({ src: '', play: true });
        component.componentDidMount();
        expect(component.Audio.play).toHaveBeenCalled();
    });

    it('pauses', () => {
        const component = new AudioInterface({ src: '', play: true });
        component.componentDidMount();
        component.props = { play: false };
        component.componentDidUpdate({ play: true });
        expect(component.Audio.pause).toHaveBeenCalled();
    });

    it('overrides the current time', () => {
        const component = new AudioInterface({ src: '', play: true, overrideCurrentTime: 100 });
        component.componentDidMount();
        expect(component.Audio.currentTime).toBe(100); 
    });

    it('sets the volume', () => {
        const component = new AudioInterface({ src: '', play: true, volume: 0.5 });
        component.componentDidMount();
        expect(component.Audio.volume).toBe(0.5);
    });

    it('sets repeat', () => {
        const component = new AudioInterface({ src: '', play: true, repeat: true });
        component.componentDidMount();
        expect(component.Audio.loop).toBe(true);
    });

    it('sets the playback rate', () => {
        const component = new AudioInterface({ src: '', play: true, playbackRate: 1.75 });
        component.componentDidMount();
        expect(component.Audio.playbackRate).toBe(1.75);
    });

    it('diffs props and reacts', () => {
        const initialProps = { src: 'https://lol.com/song.mp3', play: true, repeat: true };
        const component = new AudioInterface(initialProps);
        component.componentDidMount();
        component.props = { src: 'https://rofl.com/new-song.mp3', play: true, repeat: false };
        component.componentDidUpdate(initialProps);
        expect(component.Audio.src).toBe('https://rofl.com/new-song.mp3');
        expect(component.Audio.pause).toHaveBeenCalled();
        expect(component.Audio.load).toHaveBeenCalled();
        expect(component.Audio.play).toHaveBeenCalled();
        expect(component.Audio.loop).toBe(false);
    });
});
