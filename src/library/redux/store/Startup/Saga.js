/* eslint-disable */
import {
    put, fork, take, select,
} from 'redux-saga/effects';

import jwtDecode from 'jwt-decode';
import get from 'lodash/get';
import dayjs from 'dayjs';
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
        console.log('initializeFlow...');

        // 判斷非手機裝置
        // if(!isMobile()){
        //     yield put(replace('/comingSoon'));
        // }

        // 訂製流程:
        // 1. 取得並設定APP站台設定
        yield put(SystemActions.fetchSetting());

        // 判斷登入狀態
        let isAuth = yield select(AuthSelectors.isAuth);

        // 檢查 Token 是否過期, 若判定過期 則清除登入狀態
        if (isAuth) {
            const token = yield select(AuthSelectors.token);
            const expiredTime = get(jwtDecode(token), 'exp', new Date());
            if (expiredTime && dayjs(expiredTime).diff(dayjs()) >= 0) {
                yield put(AuthAction.handleClearAuth());
                isAuth = false;
            }
        }

        if (isAuth) {
            // 取得錢包金額
            yield put(WalletActions.fetchWalletData());

            // 取得區塊廣告資料
            yield put(PromotionActions.fetchBlockAdvertisement());
        }

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

export default [fork(initializeFlow)];
