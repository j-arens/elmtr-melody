import Melody from '@components/Melody';
import { State } from '@redux/type';
import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import { Store } from 'redux';
const s = require('./global-styles/base.scss');

export function makeError(e: Error) {
    document.body.insertAdjacentHTML('beforeend', `
        <div class="${s.rootError}">
            <button class="${s.rootError__btn}">x</button>
            <p>There was a fatal error initializing the Melody app.</p>
            <code>${e.name}: ${e.message}</code>
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

export function makeApp(target: string, store: Store<State>) {
    const app = (
        <Provider store={store}>
            <div className={s.melody__base}>
                <Melody />
            </div>
        </Provider>
    );

    const root: HTMLElement = document.getElementById(target);
    render(app, root, root.firstElementChild as HTMLElement);
}
