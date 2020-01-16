<template>
 <div class="singer" ref="singer">
    <list-view :data='singers' @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import ListView from 'base/listview/listview'
import Singer from 'common/js/singer'
import { mapMutations } from 'vuex';

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'


// const indexMap = {
//   0: 'hot',
//   1: 'A',
//   2: 'B',
//   3: 'C',
//   4: 'D',
//   5: 'E',
//   6: 'F',
//   7: 'G',
//   8: 'H',
//   9: 'I',
//   10: 'J',
//   11: 'K',
//   12: 'L',
//   13: 'M',
//   14: 'N',
//   15: 'O',
//   16: 'P',
//   17: 'Q',
//   18: 'R',
//   19: 'S',
//   20: 'T',
//   21: 'U',
//   22: 'V',
//   23: 'W',
//   24: 'X',
//   25: 'Y',
//   26: 'Z',
//   27: '#'
// };

export default {
components: {
  ListView
    
  },
data(){
     return{
       singers:[]
     }
  },
created(){
       this._getSingerList()
  },
methods: {
    _getSingerList(){
      getSingerList().then((res)=>{
          console.log(res)
            if (res.code === ERR_OK) {
                 this.singers = this._normalizeSinger(res.data.list)
               console.log(this.singers)
          }
      })
    },
    selectSinger(singer){
      this.$router.push({
        path:`/singer/${singer.id}`
      })
      // this.$store.commit('SET_SINGER',singer)
      this.setSinger(singer)
    },
    _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
        // 为了得到有序列表，需要处理 map
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
    },
    //映射  this.$store.commit('SET_SINGER',singer)
    ...mapMutations({
      setSinger:'SET_SINGER'
    })
  }  
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
