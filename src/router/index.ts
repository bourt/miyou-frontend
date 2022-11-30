import { createRouter, createWebHistory } from 'vue-router'
// import home from '../pages/HomePage/index.vue'
const home = () => import('../pages/HomePage/index.vue')
import team from '../pages/TeamPage/index.vue'
import user from '../pages/UserPage/index.vue'
const search = () => import('../pages/SearchPage/index.vue')
const login = () => import('../pages/LoginPage/index.vue')
const register = () => import('../pages/RegisterPage/index.vue')

const routes = [
    {
        path: '/',
        name: 'home',
        component: home,
        meta: { title: "miyou" }
    },
    {
        path: '/team',
        name: 'team',
        component: team,
        meta: { title: "队伍页" }
    },
    {
        path: '/user',
        name: 'user',
        component: user,
        meta: { title: "用户页" }
    },
    {
        path: '/search',
        name: 'search',
        component: search,
        meta: { title: "搜索页" }
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: { title: "登录" },
    },
    {
        path: '/register',
        name: 'register',
        component: register,
        meta: { title: "注册" }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
