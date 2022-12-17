const { json } = require('express');
var express = require('express');
var http = require('http')
const { render } = require('../app');
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
    //mysqlConnection.query(`INSERT INTO user VALUE ('${data.name}','${data.password}');`)
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
        if (!err) {
            
        } else {
            console.log(err);
        }
        console.log("test");
    })
    if(1)//登入成功
    {   //mysqlConnection.query('SELECT * FROM UserData') 菜的id
        let json1 = {'a':1,'b':2,'c':9,'d':13,'e':115}
        let arr = []
        for(key in json1)
        {
            arr.push(json1[key])
        }
        res.render("mainSystemLayout",{count:arr})//引到主業面
    }
    else//登入失敗
    {
        res.redirect("/index.html")
    }

    
});

module.exports = router;
