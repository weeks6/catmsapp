import Vue from 'vue'
import Vuex from 'vuex'

import Cats from './modules/cats'
import Dialogs from './modules/dialogs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    Cats,
    Dialogs
  }
})
