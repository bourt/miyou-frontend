import { createRouter, createWebHistory } from 'vue-router'
const home = () => import('@/pages/HomePage/index.vue')
const team = () => import('@/pages/TeamPage/index.vue')
const addTeam = () => import('@/pages/TeamPage/AddTeamPage.vue')
const user = () => import('@/pages/UserPage/index.vue')
const userModify = () => import('@/pages/UserInfoPage/index.vue')
const search = () => import('@/pages/SearchPage/index.vue')
const login = () => import('@/pages/LoginPage/index.vue')
const register = () => import('@/pages/RegisterPage/index.vue')

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
        path: '/add-team',
        name: 'add-team',
        component: addTeam,
        meta: { title: "创建队伍" }
    },
    {
        path: '/user',
        name: 'user',
        component: user,
        meta: { title: "用户页" }
    },
    {
        path: '/user-modify',
        name: 'user-modify',
        component: userModify,
        meta: { title: "更新信息"}
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
