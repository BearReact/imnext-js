import express from 'express';

const route = express.Router();

/**
 * 聯絡我們
 */
route.post('/contact', async (req, res) => {
    res.json({
        statusCode: null,
        message: 'We have received your message and will contact you as soon as possible',
        data: req.body,
    });
});

module.exports = route;
