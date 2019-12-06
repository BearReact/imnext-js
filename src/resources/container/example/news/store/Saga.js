import {
    call, put, takeLatest, delay,
} from 'redux-saga/effects';
import dayjs from 'dayjs';
import ApiService from '@services/News';
import Actions, {Types} from './Reducer';

/**
 * 取列表
 * @returns {IterableIterator<*>}
 */
export function* fetchPaginate(payload) {
    try {
        yield put(Actions.fetchPaginateBegin());

        const response = yield call(ApiService.getNewsList);
        const {data: responseData} = response;

        yield delay(2000);

        yield put(Actions.fetchPaginateSuccess(responseData.data.rows));

    } catch (e) {
        yield put(Actions.fetchPaginateFail(e.message));
    }
}

/**
 * 取明細資料
 * @returns {IterableIterator<*>}
 */
export function* fetchCurrent(payload) {
    try {
        yield put(Actions.fetchCurrentBegin());
        const {id} = payload;

        const response = yield call(ApiService.getNewsDetail, id);
        const {data: responseData} = response;

        yield delay(2000);

        yield put(Actions.fetchCurrentSuccess(responseData.data));

    } catch (e) {
        yield put(Actions.fetchCurrentFail(e.message));
    }
}

export default function* injectSagaRoot() {
    yield takeLatest(Types.FETCH_CURRENT, fetchCurrent);
    yield takeLatest(Types.FETCH_PAGINATE, fetchPaginate);
}
