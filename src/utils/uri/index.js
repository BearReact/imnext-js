// @flow
import get from 'lodash/get';

/**
 * 串後端檔案上傳檔案的基礎網址
 * @param path 檔案的網址路徑
 * @param prefix 前綴路徑
 * @returns {*}
 */
export function uploadUrl(path: string = '', prefix: string) {
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
export function asset(path, prefix: string = process.env.STATIC_BASE_URL || '/static') {
    const prefixLastIndex = get(prefix, 'length', 1) - 1;
    const pathLastIndex = get(path, 'length', 1) - 1;

    if (prefix.substr(prefixLastIndex, 1) === '/') {
        // 檢查 Prefix 結尾不可有斜線
        throw Error('utils asset function, prefix last string can\'t have symbol("/")');
    } else if (path.substr(pathLastIndex, 1) === '/') {
        // 檢查 Path 結尾不可有斜線
        throw Error('utils asset function, path last string can\'t have symbol("/")');
    } else if (path.substr(0, 1) === '/') {
        // 檢查 Path 開頭不可有斜線
        throw Error('utils asset function, path first string can\'t have symbol("/")');
    }

    return `${prefix}/${path}`;
}

/**
 * 串接前端的路由基礎網址
 * @param path 檔案的網址路徑
 * @param prefix 前綴路徑
 * @returns {string}
 */
export function routePath(path, prefix: string) {
    return fixDoubleSlashPath(`${prefix}/${path}`);
}

/**
 * Obj轉QueryString
 * @param obj key value 物件
 * @returns {string}
 */
export function serialize(obj: {} = {}) {
    const str = [];
    Object.keys(obj).map(key => {
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
 * 修正雙斜線的路徑
 * @param path 路徑
 * @returns {undefined}
 */
export function fixDoubleSlashPath(path: string = '') {
    return path.replace('//', '/');
}

/**
 * 取得主網域(二級域名)
 * 若非正確網址, 例如是IP位置就會回傳空白
 * @param hostName
 */
export function getMainDomain(hostName: string): string {
    // eslint-disable-next-line no-useless-escape
    const regexParse = new RegExp('[a-z-0-9]{2,63}.[a-z.]{2,5}$');
    const urlParts = regexParse.exec(hostName);
    if (urlParts) {
        return get(urlParts, 0, null);
    }
    return null;
}

/**
 * 取得子網域(最後一段)
 * 若非正確網址, 例如是IP位置就會回傳空白
 * @param hostName
 */
export function getSubDomain(hostName: string): string {
    // eslint-disable-next-line no-useless-escape
    const regexParse = new RegExp('[a-z-0-9]{2,63}.[a-z.]{2,5}$');
    const urlParts = regexParse.exec(hostName);
    if (urlParts) {
        // eslint-disable-next-line no-useless-escape
        const regexFilter = new RegExp('[a-z-0-9]{2,63}').exec(hostName.replace(urlParts[0], '').slice(0, -1));
        return get(regexFilter, 0, null);
    }
    return null;
}
