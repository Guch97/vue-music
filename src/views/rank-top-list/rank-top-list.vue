<template>
<transition name='slide'>
   <music-list :title='title'  :bgImage='bgImage'></music-list>
</transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
export default {
data(){
     return{
     }
  },
computed:{
   ...mapGetters([
      'topList'
   ]),
   title(){
      return this.topList.topTitle
   } ,
   bgImage() {
        return this.topList.picUrl
      },
},
components:{
   MusicList
},
methods:{

   }  
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
