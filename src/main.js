// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
// import App from './App'
import routes from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import store from './store/index.js'

Vue.config.productionTip = false

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
const router = new VueRouter({
  routes       	 // （缩写）相当于 routes: routes
})
const app = new Vue({store, router})
app.$mount('#app')
