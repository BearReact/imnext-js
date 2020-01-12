import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
// import jwtDecode from 'jwt-decode';

const PREFIX = 'login';

/** -----------------------------------------
 Initial State
 /** ---------------------------------------*/
export const INITIAL_STATE = Immutable({
    isSubmitting: false,
    message: null,
});

/** -----------------------------------------
 Selectors
 /** --------------------------------------*/
export const Selectors = {};

/** -----------------------------------------
 Types and Action Creators
 /** ---------------------------------------*/
export const {Types, Creators} = createActions(
    {
        // 登入系統
        submitLogin: ['formParam'],
        submitLoginBegin: null,
        submitLoginSuccess: null,
        submitLoginFail: ['message'],

        // 登出系統
        submitLogout: null,
        submitLogoutBegin: null,
        submitLogoutSuccess: null,
        submitLogoutFail: ['message'],

        // 自動登入程序
        checkIn: ['token'],
        checkInBegin: null,
        checkInSuccess: null,
        checkInFail: ['message'],

        // 未登入跳轉到登入頁
        kickSetGuest: null,
        kickSetGuestBegin: null,
        kickSetGuestSuccess: null,
        kickSetGuestFail: ['message'],
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
    // 登入系統
    SubmitLogin: {
        begin(state) {
            return state.merge({
                isFetching: true,
            });
        },
        success(state) {
            return state.merge({
                isFetching: false,
                message: null,
            });
        },
        fail(state, action) {
            return state.merge({
                isFetching: false,
                message: action.message,
            });
        },
    },
    // 登出系統
    SubmitLogout: {
        begin(state) {
            return state.merge({
                isFetching: true,
            });
        },
        success(state) {
            return state.merge({
                isFetching: false,
                message: undefined,
            });
        },
        fail(state, action) {
            return state.merge({
                isFetching: false,
                message: action.message,
            });
        },
    },
    // 自動登入
    CheckIn: {
        begin(state) {
            return state.merge({
                isFetching: true,
            });
        },
        success(state) {
            return state.merge({
                isFetching: false,
                message: null,
            });
        },
        fail(state, action) {
            return state.merge({
                isFetching: false,
                message: action.message,
            });
        },
    },
    // 未登入跳轉到登入頁系統
    KickSetGuest: {
        begin(state) {
            return state.merge({
                isFetching: true,
            });
        },
        success(state) {
            return state.merge({
                isFetching: false,
                message: null,
            });
        },
        fail(state, action) {
            return state.merge({
                isFetching: false,
                message: action.message,
            });
        },
    },
};

/** ---------------------------------------------------------------
 Hookup Reducers To Types (注意更改 Types, Saga對應必須同步更改)
 /** -------------------------------------------------------------*/
export const reducer = createReducer(INITIAL_STATE, {
    [Types.SUBMIT_LOGIN_BEGIN]: Reducers.SubmitLogin.begin,
    [Types.SUBMIT_LOGIN_SUCCESS]: Reducers.SubmitLogin.success,
    [Types.SUBMIT_LOGIN_FAIL]: Reducers.SubmitLogin.fail,

    [Types.SUBMIT_LOGOUT_BEGIN]: Reducers.SubmitLogout.begin,
    [Types.SUBMIT_LOGOUT_SUCCESS]: Reducers.SubmitLogout.success,
    [Types.SUBMIT_LOGOUT_FAIL]: Reducers.SubmitLogout.fail,

    [Types.CHECK_IN_BEGIN]: Reducers.CheckIn.begin,
    [Types.CHECK_IN_SUCCESS]: Reducers.CheckIn.success,
    [Types.CHECK_IN_FAIL]: Reducers.CheckIn.fail,

    [Types.KICK_SET_GUEST_BEGIN]: Reducers.KickSetGuest.begin,
    [Types.KICK_SET_GUEST_SUCCESS]: Reducers.KickSetGuest.success,
    [Types.KICK_SET_GUEST_FAIL]: Reducers.KickSetGuest.fail,
});
