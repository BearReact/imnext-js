import {
    call, put, takeLatest, select, take, delay,
} from 'redux-saga/effects';
// import {replace} from 'connected-react-router';

import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';
// import bowser from 'bowser';
import jsCookie from 'js-cookie';
// import {isPWA} from '@utils/browser';
// import {insertIFrame} from '@utils/dom';
// import queryString from 'query-string';
// import {i18n} from '@library/intl/global';
// import get from 'lodash/get';

// import ApiService from '@services/api/Auth';
// import SystemApiService from '@services/api/System';
// import NoticeActions from '@library/redux/store/Notice/Reducer';
import UiActions from '@library/redux/store/Ui/Reducer';
// import WalletActions from '@library/redux/store/Wallet/Reducer';
// import {isEmpty} from '@utils/equal';
import Actions, {Types} from './Reducer';
import AuthActions from '../Auth/Reducer';
// import SystemActions, {Selectors as SystemSelectors} from '../System/Reducer';
// import LobbyActions from '../GameLobby/Reducer';
// import PromotionActions from '../Promotion/Reducer';
import StartupActions, {Types as StartupTypes, Selectors as StartupSelectors} from '../Startup/Reducer';

/**
 * 使用者登入
 * @returns {IterableIterator<*>}
 */
export function* submitLogin(payload) {
    try {
        yield put(Actions.submitLoginBegin());
        const {
            formParam: {account, password, isRemember},
        } = payload;

        yield put(Actions.submitLoginSuccess());
    } catch (e) {
        yield put(Actions.submitLoginFail(e.message));
        yield put(UiActions.modalOpenError(e.message, e.statusCode));
    }
}

export default [takeLatest(Types.SUBMIT_LOGIN, submitLogin)];
