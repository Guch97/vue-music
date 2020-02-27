<template>
<div class='search'>
  <div class='search-box-wrapper'>
    <search-box ref='searchBox' @query='onQueryChange'></search-box>
  </div>
  <div ref="shortcutWrapper" class="shortcut-wrapper" v-show='!query'>
    <scroll class='shortcut' ref='shortcut' :data='shortcut'>
      <div>
        <div class='hot-key'>
          <h1 class='title'>热门搜索</h1>
          <ul>
            <li @click='addQuery(item.k)' class="item"  v-for='item in Hotkey' :Key=item.id>
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
        <div class='search-history' v-show='searchHistory.length'>
          <h1 class='title'>
            <span class='text'>搜索历史</span>
            <span class='clear' @click='showConfirm'>
              <i class='icon-clear'></i>
            </span>
          </h1>
          <search-history :searches='searchHistory' @delete='deleteIcon'  @select='addQuery'></search-history>
        </div>
      </div>  
    </scroll>
  </div>
  <div ref="searchResult"  class='search-result'  v-show="query">
    <suggest ref='suggest' @select='saveSearch' @listScrollKeyUP='blurInput' :query='query'></suggest>
  </div>
    <confirm ref='confirm' @confirm='deleteAll' text='是否清空所有搜索历史' confirmBtnText='清空'></confirm>
  <router-view></router-view>
</div>
</template>

<script type="text/ecmascript-6">
import SearchBox from 'base/search-box/search-box.vue'
import SearchHistory from 'base/search-history/search-history'
import Confirm from 'base/confirm/confirm'
import {getHotKey} from 'api/search'
import {ERR_OK} from 'api/config'
import Suggest from 'components/suggest/suggest'
import {mapActions, mapGetters} from 'vuex'
import Scroll from 'base/scroll/scroll'
import {playlistMixin,searchMixin} from 'common/js/mixin'
export default{
  //定义一部分公共的方法或者计算属性,然后混入到各个组件中使用,方便管理与统一修改
  mixins:[playlistMixin,searchMixin],  
  components:{
    SearchBox,
    Suggest,
    SearchHistory,
    Confirm,
    Scroll
  },
  data(){
    return{
        Hotkey:[],
        query:'',
    }
  },
  watch:{
    query(newQuery){
      if(!newQuery){
        setTimeout(()=>{
            this.$refs.shortcut.refresh()
        },20)
      }
    }
  },
  computed:{
      ...mapGetters([
          'searchHistory',
      ]),
      shortcut(){
        return this.Hotkey.concat(this.searchHistory)
      }
  },
  created(){
    this._getHotKey()
  },
  methods:{
    ...mapActions([
      // 'saveSearchHistory',
      // 'deleteSearchHistory',
      'clearSearchHistory'
    ]),
    _getHotKey(){
      getHotKey().then((res)=>{
        if(res.code===ERR_OK){
          this.Hotkey=res.data.hotkey.slice(0,10)
        }
      })
    },
    deleteIcon(item){
      this.deleteSearchHistory(item)
    },
    // blurInput(){
    //     this.$refs.searchBox.blur()  
    // },
    // addQuery(Query){
    //     this.$refs.searchBox.setQuery(Query)
    // },
    onQueryChange(query){
      this.query=query
    },
    // saveSearch(){
    //   this.saveSearchHistory(this.query)
    // },
    deleteAll(){
      this.clearSearchHistory()
    },
    showConfirm(){
      this.$refs.confirm.show()
    },
    handlePlaylist(playlist){
      const bottom=playlist.length>0?'60px':''
      this.$refs.shortcutWrapper.style.bottom=bottom
      this.$refs.shortcut.refresh()
      this.$refs.searchResult.style.bottom=bottom
      this.$refs.suggest.refresh()
    }
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin:5px 0 20px 0
            font-size: $font-size-medium
            color: $color-text-l
            
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>