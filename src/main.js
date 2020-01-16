import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'babel-polyfill'
import store from './store/index'
import fastClick from 'fastclick';
import VueLazyload   from 'vue-lazyload'
import 'common/stylus/index.styl'

Vue.config.productionTip = false

Vue.use(VueLazyload,{
  loading:require('common/image/default.png')
})
fastClick.attach(document.body);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')