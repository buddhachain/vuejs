import Vue from 'vue'
import App from './App'
import "./lib/UI"
import { to } from './lib/navigate'

Vue.config.productionTip = false


// global methods
Vue.prototype.$to = to;
App.mpType = 'app'


const app = new Vue({
    ...App
})
app.$mount()
