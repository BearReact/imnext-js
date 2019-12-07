import {
    call, put, takeLatest, delay, race, select,
} from 'redux-saga/effects';
import ApiService from '@services/Contact';
import {i18n} from '@library/i18next/configureI18Next';
import Actions, {Types, Selectors} from './Reducer';

function* runProgress() {
    let progress = 0;

    while (progress < 100) {
        progress = yield select(Selectors.progress);

        const rand = Math.floor(Math.random() * 4);
        const newProgress = progress + rand;
        if (newProgress <= 100) {
            if (rand > 0) {
                yield put(Actions.setProgress(newProgress));
            }
        } else {
            yield put(Actions.setProgress(100));
        }
        yield delay(100);
    }
}

/**
 * 送出表單
 * @returns {IterableIterator<*>}
 */
export function* submitForm(payload) {
    try {
        yield put(Actions.submitFormBegin());
        const {id} = payload;

        // 避免 API回傳時間過長, 需要設定讀取進度讓使用者感覺不會等太久
        // 並將時間設定回傳時間為5秒內, 超過時間未回傳則彈出逾時訊息並取消
        const [response, nonTime] = yield race([
            call(ApiService.submitContact, id),
            call(runProgress),
        ]);

        if (response) {
            yield put(Actions.setProgress(100));
            yield delay(500);

            const {data: responseData} = response;
            yield put(Actions.submitFormSuccess(responseData.message));
            alert(responseData.message);
        } else {
            yield delay(500);
            throw Error(i18n.t('common:errorHttp.timeoutError', {sec: 5}));
        }

    } catch (e) {
        yield put(Actions.submitFormFail(e.message));
        alert(e.message);
    }
}

export default function* injectSagaRoot() {
    yield takeLatest(Types.SUBMIT_FORM, submitForm);
}
