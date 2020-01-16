import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'seamless-immutable';
import get from 'lodash/get';

import createReducer from './reducers';
import rootSaga from './store/rootSaga';

// eslint-disable-next-line import/no-mutable-exports
let store = null;
export default initialState => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];
    const isServer = typeof window === 'undefined';

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    const composeEnhancers = (process.env.NODE_ENV !== 'production'
            && !isServer
            // eslint-disable-next-line no-underscore-dangle
            && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        || compose;

    // Create Store
    // 在 Server端 從Cookie同步需持久化的Redux State
    let immutableInitialState = Immutable(initialState || {});
    if (isServer && immutableInitialState) {
        immutableInitialState = immutableInitialState.merge(get(__cookie__, 'persistState', {}), {deep: true});
    }

    // console.log('initialState', immutableImmutable);
    store = createStore(createReducer(), immutableInitialState, composeEnhancers(...enhancers));

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
        const isInjected = checkKey => typeof store.asyncSagas[checkKey] !== 'undefined';

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

export {store};
