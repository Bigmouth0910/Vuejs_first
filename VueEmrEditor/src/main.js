import Vue from 'vue'
import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss'
import './styles/index.scss'
import App from './App.vue'
// import router from './router'


Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  // el: '#app',
  // router,
  render: h => h(App)
}).$mount('#app')
