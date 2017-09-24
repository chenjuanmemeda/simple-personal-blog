
import Vue from 'vue'
import app from './components/index.vue'
import app2 from './components/index2.vue'
//创建设一个vue实例,挂载在body上面
new Vue({
	el:'#app',
	components:{app,app2}
});