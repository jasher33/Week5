var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3033);

var session = require('express-session');

app.use(session({secret:'SuperSecretPassword'}));

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/',function(req,res){
	var params = {};
	for(var p in req.query{
		params.push({"name" : p , "value" :req.query[p]});
	}
	var conetxt = {};
	context.type = "GET";
	context.item = params;
	req.render("getpost", context);
});

app.post('/' ,function(req,res){
	var params = {};
	for(var p in req.body){
		params.push({"name" : p , "value" :req.body[p]});
	}
	var conetxt = {};
	context.type = "POST";
	context.item = params;
	req.render("getpost", context);
});


app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

function genContext(){
  var stuffToDisplay = {};
  stuffToDisplay.rand = (Math.random()*10);
  return stuffToDisplay;
}