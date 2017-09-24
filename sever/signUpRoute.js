// var querystring = require('querystring');
	// var config=[
	// 	{username:'哈哈哈哈',password:'1234',rePassword:'1234',headImg:'components/register/img/0.jpg'}
	// ];
	// function register(req,res){
	// 	var qStr='';
	// 	req.addListener('data',function(dataPart){
	// 		qStr+=dataPart;
	// 	});
	// 	req.addListener('end',function(){
	// 		// 将客户端发过来的数据转换一个格式
	// 		var temp =querystring.parse(qStr)
	// 		// 迭代服务器数据，如果用户输入的数据服务器已存在则返回注册失败结果，否则返回注册成功，并保存这些数据
	// 		for(var i=0;i<config.length;i++){
	// 			if(temp.username==config[i].username){			
	// 				res.write('false');
	// 				res.end();
	// 				return;	
	// 				}				
	// 			}
	// 			res.write('ok');
	// 			res.end();	
	// 			config.push(temp);  //保存数据
	// 			return;
	// 	});		
// }
// module.exports = register;

var querystring=require('querystring');
var MongoClient=require('mongodb').MongoClient;
var DB_STR="mongodb://localhost:27017/test";
function signUp(req,res){
	var qStr='';
	req.addListener('data',function(dataPart){
		qStr+=dataPart;
	});
	req.addListener('end',function(){
		var userInfo=querystring.parse(qStr);
		// console.log(userInfo);
		MongoClient.connect(DB_STR,function(err,db){ //连接数据库
			if (err) {console.log(err);res.end('服务器出现未知错误');db.close()}
			var collection=db.collection('userInfos');
			//判断是否存在相同用户名
			collection.find({username:userInfo.username}).toArray(function(err,result){
				// console.log(result);
				if (!result[0]) { //不存在用户名即可注册新用户
					collection.insert(userInfo);
					res.write('yes');
					res.end(); //返回注册成功
					db.close();
				}else{
					res.write('no');
					res.end();//返回一个false表示用户名已存在
					db.close();
				}
			});
		});
	});
}
module.exports=signUp;