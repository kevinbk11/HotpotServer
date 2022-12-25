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
        let json1 = { '0': 1, '1': 2, '2': 9, '3': 13, '4': 115 } //player.可解鎖
        let arr = []
        for (key in json1) {
            arr.push(json1[key])
        }
        mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
            var HaveAC = false
            if (!err) {
                for (let i = 0; rows[i] != null; i++) {
                    if (rows[i].Account == data.account) {
                        HaveAC = true; //判斷有沒有帳號
                        if (rows[i].Password == data.password) {
                            let json1 = { '0': 1, '1': 2, '2': 9, '3': 13, '4': 115 } //player.可解鎖
                            let arr = []
                            for (key in json1) {
                                arr.push(json1[key])
                            }
                            console.log("Login Success");

                            res.render("mainSystemLayout", { count: arr, name: rows[i].id }) //引到主業面
                                //正確就引到主頁面
                            break
                        }
                    }
                }
                if (HaveAC == false) {
                    console.log("testterror")
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
                        console.log("Have been used");
                        return
                    }
                }
                let j = 0
                for (j; rows[j] != null; j++) {}
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
                mysqlConnection.query(`INSERT INTO userstatus VALUE (${j+1},'${data.nickname}',100,100,100,500,1,0);`)
                res.render("mainSystemLayout", { count: [1,32,165,321,14], name: newId })
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