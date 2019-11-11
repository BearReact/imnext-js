import {applyMiddleware, compose, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist';

import Immutable from 'seamless-immutable';
// import rootReducer, { exampleInitialState } from './reducer';
// import rootReducer from './reducer';
import createReducer from './reducers';
import rootSaga from './store/rootSaga';
// import rootSaga from './saga'
import immutablePersistenceTransform from './utils/immutablePersistenceTransform';

// issue: https://www.robinwieruch.de/redux-persist-next-js
// https://www.jianshu.com/p/8a2b9be974a7


// runSaga is middleware.run function
// rootSaga is a your root saga for static saagas
function createSagaInjector(runSaga, rootSaga) {
    // Create a dictionary to keep track of injected sagas
    const injectedSagas = new Map();

    const isInjected = key => injectedSagas.has(key);

    const injectSaga = (key, saga) => {
        // We won't run saga if it is already injected
        if (isInjected(key)) return;

        // Sagas return task when they executed, which can be used
        // to cancel them
        const task = runSaga(saga);

        // Save the task if we want to cancel it in the future
        injectedSagas.set(key, task);
    };

    // Inject the root saga as it a staticlly loaded file,
    injectSaga('root', rootSaga);

    return injectSaga;
}



export default (initialState) => {
    let store;
    const sagaMiddleware = createSagaMiddleware();
    const isClient = typeof window !== 'undefined';


    const middlewares = [sagaMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    if (isClient) {
        // redux 持久化設定
        const { persistReducer } = require('redux-persist');
        const storage = require('redux-persist/lib/storage').default;
        const persistConfig = {
            active: true,
            key: `ezapp-mobile-v3`,
            whitelist: ['language', 'auth', 'system', 'pwa'], // 持久化狀態白名單
            storage,
            transforms: [immutablePersistenceTransform]
        };

        store = createStore(
            persistReducer(persistConfig, createReducer()),
            Immutable(initialState),
            composeEnhancers(...enhancers)
        );
        store.__PERSISTOR = persistStore(store);
    } else {
        store = createStore(
            createReducer(),
            Immutable(initialState),
            composeEnhancers(...enhancers)
        );
    }

    // Create an object for any later reducers
    store.asyncReducers = {};
    store.asyncSaga = {};

    // Create an inject reducer function
    // This function adds the async reducer, and creates a new combined reducer
    store.injectReducer = (key, asyncReducer) => {
        store.asyncReducers[key] = asyncReducer;
        store.replaceReducer(createReducer(store.asyncReducers));
        return store;
    };

    store.injectSaga = createSagaInjector(sagaMiddleware.run, rootSaga);

    // Creates a convenient method for adding reducers later
    // See withReducer.js for this in use.
    // store.injectSaga = (key, saga) => {
    //
    //     // Updates the aysncReducers object. This ensures we don't remove any old
    //     // reducers when adding new ones.
    //     store.asyncSaga[key] = saga;
    //     // This is the key part: replaceReducer updates the reducer
    //     // See rootReducer.createReducer for more details, but it returns a function.
    //     store.replaceReducer(createReducer(store.asyncReducers));
    //
    //     console.log('ooo', store);
    //
    //     return store;
    // };


    store.sagaTask = sagaMiddleware.run(rootSaga);

    // Extensions
    // store.runSaga = sagaMiddleware.run;
    // store.runSaga(rootSaga);

    /* injected */
    // store.injectedReducers = {}; // Reducer registry
    // store.injectedSagas = {}; // Saga registry


    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    // if (module.hot) {
    //     module.hot.accept('./reducers', () => {
    //         store.replaceReducer(createReducer(store.injectedReducers));
    //     });
    // }


    return store;
};
