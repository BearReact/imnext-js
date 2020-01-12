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

            yield put(AuthActions.handleSetAuth(token, exp, email));
            yield put(Actions.submitLoginSuccess());

        } else {
            throw new Error('Cannot log in for you without obtaining a server-side token');
        }
    } catch (e) {
        yield put(Actions.submitLoginFail(e.message));
        yield put(UiActions.modalOpenError(e.message, e.statusCode));
    }
}

/**
 * 使用者登入
 * @returns {IterableIterator<*>}
 */
export function* submitLogout(payload) {

    try {
        yield put(Actions.submitLogoutBegin());

        const response = yield call(ApiService.submitLogout);

        const {data: responseData} = response;
        if (response.ok) {
            // 清除權限設定
            yield put(AuthActions.handleClearAuth());

            yield put(Actions.submitLogoutSuccess());

        } else {
            throw new Error(responseData.message);
        }

    } catch (e) {
        yield put(Actions.submitLogoutFail(e.message));
        yield put(UiActions.blockClose());
    }
}

export default [
    takeLatest(Types.SUBMIT_LOGIN, submitLogin),
    takeLatest(Types.SUBMIT_LOGOUT, submitLogout),
];
