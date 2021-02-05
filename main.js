import Vue from 'vue'
import App from './App'
import "./lib/UI"
import { to } from './lib/navigate'
import { toast, toastSucc, copy, random } from './lib/common'
// crypto-js
import { md5Encrypt } from './lib/crypto'
// api
import * as API from './service/api'

Vue.config.productionTip = false


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
Vue.prototype.$to = to;
Vue.prototype.$toast = toast;
Vue.prototype.$copy = copy;
Vue.prototype.$toastSucc = toastSucc;


Vue.prototype.$onInput = function (e, key) {
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
app.$mount()
