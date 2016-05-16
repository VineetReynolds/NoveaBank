express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');
var moment = require('moment');

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

function createReportingEntries() {
	var accountOpeningDate = Date.now() - 2 * (3600 * 1000 * 24);
	var depositDate = Date.now() - 1 * (3600 * 1000 * 24);
	var withdrawalDate = Date.now() - 1 * (3600 * 1000 * 24);
	var paymentDate = Date.now();
	
	var accountOpeningEntries = [{
	  	"id": null,
		"dateTime": accountOpeningDate,
		"description": "Opening Balance",
		"type": null,
		"amount": null,
		"balance": {
			"ccy": "USD",
			"amount": 0.0
		}
	}];
	
	var depositEntries = [{
	  	"id": 1,
		"dateTime": depositDate,
		"description": "Deposit: USD 1000 to account by Frank Zappa",
		"type": "Deposit",
		"amount": {
			"ccy": "USD",
			"amount": 1000
		},
		"balance": {
			"ccy": "USD",
			"amount": 1000
		}
	}];
	
	var withdrawalEntries = [{
	  	"id": 2,
		"dateTime": withdrawalDate,
		"description": "Withdrawal: USD 100 from account by Frank Zappa",
		"type": "Withdrawal",
		"amount": {
			"ccy": "USD",
			"amount": 100
		},
		"balance": {
			"ccy": "USD",
			"amount": 900
		}
	}];
	
	var paymentEntries = [{
	  	"id": 3,
		"dateTime": paymentDate,
		"description": "Payment from Frank Zappa to John Doe",
		"type": "Withdrawal",
		"amount": {
			"ccy": "USD",
			"amount": 100
		},
		"balance": {
			"ccy": "USD",
			"amount": 800
		}
	},
	{
	  	"id": 4,
		"dateTime": paymentDate,
		"description": "Service charge for Payment from Frank Zappa to John Doe",
		"type": "Withdrawal",
		"amount": {
			"ccy": "USD",
			"amount": 0.5
		},
		"balance": {
			"ccy": "USD",
			"amount": 799.5
		}
	}];
	
	var reportingEntries = [];
	reportingEntries = reportingEntries.concat(accountOpeningEntries, depositEntries, withdrawalEntries, paymentEntries);
	
	return reportingEntries;
}

app.get('/api/customers/:customerId/reports/monthly', function (req, res){
	var reportingEntries = createReportingEntries();
	res.json(reportingEntries);
});

app.get('/api/customers/:customerId/reports/yearly', function (req, res){
	var reportingEntries = createReportingEntries();
	res.json(reportingEntries);
});

app.get('/api/customers/:customerId/reports/', function (req, res){
	if(req.query.fromDate) {
		var startDate = moment(req.query.fromDate);
	}
	if(req.query.toDate) {
		var endDate = moment(req.query.toDate).startOf('date').add(1, 'days');
	}
	
	var reportingEntries = createReportingEntries();
	var filteredEntries = _.filter(reportingEntries, function(item){
		var test = true;
		if(startDate) {
			test = test && item.dateTime >= startDate;
		}
		if(endDate) {
			test = test && item.dateTime <= endDate;
		}
		return test;
	});
	
	res.json(filteredEntries);
});

module.exports = app;