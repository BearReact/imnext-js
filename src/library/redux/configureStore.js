import {applyMiddleware, compose, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist';
import Immutable from 'seamless-immutable';
import { CookieStorage } from 'redux-persist-cookie-storage';
import Cookies from 'js-cookie';

import immutablePersistenceTransform from './utils/immutablePersistenceTransform';
import createReducer from './reducers';
import rootSaga from './store/rootSaga';





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

    // if (isClient) {
        // redux 持久化設定
        const { persistReducer } = require('redux-persist');
        // const storage = require('redux-persist/lib/storage').default;
        const storage = new CookieStorage(Cookies, {});
        const persistConfig = {
            active: true,
            key: `ezapp-mobile-v4`,
            // whitelist: ['language', 'auth', 'system', 'pwa', 'ui'], // 持久化狀態白名單
            storage,
            transforms: [immutablePersistenceTransform]
        };

        store = createStore(
            persistReducer(persistConfig, createReducer()),
            Immutable(initialState),
            composeEnhancers(...enhancers)
        );
        store.__PERSISTOR = persistStore(store);
    // } else {
    //     store = createStore(
    //         createReducer(),
    //         Immutable(initialState),
    //         composeEnhancers(...enhancers)
    //     );
    // }

    // Create an object for any later reducers
    store.asyncReducers = {};
    store.asyncSagas = {};

    // Create an inject reducer function
    // This function adds the async reducer, and creates a new combined reducer
    store.injectReducer = (key, asyncReducer) => {
        store.asyncReducers[key] = asyncReducer;
        store.replaceReducer(createReducer(store.asyncReducers));
        return store;
    };




    // install Saga
    store.sagaTask = sagaMiddleware.run(rootSaga);


    // runSaga is middleware.run function
    // rootSaga is a your root saga for static saagas
    store.injectSaga = (key, saga) => {
        // Create a dictionary to keep track of injected sagas
        const isInjected = key => typeof store.asyncSagas[key] !== 'undefined';

        // We won't run saga if it is already injected
        if (isInjected(key)) return;

        // Sagas return task when they executed, which can be used
        // to cancel them
        sagaMiddleware.run(saga);

        // Save the task if we want to cancel it in the future
        store.asyncSagas[key] = key;
    };

    return store;
};
