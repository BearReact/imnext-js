// @flow

/**
 * 文本中的每個單詞以大寫字母開頭
 * @param str
 * @returns {string}
 */
export function toCapitalize(str) {
    return str.replace(/\b(\w)/g, $1 => $1.toUpperCase());
}

/**
 * 語言代碼轉換 (en-us -> en-US)
 * @param str
 * @returns {string}
 */
export function toLocaleUpCase(str) {
    // eslint-disable-next-line no-useless-escape
    const result = str.replace(/\-(.*)/g, $1 => $1.toUpperCase());

    // eslint-disable-next-line no-useless-escape
    return result.replace(/(.*)+\-/g, $1 => $1.toLowerCase());
}

/**
 * RGB轉16進位
 * @param rgb
 * @returns {*}
 */
export function RGBToHex(rgb) {
    const hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    const hex = x => (Number.isNaN(x) ? '00' : hexDigits[(x - (x % 16)) / 16] + hexDigits[x % 16]);
    const tmp = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return hex(tmp[1]) + hex(tmp[2]) + hex(tmp[3]);
}

/**
 * HEX(16進位)色碼轉轉RGB
 * @param hex 色碼
 * @returns {*}
 */
export function HEXToRGB(hex) {
    hex = hex.replace('#', '');
    if (/^[0-9A-F]{3}$|^[0-9A-F]{6}$/.test(hex.toUpperCase())) {
        if (hex.length === 3) {
            hex = hex.match(/[0-9A-F]/g);
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            this.value = hex;
        }

        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        return [r, g, b];
    }
    return hex;
}

/**
 * HEX(16進位)色碼轉RGBA
 * @param hex
 * @param opacity
 * @returns {Object|number[]}
 * @constructor
 */
export function HEXToRGBA(hex, opacity = 1) {
    const rgba = HEXToRGB(hex);
    if (typeof rgba === 'object') {
        rgba.push(opacity);
        return rgba;
    }
    return [0, 0, 0, 1];
}

/**
 * 數字補0方法
 * @param val 原字串
 * @param length 補滿的目標长度
 * @returns {*}
 */
export function paddingLeft(val: string, length: number) {
    if (String(val).length >= length) {
        return val;
    }
    return paddingLeft(`0${val}`, length);
}

/**
 * 轉換外部Props資訊欄位與內部相同
 * @param obj 原物件
 * @param mapping 新物件Key Value
 * @returns {{}}
 */
export function autoMapper(obj: {}, mapping: {}) {
    /*
    範例:
        const obj1 = {
            firstName: 'Sam',
            lastName: 'Xiao',
            age: 20,
        };

        const obj2 = autoMapper(obj1, {
            firstName: 'realName',
            lastName: 'niceName',
        });
    */

    return Object.entries(obj).reduce((accm, [key, value]) => {
        accm[mapping[key] || key] = value;
        return accm;
    }, {});
}

/**
 * PX轉VW
 * @param pixels PX值
 * @param pixelTotal 設計稿的寬度
 * @returns {string}
 */
export function px2vw(pixels: number, pixelTotal: number = 320) {
    return `${(pixels / pixelTotal) * 100}vw`;
}

/**
 * 解析JSON資料, 解析失敗時可回傳預設值
 * @param jsonString
 * @param catchReturn
 * @returns {{}|*}
 */
export function jsonDecode(jsonString: string, catchReturn: {} = {}) {
    try {
        const obj = JSON.parse(jsonString);
        if (typeof obj === 'object') {
            return obj;
        }
    } catch (e) {
        return catchReturn;
    }
}
