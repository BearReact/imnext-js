import express from 'express';

const route = express.Router();

/**
 * 登入
 */
route.get('/profile', async (req, res) => {
    res.json({
        statusCode: null,
        message: 'success',
        data: {
            email: 'imagine10255',
            name: 'imagine',
            country: 'taiwan',
            signUpDate: '2020-01-10',
        },
    });
});

module.exports = route;
