/* eslint-disable */
import {
    put, fork, take, call, select,
} from 'redux-saga/effects';
import get from 'lodash/get';
import cookie from 'js-cookie';
import setWith from 'lodash/setWith';
import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';

import {isEmpty} from '@utils/equal';
import config from '@config/app';
import Actions, {Types} from './Reducer';
import SystemActions, {Types as SystemType} from '../System/Reducer';
import AuthActions, {Selectors as AuthSelectors} from '../Auth/Reducer';
import {submitLogin} from '@library/redux/store/Login/Saga';

/**
 * 初始化流程控制
 * @returns {IterableIterator<*>}
 */
export function* initializeFlow() {
    try {
        yield take(Types.CHECKING);

        yield put(Actions.checkingBegin());

        // Get Site Setting
        yield put(SystemActions.fetchSetting());
        yield take(SystemType.FETCH_SETTING_SUCCESS);


        // Check token expired
        let isAuth = yield select(AuthSelectors.isAuth);
        if (isAuth) {
            const token = yield select(AuthSelectors.token);
            const expiredTime = get(jwtDecode(token), 'exp', new Date());
            if (expiredTime && dayjs(expiredTime).diff(dayjs()) >= 0) {
                yield put(AuthActions.handleClearAuth());
            }
        }

        // Done
        yield put(Actions.checkingSuccess());

    } catch (e) {
        yield put(Actions.checkingFail());
        console.error(e.message);
    }
}


/**
 * 將 Redux狀態同步到Cookie
 * @returns {IterableIterator<*>}
 */
function* watchStateSyncCookie() {
    while (true) {
        yield take('*');

        let newPersistState = {};

        // 目前 Cookie State Object
        let persistState = cookie.get('persistState') || {};

        // 目前 Redux State Object
        const reduxState = yield select(state => state);
        for(let i=0; i < config.reduxPersistWhileList.length; i++){
            const statePath = config.reduxPersistWhileList[i];

            const selectState = get(reduxState, statePath);
            const selectPersistState = get(persistState, statePath, null);
            if (selectState !== selectPersistState) {
                newPersistState = setWith(newPersistState, statePath, selectState, Object);
            }
        }

        // 將新的更新同步到Cookie
        if (!isEmpty(newPersistState)) {
            cookie.set('persistState', newPersistState);
        }

    }
}



export default [
    fork(initializeFlow),
    call(watchStateSyncCookie),
];
