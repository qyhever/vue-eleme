// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
Vue.config.productionTip = false;


// 导入重置样式
import '../static/css/reset.css';
import 'common/stylus/index.styl';
// 导入axios请求库
import axios from 'axios';
Vue.prototype.$axios = axios;

// 导入axios的post请求参数序列化
import qs from 'qs';
Vue.prototype.$qs = qs;




/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
