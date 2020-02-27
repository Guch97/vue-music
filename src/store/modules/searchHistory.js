import {
    saveSearch,
    loadSearch,
    deleteSearch,
    clearSearch,
    savePlay,
    loadPlay,
    loadFavorite,
    deleteFavorite,
    saveFavorite
} from 'common/js/catch.js'


const History = {
    state: {
        searchHistory: loadSearch(),
        playHistory: loadPlay(),
        favoriteList: loadFavorite()
    },
    mutations: {
        SET_SEARCH_HISTOYR(state, history) {
            state.searchHistory = history

        },
        SET_PLAY_HISTORY(state, history) {
            state.playHistory = history
        },
        SET_FAVORITE_LIST(state, favorite) {
            state.favoriteList = favorite
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
        },
        saveFavoriteList({ commit }, song) {
            commit('SET_FAVORITE_LIST', saveFavorite(song))
        },
        deleteFavoriteList({ commit }, song) {
            commit('SET_FAVORITE_LIST', deleteFavorite(song))
        }
    }
}


export default History