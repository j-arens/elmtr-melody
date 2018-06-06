import configureStore from '@redux/index';
import initialState from '@redux/initialState';
import { h } from 'preact';
import { Provider } from 'preact-redux';
import { render } from 'preact-render-to-string';
const track = require('@fixtures/track');
import ShapeShifter from '../index';

describe('Melody', () => {
    let state;

    beforeEach(() => {
        state = {
            ...initialState,
            audio: {
                ...initialState.audio,
                tracks: [track],
            },
        };
    });

    it('renders the slider view', () => {
        const testState = {
            ...state,
            ui: {
                ...state.ui,
                view: 'slider',
            },
        };
        const component = render(
            <Provider store={configureStore(testState)}>
                <ShapeShifter />
            </Provider>,
        );
        expect(component).toMatchSnapshot();
    });

    it('renders the simple toolbar view', () => {
        const testState = {
            ...state,
            ui: {
                ...state.ui,
                view: 'simple-toolbar',
            },
        };
        const component = render(
            <Provider store={configureStore(testState)}>
                <ShapeShifter />
            </Provider>,
        );
        expect(component).toMatchSnapshot();
    });
});
