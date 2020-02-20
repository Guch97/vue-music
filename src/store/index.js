import Vue from 'vue'
import Vuex from 'vuex'
import singer from 'store/modules/singer.js'
import play from 'store/modules/play.js'
import disc from 'store/modules/disc.js'
import TopList from 'store/modules/rank-top-list'
import getters from 'store/getters'
import searchHistory from 'store/modules/searchHistory'
import createLogger from 'vuex/dist/logger'


Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
    getters,
    modules: {
        searchHistory,
        TopList,
        disc,
        singer,
        play,
        strict: debug,
        //开启明细数据变化
        plugins: debug ? [createLogger()] : []
    }
})
export default store