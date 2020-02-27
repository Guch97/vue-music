import { saveSearch, loadSearch, deleteSearch, clearSearch, savePlay, loadPlay } from 'common/js/catch.js'


const History = {
    state: {
        searchHistory: loadSearch(),
        playHistory: loadPlay()
    },
    mutations: {
        SET_SEARCH_HISTOYR(state, history) {
            state.searchHistory = history
            console.log(state.searchHistory)
        },
        SET_PLAY_HISTORY(state, history) {
            state.playHistory = history
        }

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
        },
        savePlay({ commit }, song) {
            commit('SET_PLAY_HISTORY', savePlay(song))
        }
    }
}


export default History