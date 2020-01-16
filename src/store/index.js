import Vue from 'vue'
import Vuex from 'vuex'
import singer from  'store/modules/singer.js'
import getters from 'store/getters'
import createLogger from 'vuex/dist/logger'


Vue.use(Vuex)
const debug=process.env.NODE_ENV!=='production'
const store=new Vuex.Store({
    getters,
    modules: {
      singer,
      strict:debug,
      plugins:debug?[createLogger()]:[]
    }
})
export default store