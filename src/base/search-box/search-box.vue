<template>
  <div class='search-box'>
    <i class='icon-search'></i>
      <input class='box' :placeholder='placeholder' v-model='query' ref='query'>
    <i v-show='query'  @click='clear' class='icon-dismiss'></i>
  </div>
</template>

<script type="text/ecmascript-6">
import {debounce} from 'common/js/utils.js'
export default{
  props:{
    placeholder:{
      type:String,
      default:'搜索歌曲、歌手'
    }
  },
  data(){
    return{
        query:''
    }
  },
  methods:{
    clear(){
      this.query=''
    },
    setQuery(Query){
      this.query=Query
    },
    blur(){
      this.$refs.query.blur()
    }
  },
  //使用created 派发而不是watch监听派发
  //节流函数
  created() {
    this.$watch('query',debounce((newQuery)=>{
        this.$emit('query',newQuery)
    },200))
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding:  15px
    height: 40px
    background: $color-highlight-background
    border-radius: 6px
    .icon-search
      font-size: 16px
      color: $color-background
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      background: $color-highlight-background
      color: $color-text
      font-size: $font-size-medium
      &::placeholder
        color: $color-text-d
    .icon-dismiss
      text-align:center
      font-size: 15px
      color: $color-background
</style>