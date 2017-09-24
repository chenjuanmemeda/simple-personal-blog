// var http=require('http');
var express=require('express');

var loginRoute=require('./loginRoute.js');
var signUpRoute=require('./signUpRoute.js');
var app=express();
app.all('*',function(req,res,next){
	if(/favicon/.test(req.url)){res.end();return;}
	res.setHeader('Access-Control-Allow-Origin','*');
	next();
});
app.post('/login',function(req,res,next){
	// console.log(123);
	loginRoute(req,res);
});
app.post('/signUp',function(req,res,next){
	// console.log(123);
	signUpRoute(req,res);
});
app.use(express.static(__dirname+'/client	'));
app.use('*',function(req,res){
	res.send('404');
	res.end();
});
http.createServer(app).listen(8080);
console.log('server is running at 8080 port');
