import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'seamless-immutable';

import {isEmpty} from '@utils/equal';
import {i18n} from '@library/i18next/configureI18Next';
import apiService from '@services';
import createReducer from './reducers';
import rootSaga from './store/rootSaga';
import {Selectors} from './store/Auth/Reducer';

export default initialState => {
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
        const isInjected = checkKey => typeof store.asyncSagas[checkKey] !== 'undefined';

        // We won't run saga if it is already injected
        if (isInjected(key)) return;

        // Sagas return task when they executed, which can be used
        // to cancel them
        sagaMiddleware.run(saga);

        // Save the task if we want to cancel it in the future
        store.asyncSagas[key] = key;
    };

    // =========== API Setting ================
    // 回應攔截處理
    apiService.addResponseTransform(response => {
        if (response.ok) {
            const {headers} = response;

            /** 請求成功, 額外處理區塊 */
            if (headers.Authentication) {
                // 設定認證
                // store.dispatch(AuthAction.setToken(response.data.token));
            }
        } else {
            /** 請求失敗, 額外處理區塊 */
            const {status, problem, config} = response;

            if (!isEmpty(status)) {
                throw new Error(i18n.t(`common:errorHttp.${status}`));

            } else if (problem === 'NETWORK_ERROR') {
                throw new Error(i18n.t('common:errorHttp.networkError'));

            } else if (problem === 'TIMEOUT_ERROR') {
                throw new Error(i18n.t('common:errorHttp.timeoutError', {sec: (config.timeout / 1000)}));

            }
        }
        return response;
    });

    // 請求攔截處理
    apiService.addRequestTransform(request => {
        const token = Selectors.token(store.getState());

        // 語系設定
        request.headers['Accept-Language'] = i18n.language;

        if (token) {
            // 設定授權
            request.headers.Authorization = `Bearer ${token}`;
        }
    });

    return store;
};
