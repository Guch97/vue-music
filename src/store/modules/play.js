import { playMode } from 'common/js/config'

const play = {
    state: {
        playing: false,
        fullScreen: false,
        //播放列表
        playlist: [],
        //顺序列表
        sequenceList: [],
        mode: playMode.sequence,
        //播放索引
        currentIndex: -1

    },
    mutations: {
        SET_PLAYING_STATE(state, flag) {
            state.playing = flag

        },
        SET_FULL_SCREEN(state, flag) {
            state.fullScreen = flag

        },
        SET_PLAYLIST(state, list) {
            state.playlist = list


        },
        SET_SEQUENCE_LIST(state, list) {
            state.sequenceList = list

        },
        SET_PLAY_MODE(state, mode) {
            state.mode = mode

        },
        SET_CURRENT_INDEX(state, index) {
            state.currentIndex = index
        },
        //获取播放url Vkey

    },
    actions: {
        selectPlay({ commit, state }, { list, index }) {
            commit('SET_SEQUENCE_LIST', list)
            commit('SET_PLAYLIST', list)
            commit('SET_CURRENT_INDEX', index)
            commit('SET_FULL_SCREEN', true)
            commit('SET_PLAYING_STATE', true)
        }
    }
}

export default play