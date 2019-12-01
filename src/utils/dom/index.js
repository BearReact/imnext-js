/**
 * 判斷 elements 中的 css class
 * @param dom elements
 * @param className css class
 * @returns {boolean}
 */
export function hasClass(dom, className) {
    return !!dom.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
}

/**
 * 在 elements 中新增 css class
 * @param dom elements
 * @param className
 */
export function addClass(dom, className) {
    if (!hasClass(dom, className)) {
        dom.classList.add(className);
    }
}

/**
 * 刪除 elements 中的 css class
 * @param dom elements
 * @param className
 */
export function removeClass(dom, className) {
    dom.classList.remove(className);
}

/**
 * 插入IFrame
 * 是否事後刪除由 callback 處理
 * @param frameId 識別ID
 * @param url 網址
 * @param callBack 回乎方法
 */
export function insertIFrame(frameId, url, callBack) {
    // 插入測速工具
    if (document.getElementById(frameId) === null) {
        const i = document.createElement('iframe');
        i.id = frameId;
        i.src = url;
        i.scrolling = 'no';
        i.frameborder = '0';
        i.width = 0;
        i.height = 0;
        i.onload = () => {
            // callBack
            if (callBack) {
                callBack(i);
            }
        };

        // add iFrame
        document.body.appendChild(i);
    }
}
