<template>
  <div class="singer">
  
  </div>
</template>

<script>
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
export default {
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
          if(res.code===ERR_OK){
            this.singers=res.singerlist.data.singerlist
            console.log(this.singers)
         }
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
