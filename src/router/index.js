import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from 'views/recommend/recommend.vue';
import Singer from 'views/singer/singer.vue';
import Rank from 'views/rank/rank.vue';
import Search from 'views/search/search.vue';
import SingerDetail from 'views/singer-detail/singer-detail.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/recommend'
}, {
    path: '/recommend',
    component: Recommend
}, {
    path: '/singer',
    component: Singer,
    children:[
      {
        path:':id',
        component:SingerDetail
      }
    ]
}, {
    path: '/rank',
    component: Rank
}, {
    path: '/search',
    component: Search,
   
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router