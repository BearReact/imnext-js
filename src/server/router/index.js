const express = require('express');

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
