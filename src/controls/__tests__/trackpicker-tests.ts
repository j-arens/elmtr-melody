import { model as ElementorModel } from '@mocks/elementorModel';
import { makeAudioframe, mediaframe } from '../mediaframe';
import * as trackpicker from '../trackpicker';

describe('bindEvents()', () => {
    it('binds a click event on the trackpicker trigger', () => {
        const audioframe = makeAudioframe();
        trackpicker.bindEvents(ElementorModel, audioframe);
        expect(ElementorModel.$el.on).toHaveBeenCalled();
        expect(ElementorModel.$el.on.mock.calls[0][0]).toEqual('click');
        expect(ElementorModel.$el.on.mock.calls[0][1]).toEqual('button[data-melody-tp-trigger]');
    });
});

describe('bindAudioframe()', () => {
    it('creates an audioframe and returns it', () => {
        const result = trackpicker.bindAudioframe(ElementorModel);
        expect(result).toEqual(mediaframe);
    });

    it('binds the insert insert and select events on the audioframe', () => {
        const result = trackpicker.bindAudioframe(ElementorModel);
        expect(result.on).toHaveBeenCalled();
        expect(result.on.mock.calls[0][0]).toEqual('insert select');
    });
});

describe('onTriggerClick()', () => {
    let args;
    const $trigger = {};

    beforeEach(() => {
        $trigger.attr = jest.fn();
        $trigger.text = jest.fn();
        args = {
            $trigger,
            model: ElementorModel,
            frame: mediaframe,
        };
    });

    it('does nothing if the trigger action doesnt match', () => {
        $trigger.attr.mockReturnValue('LOLNOPE');
        expect(trackpicker.onTriggerClick(args)).toEqual(0);
    });

    it('runs the first case if the trigger action is SELECT_TRACK', () => {
        $trigger.attr.mockReturnValue('SELECT_TRACK');
        expect(trackpicker.onTriggerClick(args)).toEqual(1);
    });

    it('runs the second case if the trigger action is CLEAR_TRACK', () => {
        $trigger.attr.mockReturnValue('CLEAR_TRACK');
        expect(trackpicker.onTriggerClick(args)).toEqual(2);
    });
});
