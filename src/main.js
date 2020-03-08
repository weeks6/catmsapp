import Vue from 'vue'
import App from './App.vue'
import {MdButton, MdIcon, MdApp, MdToolbar, MdMenu, MdContent, MdCard, MdRipple, MdDialog, MdProgress, MdRadio, MdField, MdList} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import router from './router'
import store from './store'

Vue.use(MdApp)
Vue.use(MdToolbar)
Vue.use(MdIcon)
Vue.use(MdButton)
Vue.use(MdMenu)
Vue.use(MdContent)
Vue.use(MdCard)
Vue.use(MdRipple)
Vue.use(MdDialog)
Vue.use(MdField)
Vue.use(MdRadio)
Vue.use(MdList)
Vue.use(MdProgress)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')