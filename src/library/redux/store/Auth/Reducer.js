import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import dayjs from 'dayjs';
// import jwtDecode from 'jwt-decode';

const PREFIX = 'auth';

/** -----------------------------------------
 Initial State
 /** ---------------------------------------*/
export const INITIAL_STATE = Immutable({
    token: null,
    isHasFavorite: null,
    memberLevelCode: null,
    memberLevelName: null,
    account: null,
    signUpDate: null,

    isAuth: false,
    isRemember: false,
    updatePhoneTime: null,
    updateEmailTime: null,
    agentFinanceLivechatUrl: null,
    agentCustomerLivechatUrl: null,
});

/** -----------------------------------------
 Selectors
 /** --------------------------------------*/
export const Selectors = {
    token: state => state[PREFIX].token,
    isAuth: state => state[PREFIX].isAuth,
    agentFinanceLivechatUrl: state => state[PREFIX].agentFinanceLivechatUrl,
    agentCustomerLivechatUrl: state => state[PREFIX].agentCustomerLivechatUrl,
};

/** -----------------------------------------
 Types and Action Creators
 /** ---------------------------------------*/
export const {Types, Creators} = createActions(
    {
        // 登入系統
        handleSetAuth: [
            'account',
            'signUpDate',
            'isHasFavorite',
            'memberLevelCode',
            'memberLevelName',
            'isRemember',
            'agentFinanceLivechatUrl',
            'agentCustomerLivechatUrl',
        ],

        // 登出系統
        handleClearAuth: null,

        // 設定 Token
        handleSetToken: ['token'],

        // 設定更新電話時間
        handleSetUpdatePhoneTime: null,

        // 設定更新信箱時間
        handleSetUpdateEmailTime: null,
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
            account: action.account,
            signUpDate: action.signUpDate,
            isHasFavorite: action.isHasFavorite,
            memberLevelCode: action.memberLevelCode,
            memberLevelName: action.memberLevelName,
            isRemember: action.isRemember,
            agentFinanceLivechatUrl: action.agentFinanceLivechatUrl,
            agentCustomerLivechatUrl: action.agentCustomerLivechatUrl,
        });
    },
    // 清除登入資訊
    handleClearAuth(state) {
        return state.merge({
            token: undefined,
            account: state.isRemember ? state.account : undefined,
            signUpDate: undefined,
            isHasFavorite: undefined,
            memberLevelCode: undefined,
            memberLevelName: undefined,
            isAuth: false,
            updatePhoneTime: undefined,
            updateEmailTime: undefined,
            agentFinanceLivechatUrl: undefined,
            agentCustomerLivechatUrl: undefined,
        });
    },
    // 設定Token
    handleSetToken(state, action) {
        // const my = action.token ? jwtDecode(action.token).custom : null;
        return state.merge({
            token: action.token,
        });
    },
    // 設定更新電話時間
    handleSetUpdatePhoneTime(state) {
        return state.merge({
            updatePhoneTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        });
    },
    // 設定更新信箱時間
    handleSetUpdateEmailTime(state) {
        return state.merge({
            updateEmailTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
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
    [Types.HANDLE_SET_UPDATE_PHONE_TIME]: Reducers.handleSetUpdatePhoneTime,
    [Types.HANDLE_SET_UPDATE_EMAIL_TIME]: Reducers.handleSetUpdateEmailTime,
});
