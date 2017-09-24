var signup=Vue.extend({
	template:'#signup',
	data:function(){
		return{
			userInfo:{
				username:'',   //用户名
				password:'',   //密码
				pwdRepeat:'', //确认密码
				phone:'',   //手机号码
				email:''  //邮箱
			},
			usernameError:'',   //用户名错误提示信息 
			usernameErrorShow:false,  //用户名错误提示框

			passwordError:'',   //密码错误提示信息
			passwordErrorShow:false,  //密码错误提示框

			rePasswordError:'', //确认密码错误提示信息
			rePasswordErrorShow:false, //确认密码错误提示框

			phoneError:	'' ,  //手机号码错误提示信息
			phoneErrorShow:false, //手机号码错误信息提示框

			emailError:'',	//邮箱错误提示信息
			emailErrorShow:'',   //邮箱错误提示信息

			beDisabled:true,		 //如果格式错误 按钮不可点击
			
		};
	},
	created:function(){
		// for(var i in this.config){
		// 	this.signUpData[this.fields[i].name]='';
		// }
		// this.signUpData.isAgree='true';
	},
	// props:['str'],
	methods:{
		// 验证用户输入格式是否正确,如果正确则给服务器发送用户注册信息
		inputChange:function(errorItem,inputContent){
			var reg1 = /^([a-zA-Z]|[\u4e00-\u9fa5]){1}([a-zA-Z0-9]|[\u4e00-\u9fa5]|[_]){3,15}$/ ;  //用户名由4-16位的字母，数字，汉字，下划线组成，开头只能是字母和汉字
			var reg2 =/^[a-zA-Z0-9]{4,10}$/;   //密码由4-10位的字母，数字组成
			var reg3 = /^1[3|4|5|7|8]\d{9}$/;//手机号码正则表达式
			var reg4=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;  //邮箱验证
			
			if (errorItem === 'username') {
			   if (this.userInfo.username=='') {
					   this.usernameErrorShow= true;
				   this.usernameError= '用户名不能为空';
				   this.beDisabled = true;
			   }else if(!reg1.test(inputContent)){
					   this.usernameErrorShow= true;
					   this.usernameError= '请输入4-6位由字母和汉字组成的用户名';
					   this.beDisabled = true;
			   }else{
				   this.usernameErrorShow= false; 
				   this.beDisabled = false;  
			   }
		   }else if(errorItem === 'password') {
			   if (inputContent=='') {
					  this.passwordErrorShow = true;
				   this.passwordError = '密码不能为空';
				   this.beDisabled = true;
			   }else if(!reg2.test(inputContent)){
					   this.passwordErrorShow = true;
					   this.passwordError = '请输入由4-10位的字母，数字组成的密码';
					   this.beDisabled = true;
			   }else{
					this.passwordErrorShow = false;
					this.beDisabled = false; 
			   }
			}else if(errorItem === 'pwdRepeat'){
				if(inputContent==''){
					this.rePasswordErrorShow = true;
					this.rePasswordError = '请再次输入密码';
					this.beDisabled = true;
				}else if(!reg2.test(inputContent)){
					this.rePasswordErrorShow = true;
					this.rePasswordError = '请输入由4-10位的字母，数字组成的密码';
					this.beDisabled = true;	
				} else{
					this.rePasswordErrorShow = false;
					this.beDisabled = false;
				}
			}else if(errorItem=='phone'){
				if(inputContent==''){
					this.phoneErrorShow=true;
					this.phoneError='手机号码不能为空';
					this.beDisabled = true;	
				}else if(!reg3.test(inputContent)){
					this.phoneErrorShow = true;
					this.phoneError = '请输入正确的手机号码';
					this.beDisabled = true;
				}else{
					this.phoneErrorShow = false;
					this.beDisabled = false; 
				}
			}else if(errorItem=='email'){
				if(inputContent==''){
					this.emailErrorShow=true;
					this.emailError='邮箱地址不能为空';
					this.beDisabled = true;	
				}else if(!reg4.test(inputContent)){
					this.emailErrorShow = true;
					this.emailError = '请输入正确的邮箱地址';
					this.beDisabled = true;
				}else{
					this.emailErrorShow = false;
					this.beDisabled = false; 
				}
			}else{
				this.beDisabled = true;
				this.passwordErrorShow = false;
				this.passwordErrorShow = false;
			}
		},
		reset:function(){
			this.userInfo.username='';
			this.userInfo.password='';
			this.userInfo.pwdRepeat='';
			this.userInfo.phone='';
			this.userInfo.email='';
			this.usernameErrorShow=false;
			this.passwordErrorShow = false;
			this.rePasswordErrorShow = false;
			this.phoneErrorShow = false;
			this.emailErrorShow = false;
		},
		//给服务器发送请求
		submit:function(){
			this.$http({
				url:'http://localhost:8080/signUp',
				emulateJSON: true,
				method:"post",
				data:this.userInfo
			}).then(function(res){
				console.log(res);
				if(res.data == 'yes'){
					if(confirm('是否自动跳转到首页')){
						
						window.location.replace("../../myindex.html");
					}else{
						window.location.reload();
					}
					// window.location.replace("../../myindex.html");
					// this.$store.state.isShow=true;
				}else{
					this.usernameErrorShow= true;
					this.usernameError= '该用户名已被注册';
					this.beDisabled = true;
				}
			},function(){})
		}
	}
});
		
Vue.component('signup',signup);