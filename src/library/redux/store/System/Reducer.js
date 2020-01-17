import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import dayjs from 'dayjs';

const PREFIX = 'system';

/** -----------------------------------------
 Initial State
 /** ---------------------------------------*/
export const INITIAL_STATE = Immutable({
    isMaintain: false,
    maintainMessage: null,
    maintainEndTime: null,
    clientIP: null,
    updateTime: null,
});

/** -----------------------------------------
 Selectors
 /** --------------------------------------*/
export const Selectors = {
    isMaintain: state => state[PREFIX].isMaintain,
};

/** -----------------------------------------
 Types and Action Creators
 /** ---------------------------------------*/
export const {Types, Creators} = createActions(
    {
        // 登入系統
        fetchSetting: null,
        fetchSettingBegin: null,
        fetchSettingSuccess: [
            'isMaintain',
            'maintainMessage',
            'maintainEndTime',
            'clientIP',
            'updateTime',
        ],
        fetchSettingFail: ['message'],
    },
    {prefix: `${PREFIX}/`}
);

export default Creators;

/** -----------------------------------------
 Reducers
 /** ---------------------------------------*/

const Reducers = {
    FetchSetting: {
        begin(state) {
            return state.merge({
                isFetching: true,
            });
        },
        success(state, action) {
            const updateTime = dayjs().format('YYYY-MM-DD H:mm:ss');
            return state.merge({
                isFetching: false,
                message: null,
                isMaintain: action.isMaintain,
                maintainMessage: action.maintainMessage,
                maintainEndTime: action.maintainEndTime,
                clientIP: action.clientIP,
                updateTime,
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
    [Types.FETCH_SETTING_BEGIN]: Reducers.FetchSetting.begin,
    [Types.FETCH_SETTING_SUCCESS]: Reducers.FetchSetting.success,
    [Types.FETCH_SETTING_FAIL]: Reducers.FetchSetting.fail,
});
