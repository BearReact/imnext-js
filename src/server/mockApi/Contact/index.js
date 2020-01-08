import express from 'express';

const route = express.Router();

route.get('/contact', async (req, res) => {
    res.json({
        statusCode: null,
        message: 'We have received your message and will contact you as soon as possible',
    });
});

module.exports = route;
