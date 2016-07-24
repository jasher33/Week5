var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res){
  res.render('home.handlebars') //We can omit the .handlebars extension as we do below
});

app.get('/other-page',function(req,res){
  res.render('other-page');
});

app.get('/math', function(req, res){
	res.render('rand', genContext());
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