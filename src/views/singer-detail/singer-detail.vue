<template>
  <transition name='slide'>
    <music-list :songs='songs' :title='title' :bg-image='bgImage'></music-list>
    <!-- <div class='singer-detail'>
    </div> -->
  </transition>  
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'
import { getSingerDetail } from 'api/singer';
import {ERR_OK} from 'api/config'
export default {
  data() {
    return {
      songs: []
    };
  },
  components: {
    MusicList
  },
  created() {
    this._getDetail();
  },

  computed: {
    title(){
    
      return  this.singer.name
    },
    bgImage(){
      return this.singer.avatar
    },
    //映射 this.singer 为 store.getters.singer
    ...mapGetters([
      'singer'
    
    ])
  },
  methods: {
  _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            // this.songs = this._normalizeSongs(res.data.list)
            console.log(res)
            processSongsUrl(this._normalizeSongs(res.singerSongList.data.songList)).then((songs) => {
              this.songs = songs
            })
          }
        })
      },
      _normalizeSongs(list) {
          debugger
          let ret = []
          console.log(list)
          list.forEach((item) => {
            let {musicData} = item
            if (isValidMusic(musicData)) {
              ret.push(createSong(musicData))
            }
          })
          return ret
      }
  }
}
</script>

<style scoped type="text/stylus" lang="stylus" ref="stylesheet/stylus">
  @import '~common/stylus/variable.styl';


  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
