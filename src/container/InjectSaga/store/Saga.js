import {
    call, put, takeLatest, delay,
} from 'redux-saga/effects';
import dayjs from 'dayjs';
import Actions, {Types} from './Reducer';

/**
 * 取明細資料
 * @returns {IterableIterator<*>}
 */
export function* fetchCurrent(payload) {
    try {
        yield put(Actions.fetchCurrentBegin());

        // 模擬呼叫API的等待時間
        yield delay(500);

        const currentData = dayjs().toString();

        yield put(Actions.fetchCurrentSuccess(currentData));
    } catch (e) {
        yield put(Actions.fetchCurrentFail(e.message));
    }
}

export default function* injectSagaRoot() {
    yield takeLatest(Types.FETCH_CURRENT, fetchCurrent);
}
