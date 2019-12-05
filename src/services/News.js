// @flow
import api from './index';

export default {
    /**
     * 查詢 優惠活動/活動任務/資料列表
     * @returns {*}
     */
    getNewsList() {
        return api.get('promotion/eventData');
    },
    /**
     * 查詢 優惠活動/活動任務/詳細內容
     * @returns {*}
     */
    getNewsDetail(id) {
        return api.get(`promotion/eventData/${id}`);
    },
};
