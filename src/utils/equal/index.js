// @flow

/**
 * 判定是否為空
 * @param value
 * @param isCheckNumber0
 * @returns {boolean}
 */
export function isEmpty(value, isCheckNumber0 = false) {
    return (
        value === undefined
        || value === null
        || value === false
        || (isCheckNumber0 && value === 0)
        || (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0)
        || (typeof value === 'string' && value.trim().length === 0)
    );
}

/**
 * 驗證日期格式為 YYYY-MM-DD
 * @param str
 * @returns {boolean}
 */
export function isDate(str) {
    const re = new RegExp('^([0-9]{4})[.-]{1}([0-9]{1,2})[.-]{1}([0-9]{1,2})$');
    let infoValidation = true;

    const strDataValue = re.exec(str);
    if (strDataValue !== null) {
        let i;
        i = parseFloat(strDataValue[1]);
        if (i <= 0 || i > 9999) {
            /* 年 */
            infoValidation = false;
        }
        i = parseFloat(strDataValue[2]);
        if (i <= 0 || i > 12) {
            /* 月 */
            infoValidation = false;
        }
        i = parseFloat(strDataValue[3]);
        if (i <= 0 || i > 31) {
            /* 日 */
            infoValidation = false;
        }
    } else {
        infoValidation = false;
    }
    return infoValidation;
}

/**
 * 判斷是否為IP
 * @param ip
 * @returns {boolean}
 */
export function isIp(ip) {
    const reg = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
    if (reg.test(ip) && RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
        return true;
    }
    return false;
}
