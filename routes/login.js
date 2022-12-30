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
    /*if(1)//登入成功
    {   //mysqlConnection.query('SELECT * FROM UserData') 菜的id

        res.redirect("/test")//引到主業面
    }
    else//登入失敗
    {
        res.redirect("/index.html")
    }*/

    if (data.nickname == null) { //登入
        mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
            var HaveAC = false
            if (!err) {
                for (let i = 0; rows[i] != null; i++) {
                    if (rows[i].Account == data.account) {
                        if (rows[i].Password == data.password) {
                            mysqlConnection.query(`SELECT * FROM userstatus WHERE ID = ${rows[i].id}`, (err, rows2)=>{
                                let json1 = JSON.parse(rows2[i].Unlocked)
                                let arr = []
                                for (key in json1) {
                                    arr.push(json1[key])
                                }
                                console.log(arr)
                                res.redirect('game')
                                res.render("mainSystemLayout", { count: arr, name: rows[i].id }) //引到主業面

                            })
                            break
                        }
                    }
                    res.send('<script>' + 
                    'alert("登入失敗!請檢查您的帳號密碼。")' + 
                    '\nwindow.location.href = "/"' +
                    '</script>')
                }

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
                        //顯示這個帳號已被使用
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
                res.render("mainSystemLayout", { count: [1,2,3], name: newId })
            } else {
                console.log(err);
            }
            console.log("test");
        })
    }




    // mysqlConnection.query(`INSERT INTO userooo VALUE (2,'${data.account}','${data.password}');`)
    /*mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
            if (!err) {
                console.log(rows[4].UserName);
            } else {
                console.log(err);
            }
            console.log("test");
        })*/



    
});
module.exports = {'router':router,'sql':mysqlConnection};

function createAC() {

}

function loginAC() {

}