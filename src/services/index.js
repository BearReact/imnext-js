// @flow

import apisauce from 'apisauce';

const apiService = apisauce.create({
    baseURL: __global__.baseApiUrl,
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'Site-ID': __global__.siteId,
    },
    withCredentials: false, // 是否允許帶Cookie(會影響跨來源資源共用CORS)
    timeout: 20000,
});

export default apiService;
