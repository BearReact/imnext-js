import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const PREFIX = 'startup';

/** -----------------------------------------
 Initial State
 /** ---------------------------------------*/
export const INITIAL_STATE = Immutable({
    isReady: false,
    isChecking: false,
});

/** -----------------------------------------
 Selectors
 /** --------------------------------------*/
export const Selectors = {
    isReady: state => state[PREFIX].isReady,
};

/** -----------------------------------------
 Types and Action Creators
 /** ---------------------------------------*/
export const {Types, Creators} = createActions(
    {
        checking: null,
        checkingBegin: null,
        checkingSuccess: null,
        checkingFail: null,

        resetApp: null,
    },
    {
        prefix: `${PREFIX}/`,
    }
);

export default Creators;

/** -----------------------------------------
 Reducers
 /** ---------------------------------------*/

const Reducers = {
    checkingBegin(state) {
        return state.merge({
            isChecking: true,
        });
    },
    checkingSuccess(state) {
        return state.merge({
            isReady: true,
            isChecking: false,
        });
    },
    checkingFail(state) {
        return state.merge({
            isReady: false,
            isChecking: false,
        });
    },
};

/** ---------------------------------------------------------------
 Hookup Reducers To Types (注意更改 Types, Saga對應必須同步更改)
 /** -------------------------------------------------------------*/
export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHECKING_BEGIN]: Reducers.checkingBegin,
    [Types.CHECKING_SUCCESS]: Reducers.checkingSuccess,
    [Types.CHECKING_FAIL]: Reducers.checkingFail,
});
