var express = require('express');
var router = express.Router();
var path=require('path')
router.post('/game/game1',(req,res)=>{
    res.sendFile('E:\\vsCodeProject\\project\\HotpotServer\\public\\index2.html')
})

module.exports=router