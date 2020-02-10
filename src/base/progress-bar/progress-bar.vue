<template>
<!--进度条总长度-->
<div class='progress-bar' ref='progressBar' @click='progressClick'>
   <div class='bar-inner'>
     <!--黄色进度条-->
      <div class='progress' ref='progress'></div>
      <!--按钮当前位置-->
      <div class="progress-btn-wrapper" ref="progressBtn"
      @touchstart.prevent='progressTouchStart'
      @touchmove.prevent='progresssTouchMove'
      @touchend.prevent='progressTouchEnd'
      >
         <div class='progress-btn'></div>
      </div>
   </div>
</div>
</template>

<script>
import {prefixStyle} from 'common/js/dom'
const progressBtnWidth=16
const transform = prefixStyle('transform')
export default {
  props:{
    percent:{
      type:Number,
      default:0
    }
  },
  watch: {
    percent(newVal){
      //防止与拖动冲突 
      if(newVal>=0&&!this.touch.initiated){
        //非拖动时进度条随歌曲播放而进行
         // 进度条总长度=黑色进度条长度 - 按钮宽度
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        //黄色进度条长度和按钮位置的偏移量相同  
          const offsetWidth=newVal*barWidth
          this._offset(offsetWidth)
      }
    }
  },
  data(){
      return{
      }
  },
  methods:{
    progressTouchStart(e){
        //标识变量，标识已经开始拖拽事件
        this.touch.initiated=true
        //触摸目标在页面中的x坐标。
        this.touch.startX=e.touches[0].pageX
        //存储当前黄色进度条宽度
        this.touch.left=this.$refs.progress.clientWidth
    },
    //纵向偏移量
    progresssTouchMove(e){
        if(!this.touch.initiated){
          return
        }
        const deltaX=e.touches[0].pageX-this.touch.startX
        //临界值：最大值是黄色进度条父元素宽度  this.$refs.progressBar.clientWidth
        const offsetWidth=Math.min(this.$refs.progressBar.clientWidth-progressBtnWidth,Math.max(0,this.touch.left+deltaX))
        this._offset(offsetWidth)
    },
    progressTouchEnd(){
        this.touch.initiated=false
        //保持 拖动与进度条一致  触发重新计算百分比事件
        this._triggerPercent()
    },
    progressClick(e){
      //鼠标相对于事件源元素（srcElement）的X,Y坐标  
      // this._offset(e.offsetX)   //当点击到按钮时e.offsetX错误
      const rect=this.$refs.progressBar.getBoundingClientRect() //获取元素相对于视窗的位置
      const offsetWidth=e.pageX - rect.left
      this._offset(offsetWidth)
      this._triggerPercent()
    },
    //设置按钮偏移量
    _offset(offsetWidth){
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform]=`translate3d(${offsetWidth}px,0,0)`
    },
     //触发重新计算百分比事件
    _triggerPercent(){
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        //当前位置/进度条总长度
        const percent=this.$refs.progress.clientWidth/barWidth
        console.log(percent)
        this.$emit('percentChange',percent)
    }
  },
  created(){
      this.touch={}
  }
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
