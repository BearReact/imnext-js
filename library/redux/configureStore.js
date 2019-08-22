/* eslint-disable no-underscore-dangle */
/**
 * Create the store with dynamic reducers
 */

import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import StartupActions from '@library/redux/store/Startup/Reducer';
import {createApiService} from '@config/utils/configureApi';
import appConfig from '@config/app';
// import reduxPersist from './config/reduxPersist';
// import createReducer from './reducers';
// import Rehydration from './utils/rehydration';
// import rootSaga from './store/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [sagaMiddleware, routerMiddleware(history)];

    const enhancers = [applyMiddleware(...middlewares)];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose;

    const store = createStore(createReducer(), initialState, composeEnhancers(...enhancers));

    const startup = () => store.dispatch(StartupActions.checking());
    // configure persistStore and check reducer version number

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.runSaga(rootSaga);

    /* injected (若需要開啟使用再打開) */
    store.injectedReducers = {}; // Reducer registry
    store.injectedSagas = {}; // Saga registry



    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createReducer(store.injectedReducers));
        });
    }

    createApiService(store, appConfig.apiOption);
    if (reduxPersist.active) {
        Rehydration.updateReducers(store, startup);
    }else{
        startup();
    }



    return store;
}
