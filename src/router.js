import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/HomeView.vue')
    },
    {
        path: '/baca',
        name: 'ReadBible',
        component: () => import('./views/ReadBibleView.vue')
    },
    {
        path: '/cari',
        name: 'Search',
        component: () => import('./views/SearchView.vue')
    },
    {
        path: '/renungan',
        name: 'Reflection',
        component: () => import('./views/ReflectionView.vue')
    },
    {
        path: '/favorit',
        name: 'Favorites',
        component: () => import('./views/FavoritesView.vue')
    },
    {
        path: '/pengaturan',
        name: 'Settings',
        component: () => import('./views/SettingsView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
