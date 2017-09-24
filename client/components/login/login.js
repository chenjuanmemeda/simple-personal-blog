var login=Vue.extend({
    template:'#login',
    components:{popwindow:popwindow},
    data:function(){
        return {
            userInfo:{
				username:'',   //用户名
				password:'',   //密码
				
            },
            loginInData:{},
            usernameError:'',    //用户名错误提示信息 
			passwordError:'',	 //密码错误提示信息
			usernameErrorShow:false,  //用户名错误提示框
			passwordErrorShow:false,  //密码错误提示框
            beDisabled:true,     //如果格式错误 按钮不可点击
            cookieData:['userInfo.username','userInfo.password'],
        };
    },
    created:function(){
		for(var i in this.userInfo){
			this.loginInData[this.userInfo.username]='';
		}
	},
    methods:{
            Close:function(){
                this.$store.state.isShow=false;
            },
            joke:function(){
              alert("自己再好好想想...")
            },
            inputChange:function(errorItem,inputContent){
                var reg1 = /^([a-zA-Z]|[\u4e00-\u9fa5]){1}([a-zA-Z0-9]|[\u4e00-\u9fa5]|[_]){3,8}$/ ;  //用户名由4-16位的字母，数字，汉字，下划线组成，开头只能是字母和汉字
                var reg2 =/^[a-zA-Z0-9]{4,10}$/;   //密码由4-10位的字母，数字组成	
                if (errorItem === 'username') {     
                   if (inputContent=='') {
                           this.usernameErrorShow= true;
                       this.usernameError= '用户名不能为空';
                       this. beDisabled=true;
                   }else if(!reg1.test(inputContent)){
                           this.usernameErrorShow= true;
                           this.usernameError= '用户名格式错误';
                           this. beDisabled=true;
                   }else{
                       this.usernameErrorShow= false;
                       this. beDisabled=false; 
                   }
               }else if(errorItem === 'password') {
                   if (inputContent=='') {
                          this.passwordErrorShow = true;
                       this.passwordError = '密码不能为空';
                       this. beDisabled=true;
                   }else if(!reg2.test(inputContent)){
                           this.passwordErrorShow = true;
                           this.passwordError = '密码格式错误';
                           this. beDisabled=true;
                   }else{
                        this.passwordErrorShow = false;
                        this.beDisabled = false;    
                   }
                }else{
                    this.beDisabled = true;
                }
            },
            loginSubmit:function(){
                if (!!this.testInfo(this.loginInData)) {
                    // console.log('可以登录');
                    //把注册的用户名存在cookie中
                    for(var i in this.cookieData){
                        cookieUtil.set(this.cookieData[i],this.loginInData[this.cookieData[i]]);
                    }
                    this.$http({
                        url:"http://localhost:8080/login",
                        emulateJSON: true,
                        method:"post",
                        data:this.loginInData,
                        // emulateJSON:true,
                    }).then(function(res){
                        if(res.data == 'no'){
                            this.usernameErrorShow= true;
                            this.usernameError= '用户名不存在';
                            this. beDisabled=true;
                        }else if(res.data == 'pswErr'){
                            this.passwordErrorShow = true;
                            this.passwordError = '密码错误';
                            this. beDisabled=true;
                            this.userInfo.password='';
                        }else{
                            this.$store.state.isShow=false;
                            console.log(res.data);
                            cookieUtil.set('userInfo.name',res.data.userInfo.name);
                            window.location.replace("myindex.html");	
                            // this.$store.commit('open','您还没有注册！');
                        }
                    },function(){})
                }




                
            },
            // login组件点击按钮跳转到注册页面
            toSignUp:function(){
                window.location.replace('../client/components/signUp/signUp.html');
            },
            testInfo:function(data){
                //验证是否为空，为空则出现验证错误信息
                //信息验证失败返回false，不可登录
                for(var p in data){
                    if (!data[p]) {
                        // alert(this.testError[p].msg)
                        return no;
                    }
                }
                //通过验证可以注册返回true
                return ok;
            }
    }
});
Vue.component('login',login);
