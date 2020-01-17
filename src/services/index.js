// @flow

import axios from 'axios';
import {create} from 'apisauce';
import get from 'lodash/get';

import {isEmpty} from '@utils/equal';
import {i18n} from '@library/i18next/configureI18Next';
import {Selectors as AuthSelectors} from '@library/redux/store/Auth/Reducer';
import LoginActions from '@library/redux/store/Login/Reducer';
import {store} from '@library/redux/configureStore';

const customAxiosInstance = axios.create({
    baseURL: __global__.baseApiUrl,
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept-Language': __global__.defaultLang,
        'Site-ID': __global__.siteId,
    },
    timeout: 20000,
});
const apiService = create({axiosInstance: customAxiosInstance});

/**
 * Request After Middleware
 */
apiService.addRequestTransform(request => {

    // 語系設定
    request.headers['Accept-Language'] = i18n.language;

    const token = AuthSelectors.token(store.getState());
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
});

/**
 * Response After Middleware
 */
apiService.addResponseTransform(response => {
    if (response.ok) {
        const {headers} = response;

        /** 請求成功, 額外處理區塊 */
        // if (headers.Authentication) {
        // 設定認證
        // store.dispatch(AuthAction.setToken(response.data.token));
        // }

    } else {
        /** 請求失敗, 額外處理區塊 */
        const {
            status, problem, originalError, config, data: responseData,
        } = response;

        if (!isEmpty(status)) {

            const message = get(responseData, 'message', i18n.t(`common:errorHttp.${status}`));
            const statusCode = get(responseData, 'statusCode', status);

            switch (response.status) {
                case 401:
                    store.dispatch(LoginActions.kickSetGuest());
                    throw new Error(message);

                case 511:
                    // store.dispatch(replace('/no-access'));
                    throw new Error(message);

                default:
                    throw new Error(message);
            }

        } else if (!isEmpty(problem)) {
            switch (problem) {
                case 'NETWORK_ERROR':
                    throw new Error(i18n.t('common:errorHttp.networkError'));

                case 'TIMEOUT_ERROR':
                    throw new Error(i18n.t('common:errorHttp.networkError'));

                default:
                    throw new Error(`${problem}: ${originalError}`);
            }
        }
    }
    return response;
});

export default apiService;
