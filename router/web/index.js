const express = require('express');

module.exports = function () {
    var router = express.Router();
    router.get('/',function (req,res) {
       res.send('这是前端页面');
    });
    return router;
};