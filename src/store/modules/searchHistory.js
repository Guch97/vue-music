import { saveSearch, loadSearch, deleteSearch, clearSearch } from 'common/js/catch.js'


const History = {
    state: {
        searchHistory: loadSearch(),

    },
    mutations: {
        SET_SEARCH_HISTOYR(state, history) {
            state.searchHistory = history
            console.log(state.searchHistory)
        },

    },
    actions: {
        saveSearchHistory({ commit }, query) {
            commit('SET_SEARCH_HISTOYR', saveSearch(query))
        },
        deleteSearchHistory({ commit }, query) {
            commit('SET_SEARCH_HISTOYR', deleteSearch(query))
        },
        clearSearchHistory({ commit }) {
            commit('SET_SEARCH_HISTOYR', clearSearch())
        }
    }
}


export default History