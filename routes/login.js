const { json } = require('express');
var express = require('express');

var http = require('http')
const { render } = require('../app');

const app = require('../app');
var router = express.Router();
const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'r125121587',
    database: "testdb",
    port: 3306
})
mysqlConnection.connect((err) => {
        if (!err) {
            console.log("worked!")
        } else {
            console.log(err);
        }
    })
    /* GET home page. */
router.post('/login', (req, res) => {

    var data = req.body;
    if (data.nickname == null) { //登入
        mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
            if (!err) {
                for (let i = 0; rows[i] != null; i++) {
                    if (rows[i].Account == data.account) {
                        if (rows[i].Password == data.password) {
                            res.render('mainSystemLayout',{name:rows[i].nickname})
                            return
                        }
                    }

                }
                res.send('<script>' + 
                'alert("登入失敗!請檢查您的帳號密碼。")' + 
                '\nwindow.location.href = "/"' +
                '</script>')


            } else {
                console.log(err);
            }
        })
    } else { // 創建
        mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
            if (!err) {
                for (let i = 0; rows[i] != null; i++) { //一個一個搜尋帳號
                    if (rows[i].Account == data.account) {
                        //顯示這個帳號已被使用
                        res.send('<script>' + 
                        'alert("這個帳號已經被使用了")' + 
                        '\nwindow.location.href = "/"' +
                        '</script>')
                        return
                    }
                    if (rows[i].nickname == data.nickname) {
                        //顯示這個暱稱已被使用
                        res.send('<script>' + 
                        'alert("這個暱稱已經被使用了")' + 
                        '\nwindow.location.href = "/"' +
                        '</script>')
                        return
                    }
                }
                let j = 0
                for (j; rows[j] != null; j++);
                let newId = Math.floor(Math.random()*10000)
                mysqlConnection.query(`SELECT * FROM user WHERE id = ${newId}`,(err,rows2)=>{
                    while(rows2.length!=0)
                    {
                        newId = Math.floor(Math.random()*10000)
                        mysqlConnection.query(`SELECT * FROM user WHERE id = ${newId}`,(err,rows3)=>{
                        })
                    }
                })
                mysqlConnection.query(`INSERT INTO user VALUE (${j+1},'${data.account}','${data.password}','${data.nickname}','${newId}');`)
                mysqlConnection.query(`INSERT INTO userstatus VALUE (${j+1},'${data.nickname}',100,100,100,500,1,0,${newId},'[1,2,3]');`)
                res.render("mainSystemLayout", { name: newId })
            } else {
                console.log(err);
            }
            console.log("test");
        })
    }

});
module.exports = {'router':router,'sql':mysqlConnection};

