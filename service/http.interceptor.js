// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token
// 同时，我们也可以在此使用getApp().globalData，如果你把token放在getApp().globalData的话，也是可以使用的
import {
	baseURL
} from './env'

const statusObj = {
	200: () => {
		// return res.data;
	}
}
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: baseURL,
		// 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
		// 设置为true后，就需要在this.$u.http.interceptor.response进行多一次的判断，请打印查看具体值
		// originalData: true, 
		// 设置自定义头部content-type
		dataType: 'json',
		loadingTime: 12000, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: false, // 是否在拦截器中返回服务端的原始数据
		// header: {
		// 	'content-type': 'xxx'
		// }
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		config.header.Token = 'xxxxxx';

		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式，见：https://uviewui.com/components/globalVariable.html
		// config.header.token = vm.token;

		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;

		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;

		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的，所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		// const token = uni.getStorageSync('token');
		// config.header.token = token;

		return config;
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		// statusObj[res.code]
		// if (res.code == 0) {
			console.log(res)
			return res.data;
		// } else {
		// 	return false;
		// }
	}
}



export default {
	install
}
