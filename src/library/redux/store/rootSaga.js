/* eslint-disable global-require */

import {all} from 'redux-saga/effects';

/** -----------------------------------------
            Connect Types To Sagas
 /** --------------------------------------*/
const rootSaga = function* root() {
    yield all([
        // ...require('@library/intl/store/Saga').default,
        ...require('./Startup/Saga').default,
        ...require('./Login/Saga').default,
        // ...require('./System/Saga').default,
        // ...require('./Notice/Saga').default,
        //
        // ...require('./Home/Saga').default,
        // ...require('./GameLobby/Saga').default,
        // ...require('./Promotion/Saga').default,
        // ...require('./Deposit/Saga').default,
        //
        // ...require('./Withdrawal/Saga').default,
        // ...require('./Profile/Saga').default,
        // ...require('./Wallet/Saga').default,
        // ...require('./History/Saga').default
    ]);
};

export default rootSaga;
