import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist';

import rootReducer, { exampleInitialState } from './reducer'
import rootSaga from './saga'

const isClient = typeof window !== 'undefined';

export default (initialState) => {
    let store;
    const sagaMiddleware = createSagaMiddleware();
    const isClient = typeof window !== 'undefined';
    if (isClient) {
        const { persistReducer } = require('redux-persist');
        const storage = require('redux-persist/lib/storage').default;
        const persistConfig = {
            key: 'root',
            storage
        };
        store = createStore(
            persistReducer(persistConfig, rootReducer),
            initialState,
            applyMiddleware(sagaMiddleware)
        );
        store.__PERSISTOR = persistStore(store);
    } else {
        store = createStore(
            rootReducer,
            initialState,
            applyMiddleware(sagaMiddleware)
        );
    }
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};


//
// if (isClient) {
//     let store;
//
//     const sagaMiddleware = createSagaMiddleware();
//
//     const { persistReducer } = require('redux-persist');
//     const storage = require('redux-persist/lib/storage').default;
//     const persistConfig = {
//         key: 'root',
//         storage
//     };
//     store = createStore(
//         persistReducer(persistConfig, rootReducer),
//         initialState,
//         applyMiddleware(sagaMiddleware)
//     );
//     store.__PERSISTOR = persistStore(store);
//
// } else {
//     store = createStore(
//         rootReducer,
//         initialState,
//         applyMiddleware(sagaMiddleware)
//     );
// }
//
//
//
// const bindMiddleware = middleware => {
//     if (process.env.NODE_ENV !== 'production') {
//         const { composeWithDevTools } = require('redux-devtools-extension');
//         return composeWithDevTools(applyMiddleware(...middleware));
//     }
//     return applyMiddleware(...middleware);
// };
//
// function configureStore (initialState = exampleInitialState) {
//     const sagaMiddleware = createSagaMiddleware();
//     const store = createStore(
//         initialState,
//         bindMiddleware([sagaMiddleware])
//     );
//
//     store.sagaTask = sagaMiddleware.run(rootSaga);
//
//     return persistor
// }

// export default configureStore
