import {
    call, put, takeLatest, select,
} from 'redux-saga/effects';

import ApiService from '@services/System';
import Actions, {Types} from './Reducer';

/**
 * 取得網站設定
 * @returns {IterableIterator<*>}
 */
export function* fetchSetting() {
    try {
        yield put(Actions.fetchSettingBegin());

        const response = yield call(ApiService.getSetting);
        const {data: responseData} = response;
        const {
            isMaintain,
            maintainMessage,
            maintainEndTime,
        } = responseData.data;

        yield put(
            Actions.fetchSettingSuccess(
                isMaintain,
                maintainMessage,
                maintainEndTime,
            )
        );

    } catch (e) {
        yield put(Actions.fetchSettingFail(e.message));
        console.error(e.message);
    }
}

export default [
    takeLatest(Types.FETCH_SETTING, fetchSetting),
];
