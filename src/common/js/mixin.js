import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/utils.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'


export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    mounted() {
        this.handlePlaylist(this.playlist)
    },
    activated() {
        this.handlePlaylist(this.playlist)
    },
    watch: {
        playlist(newVal) {
            this.handlePlaylist(newVal)
        }
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement handlePlaylist method')
        }
    },
}







export const favoritePlayerMixin = {
    computed: {
        //播放模式
        iconMode() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ?
                'icon-loop' : 'icon-random'
        },
        ...mapGetters([
            'currentSong',
            'playlist',
            'sequenceList',
            'mode'
        ]),
    },
    methods: {
        chooseMode() {
            const mode = (this.mode + 1) % 3
            this.setPlayMode(mode)
            let list = null
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList)
            } else {
                list = this.sequenceList
            }
            //currentSong  修改sequenceList=>playlist发生改变 阻止当前歌曲不改变
            this.resetCurrentIndex(list)
            this.setPlayList(list)
        },
        resetCurrentIndex(list) {
            let index = list.findIndex((item) => {
                return item.id === this.currentSong.id
            })
            this.setCurrentIndex(index)
        },
        ...mapMutations({
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_SEQUENCE_LIST'
        })
    }
}





export const searchMixin = {
    data() {
        return {
            query: '',
        }
    },
    computed: {
        ...mapGetters([
            'searchHistory',
        ]),
    },
    methods: {
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory',
        ]),
        blurInput() {
            this.$refs.searchBox.blur()
        },
        saveSearch() {
            this.saveSearchHistory(this.query)
        },
        onQueryChange(query) {
            this.query = query
        },
        addQuery(Query) {
            this.$refs.searchBox.setQuery(Query)
        },
    }
}