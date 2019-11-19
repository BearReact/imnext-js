// @flow
import appConfig from '@config/app';
import get from 'lodash/get';

/**
 * 串後端檔案上傳檔案的基礎網址
 * @param path 檔案的網址路徑
 * @param prefix 前綴路徑
 * @returns {*}
 */
export function uploadUrl(path: string = '', prefix: string = appConfig.uploadBaseUrl) {
    let fixPath = '';

    if (path) {
        fixPath = path.charAt(0) === '/' ? path.substr(1) : path;
        return `${prefix}/${fixPath}`;
    }
    return undefined;
}

/**
 * 串接前端的靜態資源基礎網址
 * @param path 檔案的網址路徑
 * @param prefix 前綴路徑
 * @returns {string}
 */
export function asset(path, prefix: string = appConfig.staticBaseUrl) {
    return `${prefix}/${path}?v=${appConfig.assetVersion}`;
}

/**
 * 串接前端的路由基礎網址
 * @param path 檔案的網址路徑
 * @param prefix 前綴路徑
 * @returns {string}
 */
export function routePath(path, prefix: string = appConfig.routePrefixPath) {
    return (`${prefix}/${path}`).replace('//','/');
}

/**
 * Obj轉QueryString
 * @param obj key value 物件
 * @returns {string}
 */
export function serialize(obj: {} = {}) {
    const str = [];
    Object.keys(obj).map((key) => {
        const value = obj[key];
        str.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        return true;
    });
    return str.join('&');
}

/**
 * 解析 Search QueryString 轉成 物件
 * @param val QueryString 字串
 * @returns {undefined}
 */
export function parseQueryString(val: string = '') {
    const pairs = val.replace(/^.*\?/, '').split('&');
    const obj = {};

    if (pairs[0] !== '') {
        pairs.map(o => {
            const p = o.split('=');
            obj[p[0]] = p[1];
            return true;
        });
        return obj;
    }
    return undefined;
}


/**
 * 取得主網域(二級域名)
 * 若非正確網址, 例如是IP位置就會回傳空白
 * @param hostName
 */
export function getMainDomain(hostName: string): string {
    // eslint-disable-next-line no-useless-escape
    const regexParse = new RegExp('[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$');
    const urlParts = regexParse.exec(hostName);
    if(urlParts){
        return get(urlParts, 0, null);
    }else{
        return null;
    }
}


/**
 * 取得子網域(最後一段)
 * 若非正確網址, 例如是IP位置就會回傳空白
 * @param hostName
 */
export function getSubDomain(hostName: string): string {
    // eslint-disable-next-line no-useless-escape
    const regexParse = new RegExp('[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$');
    const urlParts = regexParse.exec(hostName);
    if(urlParts){
        // eslint-disable-next-line no-useless-escape
        const regexFilter = new RegExp('[a-z\-0-9]{2,63}').exec(hostName.replace(urlParts[0],'').slice(0, -1));
        return get(regexFilter, 0, null);
    }else{
        return null;
    }
}
