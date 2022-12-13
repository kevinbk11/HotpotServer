var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/test', (req, res)=> {
    const mysql = require('mysql');
    var mysqlConnection = mysql.createConnection({
        host:'localhost',
        user : 'root',
        password : 'r125121587',
        database : "testdb",
        port : 3306
      
    })
  
    mysqlConnection.connect((err)=>{
        if(!err)
        {
            console.log("worked!")
        }
        else
        {
            console.log(err);
        }
    })
    var data=req.body;
    mysqlConnection.query(`INSERT INTO UserData VALUE ('${data.name}','${data.password}');`)
    mysqlConnection.query('SELECT * FROM UserData',(err,rows,fields)=>{
        if(!err)
        {
            console.log(rows);
        }
        else
        {
          console.log(err);
        }
        console.log("test");
    })
    res.render("mainSystemLayout")
});

module.exports = router;
