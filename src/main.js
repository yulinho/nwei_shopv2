import Vue from 'vue'
import App from './App'
// import 'mpvue-weui/src/style/weui.css';
// import 'mpvue-zanui/src/assets/style/zanui.css';
// require("babel-polyfill");
// import 'mpvue-zanui/src/assets/style/zanui.wxss';
import 'mpvue-weui/src/style/weui.css';

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
