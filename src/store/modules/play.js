import { playMode } from 'common/js/config'
import { shuffle } from '../../common/js/utils'


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


    },
    actions: {
        //选择列表播放
        selectPlay({ commit, state }, { list, index }) {
            commit('SET_SEQUENCE_LIST', list)
            if (state.mode === playMode.random) {
                let randomList = shuffle(list)
                commit('SET_PLAYLIST', randomList)
                index = findIndex(randomList, list[index])
            } else {
                commit('SET_PLAYLIST', list)
            }
            commit('SET_CURRENT_INDEX', index)
            commit('SET_FULL_SCREEN', true)
            commit('SET_PLAYING_STATE', true)
        },
        //随机播放
        randomPlay({ commit }, { list }) {
            commit('SET_PLAY_MODE,', playMode.random)
            commit('SET_SEQUENCE_LIST', list)
            let randomList = shuffle(list)
            commit('SET_PLAYLIST', randomList)
            commit('SET_CURRENT_INDEX', 0)
            commit('SET_FULL_SCREEN', true)
            commit('SET_PLAYING_STATE', true)
        }
    }
}

export default play


function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}