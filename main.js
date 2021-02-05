import Vue from 'vue'
import App from './App'
import "./lib/UI"
import { to } from './lib/navigate'
import { toast, toastSucc, copy } from './lib/common'
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
Vue.prototype.toastSucc = toastSucc;


Vue.prototype.$onInput = function (e, key) {
  this[key] = e.detail.value
}

Vue.prototype.$API = API;


// crypto
Vue.prototype.$md5 = md5Encrypt;


const app = new Vue({
    ...App
})
app.$mount()
