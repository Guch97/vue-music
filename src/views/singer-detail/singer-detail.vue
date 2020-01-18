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
import {createSong} from 'common/js/song'
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
      console.log(this.singer.name)
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
    _getDetail(){
      console.log(this.singer)
        getSingerDetail(this.singer.id).then(res=>{
            if(res.code === ERR_OK) {
              this.songs = this._normalizeSongs(res.singerSongList.data.songList);
              console.log(this.songs)
          }
      })
    },
    _normalizeSongs(list){
      return list.map((item,index)=>{
         if(item.songInfo.id&&item.songInfo.mid){
            return createSong(item.songInfo)
          }
            return{}
      })
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
