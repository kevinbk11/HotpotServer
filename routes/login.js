var express = require('express');
const app = require('../app');
var router = express.Router();

/* GET home page. */
router.post('/login', (req, res) => {
    const mysql = require('mysql');
    var mysqlConnection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'H29ka1b57klG546HJM65.',
        database: "useraccountdb",
        port: 3306

    })

    mysqlConnection.connect((err) => {
        if (!err) {
            console.log("worked!")
        } else {
            console.log(err);
        }
    })
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
        //取得帳號 並和資料庫內的帳號做比對 
        //連線到sql
        mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
            var HaveAC = false
            if (!err) {
                console.log(rows[4]);
                for (let i = 0; i != null; i++) { //一個一個搜尋帳號
                    if (rows[i].UserName == data.account) {

                        HaveAC = true; //判斷有沒有帳號
                        if (rows[i].Password == data.Password) {
                            res.redirect("/test") //引到主頁面
                        }

                    }
                }

            } else {
                console.log(err);
            }
            console.log("test");
        })
    } else { // 創建

    }




    // mysqlConnection.query(`INSERT INTO userooo VALUE (2,'${data.account}','${data.password}');`)
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
        if (!err) {
            console.log(rows[4].UserName);
        } else {
            console.log(err);
        }
        console.log("test");
    })
    res.render("mainSystemLayout")


});

module.exports = router;

function createAC() {

}

function loginAC() {

}

function compareAC() {

    //連線到sql
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
        var HaveAC = false
        if (!err) {
            console.log(rows[4]);
            for (let i = 0; i != null; i++) { //一個一個搜尋帳號
                if (rows[i].UserName == data.account) {

                    HaveAC = true; //判斷有沒有帳號
                    return i;

                    /*if(rows[i].Password == data.password){ //登入成功
                        res.redirect("/test")//引到主業面
                    } else{//登入失敗
                        res.redirect("/index.html")
                    }*/

                }

            }

        } else {
            console.log(err);
        }
        console.log("test");
    })
}