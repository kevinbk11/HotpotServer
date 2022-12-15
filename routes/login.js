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
    mysqlConnection.query(`INSERT INTO user VALUE ('${data.name}','${data.password}');`)
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
        if (!err) {
            console.log(rows);
        } else {
            console.log(err);
        }
        console.log("test");
    })
    res.render("mainSystemLayout")
});

module.exports = router;