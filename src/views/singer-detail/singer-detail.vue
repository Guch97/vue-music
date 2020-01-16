<template>
  <transition name='slide'>
    <div class='singer-detail'>
    22222222
    </div>
  </transition>  
</template>

<script>
import {mapGetters} from 'vuex'
import { getSingerDetail } from 'api/singer';
import {ERR_OK} from 'api/config'
export default {
  data() {
    return {
      songs: []
    };
  },
  created() {
    this._getDetail();
  },
  computed: {
    //映射 this.singer 为 store.getters.singer
    ...mapGetters([
      'singer'
    ])
  },
  methods: {
    _getDetail(){
        getSingerDetail(this.singer.id).then(res=>{
            if(res.code === ERR_OK) {
              console.log(res)
        
          }
      })
    }
  }
}
</script>

<style scoped type="text/stylus" lang="stylus" ref="stylesheet/stylus">
  @import '~common/stylus/variable.styl';

  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    bottom: 0
    left: 0
    right: 0
    background: $color-background
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
