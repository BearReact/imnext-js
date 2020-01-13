import express from 'express';

const route = express.Router();

/**
 * 取得系統設定
 */
route.get('/system/setting', async (req, res) => {
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    res.json({
        statusCode: null,
        message: 'Successfully uploaded system settings for you',
        data: {
            isMaintain: false,
            maintainMessage: null,
            maintainEndTime: null,
            clientIP,
        },
    });
});

module.exports = route;
