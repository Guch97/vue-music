import { playMode } from 'common/js/config'
import { shuffle } from '../../common/js/utils'


const play = {
    state: {
        playing: false,
        fullScreen: false,
        //当前播放的歌曲列表  随机播放的是放在 playList 里
        playlist: [],
        //顺序播放的歌曲列表
        sequenceList: [],
        mode: playMode.sequence,
        //播放索引
        currentIndex: -1,


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
            commit('SET_PLAY_MODE', playMode.random)
            commit('SET_SEQUENCE_LIST', list)
            let randomList = shuffle(list)
            commit('SET_PLAYLIST', randomList)
            commit('SET_CURRENT_INDEX', 0)
            commit('SET_FULL_SCREEN', true)
            commit('SET_PLAYING_STATE', true)
        },
        insertSong({ commit, state }, song) {
            let playlist = state.playlist.slice()
            let sequenceList = state.sequenceList
            let currentIndex = state.currentIndex
                //记录当前歌曲
            let currentSong = playlist[currentIndex]
                //查找当前列表中是否有要带插入的歌曲 并返回其索引
            let fdIndex = findIndex(playlist, song)
                //插入当前索引下一个
            currentIndex++
            playlist.splice(currentIndex, 0, song)
                //如果已经包含这首歌
            if (fdIndex > -1) {
                //如果当前插入序号＞之前序号
                if (currentIndex > fdIndex) {
                    playlist.splice(fdIndex, 1)
                    currentIndex--
                } else {
                    playlist.splice(fdIndex + 1, 1)
                }
            }
            //获得插入位置
            let currentSIndex = findIndex(sequenceList, currentSong) + 1
            let fsIndex = findIndex(sequenceList, song)
            sequenceList.splice(currentSIndex, 0, song)
            if (fsIndex > -1) {
                if (currentSIndex > fsIndex) {
                    sequenceList.splice(fsIndex, 1)
                    currentIndex--
                } else {
                    sequenceList.splice(fsIndex + 1, 1)
                }
            }
            commit('SET_PLAYLIST', playlist)
            commit('SET_SEQUENCE_LIST', sequenceList)
            commit('SET_CURRENT_INDEX', currentIndex)
            commit('SET_PLAYING_STATE', true)
            commit('SET_FULL_SCREEN', true)
        },
        //favroite删除歌曲
        deleteSong({ commit, state }, song) {
            let playlist = state.playlist.slice()
            let sequenceList = state.sequenceList
            let currentIndex = state.currentIndex
            let Pindex = findIndex(playlist, song)

            playlist.splice(Pindex, 1)
            let sIndex = findIndex(sequenceList, song)

            sequenceList.splice(sIndex, 1)
            if (currentIndex > Pindex || currentIndex === playlist.length) {
                currentIndex--
            }
            commit('SET_PLAYLIST', playlist)
            commit('SET_SEQUENCE_LIST', sequenceList)
            commit('SET_CURRENT_INDEX', currentIndex)
            commit('SET_PLAYING_STATE', true)
            const playingState = playlist.length > 0

            commit('SET_PLAYING_STATE', playingState)

        },
        //删除所有
        deleteSongAll({ commit }) {
            commit('SET_PLAYLIST', [])
            commit('SET_SEQUENCE_LIST', [])
            commit('SET_CURRENT_INDEX', -1)
            commit('SET_PLAYING_STATE', false)

        }


    }
}

export default play


function findIndex(list, song) {

    return list.findIndex((item) => {
        return item.id === song.id
    })
}