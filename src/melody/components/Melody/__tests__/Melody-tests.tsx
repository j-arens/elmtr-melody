import configureStore from '@redux/index';
import initialState from '@redux/initialState';
import { h } from 'preact';
import { Provider } from 'preact-redux';
import { render } from 'preact-render-to-string';
const track = require('@fixtures/track');
import Melody from '../index';

describe('Melody', () => {
    let state;

    beforeEach(() => {
        state = initialState;
    });

    it('renders an error if there arent any tracks', () => {
        const component = render(
            <Provider store={configureStore(state)}>
                <Melody />
            </Provider>,
        );
        expect(component).toMatchSnapshot();
    });

    it('renders an editor specific error message if there arent any tracks', () => {
        global.elementorFrontend = {
            isEditMode: jest.fn().mockReturnValue(true),
        };
        const store = configureStore(state);
        const component = render(
            <Provider store={store}>
                <Melody />
            </Provider>,
        );
        expect(component).toMatchSnapshot();
    });

    it('renders an error if the currentState is fault', () => {
        const testState = {
            ...state,
            state: {
                ...state.state,
                currentState: 'fault',
            },
            audio: {
                ...state.audio,
                tracks: [{}],
            },
        };
        const store = configureStore(testState);
        const component = render(
            <Provider store={store}>
                <Melody />
            </Provider>,
        );
        expect(component).toMatchSnapshot();
    });

    it('flourishes into a nice little application if the conditions are right', () => {
        const testState = {
            ...state,
            audio: {
                ...state.audio,
                tracks: [track],
            },
        };
        const store = configureStore(testState);
        const component = render(
            <Provider store={store}>
                <Melody />
            </Provider>,
        );
        expect(component).toMatchSnapshot();
    });
});
