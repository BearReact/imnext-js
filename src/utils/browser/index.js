// @flow

export function isMobile() {
    try{ document.createEvent('TouchEvent'); return true; }
    catch(e){ return false;}
}

/**
 * 判斷是否為IOS
 * @returns {boolean}
 */
export function isIos(){
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent );
}


/**
 * 判斷是否為IE瀏覽器
 * @returns {boolean}
 */
export function isIE(){
    return (!!window.ActiveXObject || 'ActiveXObject' in window);
}


/**
 * 判斷是否為Safari
 * @returns {boolean}
 */
export function isSafari(){
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /safari/.test( userAgent ) && !/chrome/.test( userAgent );
}

/**
 * 判斷是否為PWA模式
 * @returns {boolean}
 */
export function isPWA(){
    return ('standalone' in window.navigator) && (window.navigator.standalone);
}


/**
 * 滾動條在Y軸上的滾動距離
 * @returns {number}
 */
export function getScrollTop()
{
    let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if(document.body){
        bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement){
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}


/**
 * 文檔的總高度
 * @returns {*|number}
 */
export function getScrollHeight(){
    let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if(document.body){
        bodyScrollHeight = document.body.scrollHeight;
    }
    if(document.documentElement){
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight ;
    return scrollHeight;
}


/**
 * 瀏覽器顯示的高度
 * @returns {number}
 */
export function getWindowHeight(){
    let windowHeight = 0;
    if(document.compatMode === 'CSS1Compat'){
        windowHeight = document.documentElement.clientHeight;
    }else{
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}
