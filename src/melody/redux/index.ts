import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const devTools = [];
const DEV = process.env.NODE_ENV === 'development';
const hasDevTools = typeof window['__REDUX_DEVTOOLS_EXTENSION__'] !== 'undefined';

if (DEV && hasDevTools) {
    devTools.push(window['__REDUX_DEVTOOLS_EXTENSION__']());
}

const middlewares = compose(
    applyMiddleware(thunk),
    ...devTools,
);

export default state => createStore(rootReducer, state, middlewares);
