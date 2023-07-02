import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control

import axios from 'axios'

import * as filters from './filters' // 全局 filters
import * as utils from './utils' // 全局 method

import waves from '@/directive/waves' //  按钮水波纹
import permission from '@/directive/permission' //  按钮权限
import defaultSettings from '@/settings'

// if (process.env.NODE_ENV === 'production') {
// const { mockXHR } = require('../mock')
// mockXHR()
// }
Vue.use(Element, {
  size: defaultSettings.themeSize // set element-ui default size
})
// 设置全局指令和组件
Vue.use(waves)
Vue.use(permission)

// 设置全局方法
Object.keys(utils).forEach(key => {
  Vue.prototype[key] = utils[key]
})

// 设置全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
