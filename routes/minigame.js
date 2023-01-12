var express = require('express');
var router = express.Router();
var path=require('path')
var sql = require('./game').sql
router.get('/minigame',(req,res)=>{
    res.render('minigame')
})

module.exports=router