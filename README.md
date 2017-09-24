基于bootstrap的响应式+vue1.0+express+mongo数据库 

1.这是一个我平时做的小练习 以为要不断更新改进，更好的管理代码的原因我现将1.0版本上传 
2.因为平时课程紧张，所以这个小作品还米有完成，只是做了最简单的首页、登陆注册部分

一、启动mongo服务器：
	1.在任意文件夹下shift+右键（在此处打开命令代码）                             
	2.在命令窗口输入：mongod --dbpath D:\mongodb\db -directoryperdb(前提是已经将mongodb安装在D盘根目录下) 
	3.按回车键 

二、打开mongo数据库：
	1.在任意文件夹下shift+右键（在此处打开命令代码） 
	2.在命令窗口输入：mongo 
	3.在命令窗口输入：show dbs 检查是否与服务器连接                   
	4.在命令窗口输入：use （自己定义的数据库名字）；例如：use test（此案例中使用的集合名字为test）                  
	5.在test这个集合表中可以先插入一些数据测试是否可以成功插入 db.tenant.insert(tenants) 
	var userInfo=[ {username:'lalal',password:'87654321',phone:'15270891589'}, 	
					{username:'lalalaa',password:'12345678',phone:'15270893223'} ];
	 db.userInfos.insert(userInfo)                    
	插入之后 输入db.test.find()如果可以查找到之前插入的数据则成功插入 
三、打开服务器：
	在app.js文件所在的文件夹中打开命令窗口 输入node app.js(前提是已经安装好node)              
	显示server is running at 8080 port..则成功连接服务器 
四、需要预览效果的话可以直接打开myindex.html 
五、打开myindex.html页面后直接进入到首页，点击注册进行注册，注册成功后可以跳转回登陆页面进行登陆（可以在数据库中db.test.find()查找到数据）
<a href=" https://chenjuanmemeda.github.io/simple-personal-blog/client/myindex.html">点击预览效果</a>

