import Vue from 'vue'
import App from './App.vue'
import router from './router'
import squareData from './squareData.js'

let data = {
  squares: squareData,
  sizeX: 6,
  sizeY: 6,
}

Vue.config.productionTip = false

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
