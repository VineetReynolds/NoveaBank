express = require('express');
var app = express();
var bodyParser = require('body-parser');

// To parse application/json data
app.use(bodyParser.json());

app.get('/api/customers/:customerId', function (req, res){
	res.json({
  	  "account": {
  		  "iban": "USccAXXXXYYYYYZZZZZXXXXXYYYYYZZZZZ",
  		  "balance": {
  			  "amount": 100,
  			  "ccy": "USD"
  		  },
  		  "lastUpdatedOn" : Date.now()
  	  }
	});
});

app.post('/api/customers/:customerId/contacts', function (req, res){
	res.json({
	  	"id": 1,
		"iban": req.body.iban,
		"fullName": req.body.fullName
	});
});

app.get('/api/customers/:customerId/contacts', function (req, res){
	res.json([{
	  	"id": 1,
		"iban": "US75 ARAM 2000 0000 0000 0000 0019",
		"fullName": "Frank Zappa"
	}]);
});

app.get('/api/customers/:customerId/contacts/1', function (req, res){
	res.json({
	  	"id": 1,
		"iban": "US75 ARAM 2000 0000 0000 0000 0019",
		"fullName": "Frank Zappa"
	});
});

app.put('/api/customers/:customerId/contacts/1', function(req, res){
	res.json({
	  	"id": 1,
		"iban": req.body.iban,
		"fullName": req.body.fullName
	});
});

app.post('/api/customers/:customerId/deposits', function (req, res){
	if(req.body.amount > 0) {
		res.location('/api/' + req.params.customerId + "/deposits/1");
		res.status(201).send(null);
	} else {
		res.status(500).json({
			"message" : "Invalid amount"
		});
	}
});

app.post('/api/customers/:customerId/withdrawals', function (req, res){
	if(req.body.amount > 0) {
		res.location('/api/' + req.params.customerId + "/withdrawals/1");
		res.status(201).send(null);
	} else {
		res.status(500).json({
			"message" : "Invalid amount"
		});
	}
});

app.post('/api/customers/:customerId/payments', function (req, res){
	if(req.body.amount > 0) {
		res.location('/api/' + req.params.customerId + "/payments/1");
		res.status(201).send(null);
	} else {
		res.status(500).json({
			"message" : "Invalid amount"
		});
	}
});

module.exports = app;