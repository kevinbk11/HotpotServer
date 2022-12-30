var express = require('express');
var router = express.Router();
router.get('/game',(req,res)=>{
    res.render("mainSystemLayout", { name: r.id }) 
})
module.exports=router