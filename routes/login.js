var express = require('express');
const { render } = require('../app');
const app = require('../app');
var router = express.Router();

/* GET home page. */
router.post('/login', (req, res) => {
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
    mysqlConnection.query('SELECT * FROM UserData', (err, rows, fields) => {
        if (!err) {
            
        } else {
            console.log(err);
        }
        console.log("test");
    })
    if(1)
    {   //mysqlConnection.query('SELECT * FROM UserData') 菜的id
        res.redirect("/test")//引到主業面
        $.ajax()
    }
    else
    {
        res.redirect("/index.html")
    }


    
});

module.exports = router;