// @flow
// a library to wrap and simplify api calls
import apisauce from 'apisauce';
import get from 'lodash/get';
import {isEmpty} from '@utils/equal';

import {useSelector} from 'react-redux';

const apiService = apisauce.create({
    baseURL: '/mock',
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Accept-Language': 'en-US',
    },
    withCredentials: false, // 是否允許帶Cookie(會影響跨來源資源共用CORS)
    timeout: 20000, // 超時設定
});

export default apiService;
