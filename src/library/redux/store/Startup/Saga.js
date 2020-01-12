/* eslint-disable */
import {
    put, fork, take, call, select,
} from 'redux-saga/effects';
import get from 'lodash/get';
import cookie from 'js-cookie';
import setWith from 'lodash/setWith';
// import jwtDecode from 'jwt-decode';
// import dayjs from 'dayjs';

import {isEmpty} from '@utils/equal';
import config from '@config/app';
import Actions, {Types} from './Reducer';

// process STARTUP actions
/**
 * 初始化流程控制
 * @returns {IterableIterator<*>}
 */
export function* initializeFlow() {
    try {
        yield take(Types.CHECKING); // 等到 TYPE.CHECKING 觸發
        yield put(Actions.checkingBegin());

        // 訂製流程:
        // 1. 取得並設定APP站台設定
        // yield put(SystemActions.fetchSetting());

        // 判斷登入狀態
        // let isAuth = yield select(AuthSelectors.isAuth);

        // 檢查 Token 是否過期, 若判定過期 則清除登入狀態
        // if (isAuth) {
        //     const token = yield select(AuthSelectors.token);
        //     const expiredTime = get(jwtDecode(token), 'exp', new Date());
        //     if (expiredTime && dayjs(expiredTime).diff(dayjs()) >= 0) {
        //         yield put(AuthAction.handleClearAuth());
        //         isAuth = false;
        //     }
        // }

        // 防閃爍
        // yield delay(200);

        // 完成檢查
        yield put(Actions.checkingSuccess());
    } catch (e) {
        // 檢查失敗
        yield put(Actions.checkingFail());

        console.log(e.message);
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
