<template>
  <div class="rank" ref="rank">
    <scroll :data='topList' class="toplist" ref="toplist">
      <ul>
        <li @click="selectItem(item)" class="item" v-for='item in topList' :key='item.id'>
          <div class="icon">
            <img width="100" height="100" v-lazy='item.picUrl'/>
          </div>
          <ul class="songlist">
            <li class="song"  v-for='(song,index) in item.songList' :key='song.id'>
              <span>{{index+1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class='loading-containner'>
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import {getTopList} from 'api/rank'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {mapMutations} from 'vuex'
import {playlistMixin} from 'common/js/mixin.js'

export default{
   //定义一部分公共的方法或者计算属性,然后混入到各个组件中使用,方便管理与统一修改
  mixins:[playlistMixin],
  components:{
    Scroll,
    Loading
  },
  created() {
    setTimeout(()=>{
       this._getTopList()
    },1000)
    },
    data() {
      return {
        topList: []
      }
    },
  methods:{
    selectItem(item){
      this.$router.push({
        path:`/rank/${item.id}`
      })
      this.setTopList(item)

    },
    handlePlaylist(playlist){
       const bottom=playlist.length>0?'60px':''
        this.$refs.rank.style.bottom=bottom
        this.$refs.toplist.refresh()
    },
    _getTopList(){
      getTopList().then((res)=>{
        console.log(res)
            console.log(this.topList)
            this.topList=res.data.topList
              console.log(res.data)
        
      })
    },
     ...mapMutations({
      setTopList:'SET_TOP_List'
   })
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
