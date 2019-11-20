
/**
 * 插入資料到陣列的第一筆
 * @param arrayData
 * @param pushData
 * @returns {*[]}
 */
export function insert(arrayData: [], pushData: any) {
    return [pushData].concat(arrayData.slice(0));
}

/**
 * 插入資料到陣列的結尾
 * @param arrayData
 * @param pushData
 * @returns {*[]}
 */
export function push(arrayData: [], pushData: any) {
    return arrayData.slice(0).concat(pushData);
}
