<template>
 <div class="singer" ref="singer">
    <list-view :data=singers></list-view>
  </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import ListView from 'base/listview/listview'

const indexMap = {
  0: 'hot',
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D',
  5: 'E',
  6: 'F',
  7: 'G',
  8: 'H',
  9: 'I',
  10: 'J',
  11: 'K',
  12: 'L',
  13: 'M',
  14: 'N',
  15: 'O',
  16: 'P',
  17: 'Q',
  18: 'R',
  19: 'S',
  20: 'T',
  21: 'U',
  22: 'V',
  23: 'W',
  24: 'X',
  25: 'Y',
  26: 'Z',
  27: '#'
};

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
               this.singers = this._normalizeSinger(res.singerList.data)
               console.log(this.singers)
          }
      })
    },
    
    _normalizeSinger(listArray){
      let map={
        hot:{
          title:'热门',
          items:[]
        }
      }
      let list=listArray.singerlist
      console.log(list)
      list.forEach((item,index)=>{
        if(index<10){
          map.hot.items.push({
            id:item.singer_id,
            name:item.singer_name,
            avatar:item.singer_pic
          })
        }
        const key=indexMap[index]
        if(!map[key]){
           map[key] = {
              title: key,
              items: []
            }
            map[key].items.push({
            id:item.singer_id,
            name:item.singer_name,
            avatar:item.singer_pic
          })
        }
          let ret = []
          let hot = []
          for (let key in map) {
          let val = map[key]
          console.log(val)
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === '热门') {
            hot.push(val)
          }
        }
          ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
       
      })
    }
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
