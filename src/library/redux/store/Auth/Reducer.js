import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import cookie from 'js-cookie';

const PREFIX = 'auth';

/** -----------------------------------------
 Initial State
 /** ---------------------------------------*/
export const INITIAL_STATE = Immutable({
    token: null,
    account: null,

    isAuth: false,
    isRemember: false,
});

/** -----------------------------------------
 Selectors
 /** --------------------------------------*/
export const Selectors = {
    token: state => state[PREFIX].token,
    isAuth: state => state[PREFIX].isAuth,
};

/** -----------------------------------------
 Types and Action Creators
 /** ---------------------------------------*/
export const {Types, Creators} = createActions(
    {
        // 登入系統
        handleSetAuth: ['email'],

        // 登出系統
        handleClearAuth: null,

        // 設定 Token
        handleSetToken: ['token'],
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
            email: action.email,
            exp: action.exp,
        });
    },
    // 清除登入資訊
    handleClearAuth(state, action) {
        return state.merge(INITIAL_STATE);
    },
    // 設定Token
    handleSetToken(state, action) {
        cookie.set('token', action.token);

        return state.merge({
            token: action.token,
            isAuth: true,
        });
    },
};

/** ---------------------------------------------------------------
 Hookup Reducers To Types (注意更改 Types, Saga對應必須同步更改)
 /** -------------------------------------------------------------*/
export const reducer = createReducer(INITIAL_STATE, {
    [Types.HANDLE_SET_AUTH]: Reducers.handleSetAuth,
    [Types.HANDLE_CLEAR_AUTH]: Reducers.handleClearAuth,
    [Types.HANDLE_SET_TOKEN]: Reducers.handleSetToken,
});
