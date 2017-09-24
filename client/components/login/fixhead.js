var fixhead=Vue.extend({
    template:'#fixhead',
    components:{popwindow:popwindow,login:login},
    data:{
                attitudeMsg:{
                        isFlag:{msg:'欢迎，'},//登录状态下
                        noFlag:{msg:'登录'},//未登录状态下
                    },//登录状态显示信息
                attitudeFlag:false, // 记录登录状态
                loginInfo:{flag:false},
            },
            watch:{
                attitudeFlag:function(){
                    this.$emit('login-change',this.attitudeFlag);
                },
            },
            created:function(){
                //加载之前 获取cookie并存起来
                for(var p in this.cookieData){
                    this.cookieData[p]=cookieUtil.get(p);
                }
                //验证用户名
                this.userTest();
                //发送给父组件当前登录状态,因为在页面上退出登录会刷新页面，但是不会触发watch，所以在加载的时候也发送一次
                this.$emit('login-change',this.attitudeFlag);
            },
            methods:{
                Show:function(){
                     this.$store.state.isShow=true;
                },
                // app组件按钮点击跳转页面
                toSignUp:function(){
                    window.location.replace('../client/components/signUp/signUp.html');
                },
                getLoginFlag:function(flag){
                    this.loginInfo.flag=flag;
                },
                //验证用户
                userTest:function(){
                    //此处要发送ajax请求，获取testItem，来验证用户名
                    this.$http({
                        url:this.url,
                        method:"post",
                        data:this.cookieData,
                        emulateJSON:true,
                    }).then(function(res){
                        if (res.data.flag=='1') {//返回1 验证成功
                            if(!!res.data.name){
                                this.attitudeMsg.isFlag.msg+=res.data.name;
                                cookieUtil.set('name',res.data.name);
                            }else{
                                this.attitudeMsg.isFlag.msg+=this.cookieData.username;
                            }
                            this.attitudeFlag=true;
                        }else if(res.data.flag=='0'){ //返回0 验证失败
                            this.attitudeFlag=false;
                            return;
                        }
                    },function(){});
                },
                //退出登录清空cookie
                loginOut:function(){
                    cookieUtil.del('username');
                    cookieUtil.del('password');
                },
                
            }
   
});
Vue.component('fixhead',fixhead);
