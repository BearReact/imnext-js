import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'seamless-immutable';

import createReducer from './reducers';
import rootSaga from './store/rootSaga';

export default (initialState) => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [sagaMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    const composeEnhancers = (process.env.NODE_ENV !== 'production'
            && typeof window !== 'undefined'
    // eslint-disable-next-line no-underscore-dangle
            && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
        || compose;

    // Create Store
    const store = createStore(createReducer(), Immutable(initialState), composeEnhancers(...enhancers));

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
        const isInjected = (checkKey) => typeof store.asyncSagas[checkKey] !== 'undefined';

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
