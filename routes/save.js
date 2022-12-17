var express = require('express');
var router = express.Router();
customers=[]
/* GET home page. */
router.post('/login/api/notes/save', function(req, res, next) {
    console.log('Post notes: ' + JSON.stringify(req.body));
	var customer = {};
	customer.choosedate = req.body.choosedate;
	customer.notes = req.body.notes;
	customer.selEmp = req.body.selEmp;
	customers.push(customer);
	
	return res.send(customer);
});

module.exports = router;
