const express = require('express');
const mysql = require('mysql');
const dbConfig = require('../../dbConfig')
const db = mysql.createPool(dbConfig.mysql);
const fs = require('fs');
const pathLib = require('path');

module.exports = function () {
    var router = express.Router();
    router.get('/', function (req, res) {
        switch (req.query.action) {
            case 'mod':
                db.query('SELECT * FROM stu_info',function (err,allData) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'});
                    } else {
                        console.log("xx")
                        console.log(req.query)
                        console.log(req.query.id)
                        db.query('UPDATE stu_info SET auth_status ="1" WHERE id="'+req.query.id+'"',function (err,modData) {
                            if (err) {
                                console.error(err);
                                res.status(500).send({code: 500, msg: 'database error'});
                            }else if(modData.length == 0){
                                res.status(400).send({code: 400, msg: 'parameters error'});
                                res.redirect('/admin/users');
                            }else {
                                res.render('admin/users.ejs',{usersData:allData,modData:modData});
                            }
                        });
                        db.query('UPDATE `user` SET stu_auth_status ="1" WHERE id="'+req.query.id+'"',function (err,modData) {
                            
                        });
                    }
                });
                break;
            case 'fail':
                db.query('SELECT * FROM stu_info',function (err,allData) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'});
                    } else {
                        console.log("xx")
                        console.log(req.query)
                        console.log(req.query.id)
                        db.query('UPDATE stu_info SET auth_status ="2" WHERE id="'+req.query.id+'"',function (err,modData) {
                            if (err) {
                                console.error(err);
                                res.status(500).send({code: 500, msg: 'database error'});
                            }else if(modData.length == 0){
                                res.status(400).send({code: 400, msg: 'parameters error'});
                                res.redirect('/admin/users');
                            }else {
                                res.render('admin/users.ejs',{usersData:allData,modData:modData});
                            }
                        });
                    }
                });
                break;
            default:
                db.query('SELECT * FROM stu_info', function (err, allUsersData) {
                    if (err) {
                        console.error(err);
                        res.status(500).send({code: 500, msg: 'database error'});
                    } else {
                        res.render('admin/users.ejs', {usersData: allUsersData});
                    }
                });
        }
    });
  
    return router;
};