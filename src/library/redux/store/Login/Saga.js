import {
    call, put, takeLatest, select, take, delay,
} from 'redux-saga/effects';

import jwtDecode from 'jwt-decode';
import get from 'lodash/get';

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

        // call api
        const {data: responseData} = yield call(ApiService.submitLogin, email.trim());

        // handle data
        const token = get(responseData, 'data.token', '');
        const {exp} = jwtDecode(token);

        yield put(AuthActions.handleSetAuth(token, exp, email));

        // done
        yield put(Actions.submitLoginSuccess());

    } catch (e) {
        yield put(Actions.submitLoginFail(e.message));
        console.log('error', e.message);
    }
}

/**
 * 使用者登出
 * @returns {IterableIterator<*>}
 */
export function* submitLogout(payload) {

    try {
        yield put(Actions.submitLogoutBegin());

        const response = yield call(ApiService.submitLogout);

        const {data: responseData} = response;

        // 清除權限設定
        yield put(AuthActions.handleClearAuth());
        yield put(Actions.submitLogoutSuccess());

    } catch (e) {
        yield put(Actions.submitLogoutFail(e.message));
        console.error(e.message);
    }
}

export default [
    takeLatest(Types.SUBMIT_LOGIN, submitLogin),
    takeLatest(Types.SUBMIT_LOGOUT, submitLogout),
];
