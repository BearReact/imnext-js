/* eslint-disable import/no-dynamic-require */
import express from 'express';

const route = express.Router();

route.get('/news', async (req, res) => {
    const data = require('./mock/list.json');
    res.json({
        statusCode: null,
        message: 'We have received your message and will contact you as soon as possible',
        data,
    });
});

route.get('/news/:id', async (req, res) => {
    const {id} = req.params;

    const data = require(`./mock/detail/${id}.json`);

    res.json({
        statusCode: null,
        message: 'We have received your message and will contact you as soon as possible',
        data,
    });
});

module.exports = route;
