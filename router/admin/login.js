const express = require('express');
const mysql = require('mysql');
const dbConfig = require('../../dbConfig')
const db = mysql.createPool(dbConfig.mysql);

module.exports = function () {
    var router = express.Router();
    router.get('/',function (req,res) {
       res.render('admin/login.ejs');
    });
    router.post('/',function (req,res) {
        var username = req.body.username;
        var password = req.body.password;
        console.log(username)
        console.log(password)


        if(username && password){
            db.query('SELECT * FROM admin WHERE username="'+username+'"',function (err,userData) {
                if(err){
                    console.error(err);
                    res.status(500).send({code:500,data:[],msg:'database error'});
                }else if(userData.length == 0){
                    res.status(400).send({code:400,data:[],msg:'parameters error'});
                }else{
                    if(userData[0].password != password){
                        res.status(400).send({code:400,data:[],msg:'username or password error'});
                    }else{
                        req.session['user_id'] = userData[0].ID;//这里是在req上面
                        res.status(200).send({code:200,data:[],msg:'success'});
                    }
                }
            })
        }else{
            res.status(400).send({code:400,data:[],msg:'parameters error'});
        }
    });
    return router;
};
