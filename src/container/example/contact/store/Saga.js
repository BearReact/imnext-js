import {
    call, put, takeLatest, delay,
} from 'redux-saga/effects';
import ApiService from '@services/Contact';
import Actions, {Types} from './Reducer';

/**
 * 送出表單
 * @returns {IterableIterator<*>}
 */
export function* submitForm(payload) {
    try {
        yield put(Actions.submitFormBegin());
        const {id} = payload;

        const response = yield call(ApiService.submitContact, id);
        const {data: responseData} = response;

        yield delay(2000);

        yield put(Actions.submitFormSuccess(responseData.message));
        alert(responseData.message);

    } catch (e) {
        yield put(Actions.submitFormFail(e.message));
    }
}

export default function* injectSagaRoot() {
    yield takeLatest(Types.SUBMIT_FORM, submitForm);
}
