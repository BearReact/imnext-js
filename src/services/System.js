// @flow
import api from './index';

export default {
    /**
     * 取得系統設定
     * @returns {*}
     */
    getSetting() {
        return api.get('system/setting');
    },
};
