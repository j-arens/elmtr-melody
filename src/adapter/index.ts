import { makeApp, makeError } from '@melody/index';
import configureStore from '@redux/index';
import initialState from '@redux/initialState';
import * as throttle from 'lodash.throttle';
import { GLOBAL } from './constants';
import initialize from './initialize';
import * as InstanceManager from './InstanceManager';
import Janitor from './Janitor';
import { Config } from './type';

/**
 * Initialize the janitor
 */
Janitor();

/**
 * Creates a new Melody App instance and configures it
 */
const newInstance = throttle((config: Config, id: string): void => {
    try {
        const instanceId = id.match(/melody-widgetRoot:([a-zA-Z0-9]+)/)[1];
        InstanceManager.autoRemove(instanceId);
        const store = configureStore(initialState);
        initialize({ dispatch: store.dispatch, config: Object.freeze(config) });
        const instance = makeApp(id, store);
        InstanceManager.add(instanceId, instance);
    } catch (e) {
        makeError(e);
        console.error(e);
    }
}, 500);

GLOBAL.MELODY = {
    newInstance,
};
