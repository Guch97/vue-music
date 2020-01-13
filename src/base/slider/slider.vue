<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class='dots'>
      <span class='dot' v-for='(item,index) in dots' :key='index' 
      :class='{active:currentPageIndex===index}'></span>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default {
   props:{
      loop:{
         type:Boolean,
         default:true,
      },
      autoPlay:{
         type:Boolean,
         default:true,
      },
      interval:{
         type:Number,
         default:4000
      }
   },
   data(){
     return{
       dots:[],
       currentPageIndex:0,
     }
  },
  methods:{
    _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth      //容器的总宽度
        }
        if (this.loop&&!isResize) {
          width += 2 * sliderWidth  //如果轮播，左右会各增加一个，所以要加上两张图片的宽度  
        }
        this.$refs.sliderGroup.style.width = width + 'px'   //为元素设置容器的总宽度
      },
    _initDos(){
        this.dots=new Array(this.children.length)
      },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          // if (this.loop) {            //旧版本设置方式，新版本不需要
          //   pageIndex -= 1
          // }
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
        
        this.slider.on('tocuhEnd', () => {
          if (this.autoPlay) {
            this._play()
          }
        }),
         // 是否派发列表滚动开始的事件
        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer)
          }
        })
     },
     _play() {
        // let pageIndex = this.currentPageIndex + 1   //旧版本需要计算增加的两张图片带来的影响
        // if (this.loop) {
        //   pageIndex += 1
        // }
        this.timer = setTimeout(() => {
           this.slider.next()
        }, this.interval)
      }
      },
    mounted(){
    setTimeout(()=>{
    this._setSliderWidth(),
    this._initDos(),
    this._initSlider()
    if(this.autoPlay){
        this._play()
      }
    },20),

      window.addEventListener('resize', () => {
        if (!this.slider ) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
        // clearTimeout(this.resizeTimer)
        // this.resizeTimer = setTimeout(() => {
        //   if (this.slider.isInTransition) {
        //     this._onScrollEnd()
        //   } else {
        //     if (this.autoPlay) {
        //       this._play()
        //     }
        //   }
        //   this.refresh()
        // }, 60)
      })
  },
   destroyed() {
      clearTimeout(this.timer)
    },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>

