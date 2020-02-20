<template>
<scroll class='suggest'
    :data='result' 
    :pullup='pullup'
    @scrollToEnd='searchMore'
    :befoeScroll='befoeScroll'
    @befoeScroll='listScrollKeyUP'
    ref='suggest'
    >
   <ul class='suggest-list'>
      <li class='suggest-item' @click='selectItem(item)' v-for='item in result' :key='item.id'>
         <div class='icon'>
            <i :class='getIconClass(item)'></i>
         </div>
         <div class='name'>
            <p class='text' v-html='getDisPlayName(item)'></p>
         </div>
      </li>
      <loading v-show='hasMore' titile=''></loading>
   </ul>
   <div class='no-result-wrapper' v-show='!hasMore&&!result.length'>
      <no-result title="抱歉,暂无搜索结果"></no-result>
   </div>
</scroll>
</template>

<script>
import { ERR_OK } from 'api/config'
import{search} from 'api/search'
import { creatRecommendeSong, isValidMusic, processSongsUrl } from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import {mapMutations} from 'vuex'
import {mapActions} from 'vuex'
import NoResult from 'base/no-result/no-result'


const TYPE_SINGER = 'singer'
const perpage = 20

export default {
   data(){
      return{
            page:1 ,
            result:[],
            pullup:true,
            hasMore:true, //是否加载完毕
            befoeScroll:true
      }
   },
   components:{
      Scroll,
      Loading,
      NoResult
   },
   props:{
         query:{
            type:String,
            default:''
         },
         showSinger:{
            type:Boolean,
            default:true
         }
      },
      watch:{
         query(){
            this.search()
         }
      },
      methods: {
         ...mapMutations({
            setSinger:'SET_SINGER'
         }),
         ...mapActions([
            'insertSong'
         ]),
         selectItem(item){
            if(item.type===TYPE_SINGER){
                  const singer=new Singer({
                     id:item.singermid,
                     name:item.singername
                  })
                this.$router.push({
                   path:`/search/${singer.id}`
                })  
              this.setSinger(singer)  
            }else{
               this.insertSong(item)
            }
            this.$emit('select')
         },
         getIconClass(item){
            if (item.type === TYPE_SINGER) {
            return 'icon-mine'
            } else {
            return 'icon-music'
            }
         },
         searchMore(){
            if(!this.hasMore){
               return
            }
            this.page++
            search(this.query,this.page,this.showSinger,perpage).then((res)=>{
               if(res.code===ERR_OK){
               this._genResult(res.data).then((result) => {
                  this.result = this.result.concat(result)
                  })
               }
            })
         },
         getDisPlayName(item){
            if (item.type === TYPE_SINGER) {
               return item.singername
            } else {
               return `${item.name}-${item.singer}`
            }
         },
         search(){
            this.hasMore=true
            this.page=1
            //跳回页面顶部
            this.$refs.suggest.scrollTo(0,0)
            search(this.query,this.page,this.showSinger, perpage).then((res)=>{
                  if(res.code===ERR_OK){
                    this._genResult(res.data).then((result) => {
                    this.result = result
                   })
                  this._checkMore(res.data)
               }
            })
         },
         //是否加载完毕
         _checkMore(data){
         const song=data.song
            //当前值+现搜索的总数>=总数
            // if (!song.list.length || (song.curnum + song.curpage * perpage) >= song.totalnum) {
            // this.hasMore = false
            // }
         if (!song.list.length || (song.curnum + (song.curpage - 1) * perpage) >= song.totalnum) {
               this.hasMore = false
            }  
         },
         _genResult(data){
            let ret=[]
            if (data.zhida && data.zhida.singerid) {
               ret.push({...data.zhida, ...{type: TYPE_SINGER}})
            }
            // if (data.song) {
            //    ret = ret.concat(this._noramlizeSongs(data.song.list))
            // }
            return processSongsUrl(this._noramlizeSongs(data.song.list)).then((songs) => {
               ret = ret.concat(songs)
               return ret
             })
         },
         _noramlizeSongs(list){
         let ret = []
         list.forEach((musicData) => {
            if (isValidMusic(musicData)) {
               ret.push(creatRecommendeSong(musicData))
             }
          })
            return ret
         },
         listScrollKeyUP(){
            this.$emit('listScrollKeyUP')
         }
      },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>