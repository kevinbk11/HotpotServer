var express = require('express');
var router = express.Router();
var id=-1
router.post('/game',(req,res)=>{
    id=req.body.id
    res.render('mainSystemLayout',{name:id})
})
router.get('/game',(req,res)=>{
    res.render('mainSystemLayout',{name:id})
    id=-1
})
module.exports=router