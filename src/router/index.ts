import { createRouter, createWebHistory } from 'vue-router'
import home from '../pages/HomePage.vue'
import team from '../pages/TeamPage.vue'
import user from '../pages/UserPage.vue'
import search from '../pages/searchPage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/team',
        name: 'team',
        component: team
    },
    {
        path: '/user',
        name: 'user',
        component: user
    },
    {
        path: '/search',
        name: 'search',
        component: search
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
