//导入vue-router
import {createRouter, createWebHistory} from 'vue-router'
//导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import ArticleCategoryVue from '@/views/article/ArticleCategory.vue'
import ArticleCategoryChart from '@/views/article/ArticleCategoryChart.vue'
import ArticleManageVue from '@/views/article/ArticleManage.vue'
import ArticleManageCharVue from '@/views/article/ArticleChart.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'
import UserAvatarVUe from '@/views/user/UserAvatar.vue'
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue'
import UserCharVue from '@/views/user/UserChart.vue'
//定义路由关系
const routes = [
    {path: '/login', component: LoginVue},
    {
        path: '/', component: LayoutVue, redirect: "/article/manage", children: [
            {path: '/article/category', component: ArticleCategoryVue},
            {path: '/article/category-chart', component: ArticleCategoryChart},
            {path: '/article/manage', component: ArticleManageVue},
            {path: '/article/manage-chart', component: ArticleManageCharVue},
            {path: '/user/info', component: UserInfoVue},
            {path: '/user/avatar', component: UserAvatarVUe},
            {path: '/user/password', component: UserResetPasswordVue},
            {path: '/user/char', component: UserCharVue},
        ]
    }
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router
