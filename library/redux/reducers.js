/**
 * Combine all reducers in this file and export the combined reducers.
 */

import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import {persistReducer} from 'redux-persist';
import reduxPersist from './config/reduxPersist';

// import {reducer as languageProviderReducer} from '../intl/store/Reducer';
// import history from '../react-router/history';
import rootReducers from './store/rootReducers';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
    const appReducer = combineReducers({
        // language: languageProviderReducer,
        ...rootReducers,
        ...injectedReducers
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


    // Wrap the root reducer and return a new root reducer with router state
    const mergeWithRouterState = connectRouter(history);
    let finalReducers = mergeWithRouterState(rootReducer);

    // Redux 持久化
    if (reduxPersist.active) {
        const persistConfig = reduxPersist.storeConfig;
        finalReducers = persistReducer(persistConfig, finalReducers);
    }

    return finalReducers;
}
