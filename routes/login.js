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
/* GET home page. */
router.post('/login', (req, res) => {


    mysqlConnection.connect((err) => {
        if (!err) {
            console.log("worked!")
        } else {
            console.log(err);
        }
    })
    var data = req.body;


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