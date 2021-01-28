import Vue from 'vue'
import App from './App'
import "./lib/UI"
import { to } from './lib/navigate'
import { toast, toastSucc, copy } from './lib/common'

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


const app = new Vue({
    ...App
})
app.$mount()
