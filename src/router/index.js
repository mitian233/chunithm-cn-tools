import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    { path: '/:pathMatch(.*)', component:() => import('../views/notFoundView.vue'), meta:{title:'页面未找到',htmlAttrs: {amp: true},index: 0}},
    { path: '/', component: () => import('../views/homeView.vue') , meta:{title:'主页',htmlAttrs: {amp: true},index: 1}},
    { path: '/about', component: () => import('../views/aboutView.vue') , meta: {title:'关于',htmlAttrs: {amp: true},index: 2}},
    { path: '/title', component: () => import('../views/titleList.vue') , meta: {title:'称号列表',htmlAttrs: {amp: true},index: 3}},
    { path: '/title/:search', component: () => import('../views/titleList.vue') , meta: {title:'称号列表',htmlAttrs: {amp: true},index: 3}},
    { path: '/song', component: () => import('../views/songsList.vue') , meta: {title:'歌曲列表',htmlAttrs: {amp: true},index: 4}},
    { path: '/song/:search', component: () => import('../views/songsList.vue') , meta: {title:'歌曲列表',htmlAttrs: {amp: true},index: 4}},
    { path: '/song/id/:id', component: () => import('../views/songInfo.vue'), meta: {title:'歌曲信息',htmlAttrs: {amp: true},index: 4}},
    { path: '/op', component: () => import('../views/overpowerCalculator.vue') , meta: {title:'OP计算器',htmlAttrs: {amp: true},index: 5}},
    { path: '/rating', component: () => import('../views/ratingCalculator.vue') , meta: {title:'单曲 Rating 计算器',htmlAttrs: {amp: true},index: 6}},
    { path: '/labs', component: () => import('../views/labsView.vue') , meta: {title:'实验室',htmlAttrs: {amp: true},index: 7}},
]

const router = createRouter({history: createWebHistory(), routes})

const DEFAULT_TITLE = 'CHUNITHM 国服工具箱'

router.afterEach((to) => {
    const title = to.meta.title ? `${to.meta.title} - ${DEFAULT_TITLE}` : DEFAULT_TITLE
    document.title = title
})

export default router
