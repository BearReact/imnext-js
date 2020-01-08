// @flow
import api from './index';

export default {
    /**
     * 登入
     * @param email Email
     * @returns {*}
     */
    submitLogin(email: string) {
        return api.post('auth/login', {email});
    },
};
