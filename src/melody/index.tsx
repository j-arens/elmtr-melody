import CssProvider from '@components/CssProvider/';
import Melody from '@components/Melody';
import createStore from '@redux/index';
import { State } from '@redux/type';
import { Store } from 'redux';
import StateMachine from '@state-machine/index';
import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { GLOBAL } from './constants';
const s = require('./global-styles/base.scss');

function makeError(e: Error) {
    document.body.insertAdjacentHTML('beforeend', `
        <div class="${s.rootError}">
            <button class="${s.rootError__btn}">x</button>
            <p>There was an error initializing the Melody app.</p>
            <code>${e.message}</code>
        </div>
    `);

    const errMsg = document.querySelector(`.${s.rootError}`);
    const closeBtn = errMsg.querySelector(`.${s.rootError__btn}`);
    const handler = () => {
        closeBtn.removeEventListener('click', handler);
        errMsg.parentElement.removeChild(errMsg);
    };
    closeBtn.addEventListener('click', handler);
}

function makeApp(target: string, store: Store<State>) {
    const app = (
        <Provider store={store}>
            <CssProvider className={s.melody__base}>
                <Melody />
            </CssProvider>
        </Provider>
    );

    const root: HTMLElement = document.getElementById(target);
    render(app, root, root.firstChild as HTMLElement);
}

if (!GLOBAL.hasOwnProperty('MELODY')) {
    GLOBAL.MELODY = {};
}

GLOBAL.MELODY.app = {
    createStore,
    mount(id: string, store: Store<State>) {
        try {
            makeApp(id, store);
        } catch (e) {
            const error = Error(e);
            makeError(error);
            console.error(error);
        }
    },
};
