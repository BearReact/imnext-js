/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {combineReducers} from 'redux';
import rootReducers from './store/rootReducers';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(asyncReducers = {}) {
    const appReducer = combineReducers({
        ...rootReducers,
        ...asyncReducers
    });

    // 重設APP Redux Store
    const rootReducer = (state, action) => {
        if (action.type === 'startup/RESET_APP') {
            // 白名單設定(不做清除)
            const {system, auth, startup, ui} = state;
            state = {system, auth, startup, ui};
        }
        return appReducer(state, action);
    };

    return rootReducer;
}
