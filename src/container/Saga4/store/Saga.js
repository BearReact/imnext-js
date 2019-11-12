import {call, put, takeLatest, delay} from 'redux-saga/effects';
import Actions, {Types} from './Reducer';


/**
 * 取明細資料
 * @returns {IterableIterator<*>}
 */
export function* fetchCurrent(payload) {
    try {
        yield put(Actions.fetchCurrentBegin());
        // const {id} = payload;

        yield delay(3000);

        // yield put(Actions.fetchCurrentSuccess());

    } catch (e) {
        yield put(Actions.fetchCurrentFail(e.message));
    }
}


export default function* injectSagaRoot() {
    yield takeLatest(Types.FETCH_CURRENT, fetchCurrent);
}
