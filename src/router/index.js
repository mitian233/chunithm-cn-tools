import { createRouter, createWebHistory } from 'vue-router'
const routes = [
    { path: '/', component: () => import('../views/homeView.vue') , meta:{title:'主页',htmlAttrs: {amp: true},index: 1}},
    { path: '/about', component: () => import('../views/aboutView.vue') , meta: {title:'关于',htmlAttrs: {amp: true},index: 2}},
    { path: '/brand', component: () => import('../views/brandList.vue') , meta: {title:'牌子查询',htmlAttrs: {amp: true},index: 3}},
    { path: '/brand/:id', component: () => import('../views/brandList.vue') , meta: {title:'牌子查询',htmlAttrs: {amp: true},index: 3}},
    { path: '/song', component: () => import('../views/songsList.vue') , meta: {title:'歌曲查询',htmlAttrs: {amp: true},index: 4}},
    { path: '/song/:id', component: () => import('../views/songsList.vue') , meta: {title:'歌曲查询',htmlAttrs: {amp: true},index: 4}},
    { path: '/op', component: () => import('../views/overpowerCalculator.vue') , meta: {title:'OP计算器',htmlAttrs: {amp: true},index: 5}},
]

const router = createRouter({history: createWebHistory(), routes})

const DEFAULT_TITLE = 'CHUNITHM 国服工具箱'

router.afterEach((to) => {
    const title = to.meta.title ? `${to.meta.title} - ${DEFAULT_TITLE}` : DEFAULT_TITLE
    document.title = title
})

export default router