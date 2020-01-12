/* eslint-disable import/no-dynamic-require */
import express from 'express';

const route = express.Router();

/**
 * 最新消息列表
 */
route.get('/news', async (req, res) => {
    res.json({
        statusCode: null,
        message: 'We have received your message and will contact you as soon as possible',
        data: require('./mock/list.json'),
    });
});

/**
 * 最新消息明細
 */
route.get('/news/:id', async (req, res) => {
    const {id} = req.params;
    res.json({
        statusCode: null,
        message: 'We have received your message and will contact you as soon as possible',
        data: require(`./mock/detail/${id}.json`),
    });
});

module.exports = route;
