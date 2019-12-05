const express = require('express');

const router = express.Router();

const responseData = {
    statusCode: null,
    message: null,
    data: {},
};

router.get('/api/promotion/eventData', async (req, res) => {
    responseData.data.rows = [
        {
            id: 1,
            title: 'Build a Universal JavaScript App with Next.js',
            author: 'Imagine',
            thumb: '/static/images/example/news-1.jpg',
            avatar: '/static/images/example/author-1.jpg',
        },
        {
            id: 2,
            title: 'Using Google Analytics with Next.js',
            author: 'Gary',
            thumb: '/static/images/example/news-2.jpg',
            avatar: '/static/images/example/author-2.jpg',
        },
        {
            id: 3,
            title: '5 (of the Many Reasons) to love Zeit\'s Next.js',
            author: 'Chris',
            thumb: '/static/images/example/news-3.jpg',
            avatar: '/static/images/example/author-3.jpg',
        },
    ];

    res.status(200).json(responseData);
});

module.exports = router;
