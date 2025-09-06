const express = require('express');
const routerApi = express.Router();

routerApi.get('/', (req, res) => {
    return res.status(200).json('Xin chào từ backend!');
})

module.exports = routerApi;