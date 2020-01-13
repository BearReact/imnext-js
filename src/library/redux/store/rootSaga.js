/* eslint-disable global-require */

import {all} from 'redux-saga/effects';

/** -----------------------------------------
            Connect Types To Sagas
 /** --------------------------------------*/
const rootSaga = function* root() {
    yield all([
        ...require('./Startup/Saga').default,
        ...require('./System/Saga').default,
        ...require('./Login/Saga').default,
        //
        // ...write other saga
    ]);
};

export default rootSaga;
