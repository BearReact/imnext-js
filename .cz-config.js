'use strict';

module.exports = {
    types: [
        {value: 'feat', name: '特性: 開發新的功能, 特性'},
        {value: 'fix', name: '修正: 修正問題的bug'},
        {value: 'refactor', name: '優化: 程式碼優化, 重構, 調整'},
        {value: 'docs', name: '文件: 新增說明文件或程式碼註解'},
        {value: 'test', name: '測試: 新增測試案例'},
        {value: 'chore', name: '其他: 其他非代碼的修改 (流程建置, CI/CD設定...等)'},
        {value: 'revert', name: '還原: 因版本異常而復原版本'}
    ],
    messages: {
        type: '選擇您這次提交的更改類型:',
        customScope: '請輸入影響範圍 (可忽略)',
        subject: '請輸入提交的內容:\n',
        body: '請輸入問題的完整描述 (可忽略). Use "|" to break new line:\n',
        footer: '列出此更改可解決的問題單號 (optional). E.g.: #31, #34:\n',
        confirmCommit: '你確定使用以上回覆提交?'
    },
    allowCustomScopes: true
};
