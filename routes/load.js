var express=require('express')
var router = express.Router()

router.get('/login/api/notes/load', function(req, res, next){
    console.log("Get All Notes");
	return res.send(customers);
})

module.exports=router
