// @flow
import api from './index';

export default {
    /**
     * 查詢 會員個人資料
     * @returns {*}
     */
    getProfile() {
        return api.get('profile');
    },
};
