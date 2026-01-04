<template>
  <nav class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-dark-surface-secondary shadow-elevation-4 border-t border-gray-100 dark:border-dark-surface-tertiary">
    <div class="flex justify-around items-center h-20 max-w-lg mx-auto" style="padding-bottom: env(safe-area-inset-bottom, 0px);">
      <router-link 
        v-for="item in navItems" 
        :key="item.path"
        :to="item.path"
        class="nav-item flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200"
        :class="{ 'active': isActive(item.path) }"
      >
        <div class="relative">
          <!-- Active indicator pill -->
          <div 
            v-if="isActive(item.path)"
            class="absolute -inset-x-3 -inset-y-1 bg-primary/10 rounded-full transition-all duration-300"
          ></div>
          
          <!-- Icon -->
          <svg 
            class="w-6 h-6 relative z-10 transition-colors duration-200"
            :class="isActive(item.path) ? 'text-primary' : 'text-text-secondary dark:text-dark-text-secondary'"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
          </svg>
        </div>
        
        <!-- Label -->
        <span 
          class="text-xs mt-1 font-medium transition-colors duration-200"
          :class="isActive(item.path) ? 'text-primary' : 'text-text-secondary dark:text-dark-text-secondary'"
        >
          {{ item.label }}
        </span>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  {
    path: '/',
    label: 'Beranda',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  },
  {
    path: '/baca',
    label: 'Baca',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  },
  {
    path: '/cari',
    label: 'Cari',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
  },
  {
    path: '/renungan',
    label: 'Renungan',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
  },
  {
    path: '/pengaturan',
    label: 'Lainnya',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
  }
]

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>

<style scoped>
.nav-item {
  -webkit-tap-highlight-color: transparent;
}

.nav-item:active {
  opacity: 0.7;
}
</style>
