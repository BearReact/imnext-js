const express = require('express');
const newsData = require('../../services/mock/news/getNewsList');

const router = express.Router();
const exampleResponseData = {
    statusCode: null,
    message: null,
    data: {},
};

function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}

/**
 * 取得最新消息明細
 */
router.get('/api/news/:id', async (req, res) => {
    const responseData = Object.assign({}, exampleResponseData, {
        data: newsData.find(row => String(row.id) === req.params.id),
    });

    res.status(200).json(responseData);
});

/**
 * 取得最新消息列表
 */
router.get('/api/news', async (req, res) => {
    const responseData = Object.assign({}, exampleResponseData, {
        data: {
            rows: newsData,
        },
    });

    res.status(200).json(responseData);
});

/**
 * 送出聯絡我們表單
 */
router.post('/api/contact', async (req, res) => {
    await wait(5000);
    const responseData = Object.assign({}, exampleResponseData, {
        message: 'We have received your message and will contact you as soon as possible',
    });

    res.status(200).json(responseData);
});

module.exports = router;
