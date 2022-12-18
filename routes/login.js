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
<<<<<<< HEAD
    password: 'r125121587',
    database: "testdb",
    port: 3306
})
/* GET home page. */
router.post('/login', (req, res) => {


    mysqlConnection.connect((err) => {
=======
    password: 'H29ka1b57klG546HJM65.',
    database: "useraccountdb",
    port: 3306
})
mysqlConnection.connect((err) => {
>>>>>>> 5cf7013494043c6b5c0b23ddaca3aad5b462f00a
        if (!err) {
            console.log("worked!")
        } else {
            console.log(err);
        }
    })
    /* GET home page. */
router.post('/login', (req, res) => {



    var data = req.body;
<<<<<<< HEAD
=======
    /*if(1)//登入成功
    {   //mysqlConnection.query('SELECT * FROM UserData') 菜的id

        res.redirect("/test")//引到主業面
    }
    else//登入失敗
    {
        res.redirect("/index.html")
    }*/

    if (data.nickname == null) { //登入
        //取得帳號 並和資料庫內的帳號做比對 
        //連線到sql
        mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
            var HaveAC = false
            if (!err) {
                for (let i = 0; rows[i] != null; i++) {
                    console.log(rows[i]) //一個一個搜尋帳號
                    if (rows[i].UserName == data.account) {
                        HaveAC = true; //判斷有沒有帳號
                        if (rows[i].Password == data.password) {
                            let json1 = { '0': 1, '1': 2, '2': 9, '3': 13, '4': 115 } //player.可解鎖
                            let arr = []
                            for (key in json1) {
                                arr.push(json1[key])
                            }
                            console.log("Login Success");
                            res.render("mainSystemLayout", { count: arr, name: "hash" }) //引到主業面
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
            console.log("test");
        })
    } else { // 創建
        mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {

            if (!err) {
                for (let i = 0; rows[i] != null; i++) { //一個一個搜尋帳號
                    if (rows[i].UserName == data.account) {
                        //顯示這個帳號已被使用
                        console.log("Have been used");
                        break;
                    } else {
                        //將使用者填入的資料插入資料庫
                        let j = 0
                        for (j; rows[j] != null; j++) {}
                        mysqlConnection.query(`INSERT INTO user VALUE (${j+1},'${data.account}','${data.password}','${data.nickname}');`)
                        break


                        if (rows[j].UserID == j) {
                            //註冊成功 回到上一頁
                        } else {
                            //註冊失敗請在試一次
                        }

                    }
                }

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
>>>>>>> 5cf7013494043c6b5c0b23ddaca3aad5b462f00a


    mysqlConnection.query(`INSERT INTO userooo VALUE (2,'${data.account}','${data.password}');`)
    mysqlConnection.query('SELECT * FROM userooo', (err, rows, fields) => {

        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
        console.log("test");
    })

    if(1)//登入成功
    {   //player = mysqlConnection.query('SELECT * FROM user WHERE ')
        let json1 = {'0':1,'1':2,'2':9,'3':13,'4':115}//player.可解鎖
        let arr = []
        for(key in json1)
        {
            arr.push(json1[key])
        }
        res.render("mainSystemLayout",{count:arr,name:"hash"})//引到主業面

    }
    else//登入失敗
    {
        res.redirect("/index.html")
    }
    
});
module.exports = router;

function createAC() {

}

function loginAC() {

}