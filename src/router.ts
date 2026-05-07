import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomeView },
        { path: '/products', component: () => import('./views/ProductsView.vue') },
        { path: '/product/:id', component: () => import('./views/ProductDetail.vue') },
        { path: '/dashboard', component: () => import('./views/DashboardView.vue') }
    ]
})

export default router