/* eslint-disable no-console */

const baseStyles = ['color: #fff', 'display: block', 'line-height: 20px', 'padding-right: 8px'];

/**
 * 輸出訊息
 * @param title 標題
 * @param styles 顯示樣式
 * @param watchData 需要印出的訊息
 */
function messageConsole(title, styles, watchData = '') {
    console.log(`%c ${title}`, styles, watchData);
}

/**
 * Primary (深藍)
 * @param title
 * @param watchData
 */
function primary(title, watchData = '') {
    const styles = baseStyles.concat(['background-color: #007bff']).join(';');

    messageConsole(title, styles, watchData);
}

/**
 * Success (綠色)
 * @param title
 * @param watchData
 */
function success(title, watchData = '') {
    const styles = baseStyles.concat(['background-color: #28a745']).join(';');

    messageConsole(title, styles, watchData);
}

/**
 * Info (天藍)
 * @param title
 * @param watchData
 */
function info(title, watchData = '') {
    const styles = baseStyles.concat(['background-color: #17a2b8']).join(';');

    messageConsole(title, styles, watchData);
}

/**
 * Warning (黃色)
 * @param title
 * @param watchData
 */
function warning(title, watchData = '') {
    const styles = baseStyles.concat(['background-color: #ffc107']).join(';');

    messageConsole(title, styles, watchData);
}

/**
 * Danger (紅色)
 * @param title
 * @param watchData
 */
function danger(title, watchData = '') {
    const styles = baseStyles.concat(['background-color: #ec2127']).join(';');

    messageConsole(title, styles, watchData);
}

const log = {
    primary,
    success,
    info,
    warning,
    danger,
};

export default log;
