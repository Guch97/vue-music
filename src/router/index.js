import Vue from 'vue'
import VueRouter from 'vue-router'
// import Recommend from 'views/recommend/recommend.vue';
// import Singer from 'views/singer/singer.vue';
// import Rank from 'views/rank/rank.vue';
// import Search from 'views/search/search.vue';
// import SingerDetail from 'views/singer-detail/singer-detail.vue'
// import Disc from 'views/recommend-disc/disc.vue'
// import rankTopList from 'views/rank-top-list/rank-top-list.vue'
// import UserCenter from 'views/user-center/user-center.vue'

Vue.use(VueRouter)

const Recommend = ((resolve) => {
    import ('views/recommend/recommend.vue').then((module) => {
        resolve(module)
    })
})
const Singer = ((resolve) => {
    import ('views/singer/singer.vue').then((module) => {
        resolve(module)
    })
})
const Rank = ((resolve) => {
    import ('views/rank/rank.vue').then((module) => {
        resolve(module)
    })
})
const Search = ((resolve) => {
    import ('views/search/search.vue').then((module) => {
        resolve(module)
    })
})
const SingerDetail = ((resolve) => {
    import ('views/singer-detail/singer-detail.vue').then((module) => {
        resolve(module)
    })
})
const Disc = ((resolve) => {
    import ('views/recommend-disc/disc.vue').then((module) => {
        resolve(module)
    })
})
const rankTopList = ((resolve) => {
    import ('views/rank-top-list/rank-top-list.vue').then((module) => {
        resolve(module)
    })
})
const UserCenter = ((resolve) => {
    import ('views/user-center/user-center.vue').then((module) => {
        resolve(module)
    })
})




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
    }],
}, {
    path: '/user',
    component: UserCenter
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router