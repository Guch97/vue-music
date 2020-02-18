import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from 'views/recommend/recommend.vue';
import Singer from 'views/singer/singer.vue';
import Rank from 'views/rank/rank.vue';
import Search from 'views/search/search.vue';
import SingerDetail from 'views/singer-detail/singer-detail.vue'
import Disc from 'views/recommend-disc/disc.vue'
import rankTopList from 'views/rank-top-list/rank-top-list.vue'




Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/recommend',
}, {
    path: '/recommend',
    component: Recommend,
    children: [{
        path: '/recommend/:id',
        component: Disc
    }]
}, {
    path: '/singer',
    component: Singer,
    children: [{
        path: ':id',
        component: SingerDetail
    }]
}, {
    path: '/rank',
    component: Rank,
    children: [{
        path: ':id',
        component: rankTopList
    }]
}, {
    path: '/search',
    component: Search,
    children: [{
        path: ':id',
        component: SingerDetail
    }]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router