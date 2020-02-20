<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props:{
    probeType:{
      type:Number,
      default:1
    },
    click:{
      type:Boolean,
      default:true
    },
    data:{
      type:Array,
      default:null
    },
    listenScroll:{
      type:Boolean,
      default:false
    },
    //是否开启下拉刷新
    pullup:{
      type:Boolean,
      default:false
    },
    //滚动开始
    beforeScroll:{
      type:Boolean,
      default:false
    }

  },
  mounted(){
    setTimeout(()=>{
      this._initScroll()
    },20)
  },
  methods:{
    _initScroll(){
      if(!this.$refs.wrapper){
          return
      }
      this.scroll=new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        click:this.click
      })
      if(this.listenScroll){
        let me=this
        this.scroll.on('scroll',(pos)=>{
          me.$emit('scroll',pos)
        })
      }
      if(this.pullup){
        //滚动停止scrollEnd
        this.scroll.on('scrollEnd',()=>{
          if(this.scroll.y<=(this.scroll.maxScrollY+50)){
        //滚动到底部 scrollToEnd
            this.$emit('scrollToEnd')
          }
        })
      }
      if(this.beforeScroll){
        this.scroll.on('beforeScrollStart',()=>{
          this.$emit('beforeScroll')
        })
      }
    },
    enable(){
      this.scroll&&this.scroll.enable()
    },
    disable(){
      this.scroll&&this.scroll.disable()
    },
    //刷新scroll 重新计算高度
    refresh(){
      this.scroll&&this.scroll.refresh()
    },
    scrollTo(){
      this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments)
    },
    //滚动效果
    scrollToElement(){
       this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments)
    }
  },
  watch:{
    data(){
      setTimeout(()=>{
      this.refresh()
    },20)
    }
  }
}
</script>

<style>

</style>