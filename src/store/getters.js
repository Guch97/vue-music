const getters = {
    singer: state => state.singer.singer,

    playing: state => state.play.playing,
    fullScreen: state => state.play.fullScreen,
    playlist: state => state.play.playlist,
    sequenceList: state => state.play.sequenceList,
    mode: state => state.play.mode,
    currentIndex: state => state.play.currentIndex,
    currentSong: state => state.play.playlist[state.play.currentIndex] || {}
}


export default getters