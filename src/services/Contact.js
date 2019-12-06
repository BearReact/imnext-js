// @flow
import api from './index';

export default {
    /**
     * 送出聯絡我們
     * @returns {*}
     */
    submitContact() {
        return api.post('contact');
    },

};
