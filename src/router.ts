import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomeView },
        { path: '/products', component: () => import('./views/ProductsView.vue') },
        { path: '/new-arrivals', component: () => import('./views/NewArrivalsView.vue') },
        { path: '/dashboard', component: () => import('./views/DashboardView.vue') },
        { path: '/our-story', component: () => import('./views/OurStoryView.vue') },
        { path: '/product/:id', component: () => import('./views/ProductDetail.vue') },
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
})

export default router