import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const PREFIX = 'auth';

/** -----------------------------------------
 Initial State
 /** ---------------------------------------*/
export const INITIAL_STATE = Immutable({
    isAuth: false,
    token: null,
    exp: null,
    email: null,
});

/** -----------------------------------------
 Selectors
 /** --------------------------------------*/
export const Selectors = {
    isAuth: state => state[PREFIX].isAuth,
    token: state => state[PREFIX].token,
};

/** -----------------------------------------
 Types and Action Creators
 /** ---------------------------------------*/
export const {Types, Creators} = createActions(
    {
        // 登入系統
        handleSetAuth: ['token', 'exp', 'email'],

        // 登出系統
        handleClearAuth: null,
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
    // 設定登入資訊
    handleSetAuth(state, action) {
        return state.merge({
            isAuth: true,
            token: action.token,
            exp: action.exp,
            email: action.email,
        });
    },
    // 清除登入資訊
    handleClearAuth(state, action) {
        return state.merge({
            isAuth: false,
            token: null,
            exp: null,
            email: null,
        });
    },
};

/** ---------------------------------------------------------------
 Hookup Reducers To Types (注意更改 Types, Saga對應必須同步更改)
 /** -------------------------------------------------------------*/
export const reducer = createReducer(INITIAL_STATE, {
    [Types.HANDLE_SET_AUTH]: Reducers.handleSetAuth,
    [Types.HANDLE_CLEAR_AUTH]: Reducers.handleClearAuth,
});
