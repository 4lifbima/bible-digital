<template>
  <div :class="{ 'dark': isDarkMode }" class="min-h-screen">
    <div class="bg-surface dark:bg-dark-surface min-h-screen transition-colors duration-300">
      <!-- Main Content Area -->
      <main class="safe-bottom">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
      
      <!-- Bottom Navigation -->
      <BottomNav />
      
      <!-- Install Prompt Modal -->
      <InstallPrompt />
    </div>
  </div>
</template>

<script setup>
import { ref, provide, watch, onMounted } from 'vue'
import BottomNav from './components/BottomNav.vue'
import InstallPrompt from './components/InstallPrompt.vue'

// Dark mode state
const isDarkMode = ref(false)

// Font size state (1 = small, 2 = normal, 3 = large, 4 = extra large)
const fontSize = ref(2)

// Favorites state
const favorites = ref([])

// Loading state
const isLoading = ref(true)

// Initialize from localStorage
onMounted(() => {
  // Load saved preferences
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode) {
    isDarkMode.value = JSON.parse(savedDarkMode)
  }

  const savedFontSize = localStorage.getItem('fontSize')
  if (savedFontSize) {
    fontSize.value = JSON.parse(savedFontSize)
  }

  const savedFavorites = localStorage.getItem('favorites')
  if (savedFavorites) {
    favorites.value = JSON.parse(savedFavorites)
  }

  // Simulate initial loading
  setTimeout(() => {
    isLoading.value = false
  }, 800)
})

// Watch and persist favorites
watch(favorites, (newFavorites) => {
  localStorage.setItem('favorites', JSON.stringify(newFavorites))
}, { deep: true })

// Watch and persist dark mode
watch(isDarkMode, (newValue) => {
  localStorage.setItem('darkMode', JSON.stringify(newValue))
})

// Watch and persist font size
watch(fontSize, (newValue) => {
  localStorage.setItem('fontSize', JSON.stringify(newValue))
})

// Provide global state
provide('isDarkMode', isDarkMode)
provide('fontSize', fontSize)
provide('favorites', favorites)
provide('isLoading', isLoading)

// Methods for favorites
const addFavorite = (verse) => {
  const exists = favorites.value.find(f => f.id === verse.id)
  if (!exists) {
    favorites.value.push(verse)
  }
}

const removeFavorite = (verseId) => {
  favorites.value = favorites.value.filter(f => f.id !== verseId)
}

const isFavorite = (verseId) => {
  return favorites.value.some(f => f.id === verseId)
}

provide('addFavorite', addFavorite)
provide('removeFavorite', removeFavorite)
provide('isFavorite', isFavorite)
</script>

<style>
/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
