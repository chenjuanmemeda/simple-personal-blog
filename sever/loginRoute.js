
// 负责连数据库拿数据 第二阶段
var querystring=require('querystring');
var MongoClient=require('mongodb').MongoClient;
var DB_STR='mongodb://localhost:27017/test';
function login(req,res){
	var qStr='';
	req.addListener('data',function(dataPart){
		qStr+=dataPart;
	});
	req.addListener('end',function(){
		// 将客户端发过来的数据转换一个格式
		var userInfo=querystring.parse(qStr);
		MongoClient.connect(DB_STR,function(err,db){ //连接数据库
			if(err){console.log(err);return;}
			var collection=db.collection('userInfos');
			//判断是否存在用户名
			collection.find({username:userInfo.username}).toArray(function(err,result){
				if (!result[0]) { //不存在用户名
					res.write('no');
					res.end();
					db.close();
					return;
				}else {
					// 存在用户名，判断密码是否正确
					if(result[0].password==userInfo.password){
						res.write('ok');				
						res.end(); 
						db.close();
					}else{
						res.write('pswErr');
						res.end();
						db.close();
					}
				}
			});
		});
	});
}
// login(); 
// 测试是否拿到数据
module.exports=login;