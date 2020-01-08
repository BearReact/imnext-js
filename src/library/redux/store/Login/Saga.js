import {
    call, put, takeLatest, select, take, delay,
} from 'redux-saga/effects';

import jwtDecode from 'jwt-decode';

import ApiService from '@services/Auth';
import UiActions from '@library/redux/store/Ui/Reducer';
import Actions, {Types} from './Reducer';
import AuthActions from '../Auth/Reducer';

/**
 * 使用者登入
 * @returns {IterableIterator<*>}
 */
export function* submitLogin(payload) {

    try {
        yield put(Actions.submitLoginBegin());
        const {
            formParam: {email},
        } = payload;

        const response = yield call(ApiService.submitLogin, email.trim());

        const {data: responseData} = response;
        if (response.ok) {
            const {token} = responseData.data;

            const {exp} = jwtDecode(token);

            yield put(AuthActions.handleSetAuth(email));
            yield put(AuthActions.handleSetToken(token));
            yield put(Actions.submitLoginSuccess());

        } else {
            throw new Error('Cannot log in for you without obtaining a server-side token');
        }
    } catch (e) {
        yield put(Actions.submitLoginFail(e.message));
        yield put(UiActions.modalOpenError(e.message, e.statusCode));
    }
}

export default [takeLatest(Types.SUBMIT_LOGIN, submitLogin)];
