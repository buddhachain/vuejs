import Vue from 'vue'
import App from './App'
import "./lib/UI"
import {
	to
} from './lib/navigate'
import {
	toast,
	toastSucc,
	copy,
	random
} from './lib/common'
// crypto-js
import {
	md5Encrypt
} from './lib/crypto'
// api
import * as API from './service/api'
Vue.config.productionTip = false
// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

App.mpType = 'app'

// global methods
// copy
Vue.prototype.$copy = (data) => {
	uniwx.setClipboardData({
		data, //需要设置的内容,
		success: res => {

		}
	});
}
// isLogin
Vue.prototype.$needLogin = (cb) => {
	if (1) {
		cb()
	} else {
		uni.showModal({
			title: '登录提示',
			content: '当前未登录，点击确定前往登录界面',
			success: function(res) {
				if (res.confirm) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	}
}
Vue.prototype.$to = to;
Vue.prototype.$toast = toast;
Vue.prototype.$copy = copy;
Vue.prototype.$toastSucc = toastSucc;


Vue.prototype.$onInput = function(e, key) {
	this[key] = e.detail.value
}

Vue.prototype.$API = API;


// crypto
Vue.prototype.$md5 = md5Encrypt;

// 获取指定位数的随机数
/**
 * 
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @param {*} len 随机数位数
 */
Vue.prototype.$getRandom = (min, max, len) => {
	let arr = []
	while (arr.length < len) {
		const num = random(min, max)
		if (arr.indexOf(num) === -1) {
			arr.push(num)
		}
	}
	return arr.sort((a, b) => a - b)
}


const app = new Vue({
	...App
})
// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/service/http.interceptor.js';
Vue.use(httpInterceptor, app);

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/service/http.api.js';
Vue.use(httpApi, app);
app.$mount()
