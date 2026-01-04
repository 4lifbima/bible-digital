<template>
  <div class="min-h-screen bg-surface dark:bg-dark-surface">
    <!-- Search Header -->
    <header class="sticky top-0 z-30 bg-surface/95 dark:bg-dark-surface/95 backdrop-blur-md px-4 py-3">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-text-secondary dark:text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Cari ayat atau kata kunci..."
          class="input-android pl-12 pr-10"
          @input="handleSearch"
        />
        <button 
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute inset-y-0 right-0 pr-4 flex items-center"
        >
          <svg class="w-5 h-5 text-text-secondary dark:text-dark-text-secondary hover:text-text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Search Results -->
    <div class="px-4 pb-4">
      <!-- Empty State - No Search Yet -->
      <div v-if="!searchQuery" class="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div class="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-5">
          <svg class="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-text-primary dark:text-dark-text mb-2">Cari Ayat Alkitab</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm max-w-xs mb-8">
          Ketik kata kunci untuk mencari ayat-ayat yang mengandung kata tersebut
        </p>

        <!-- Popular Searches -->
        <div class="w-full">
          <h3 class="text-sm font-semibold text-text-secondary dark:text-dark-text-secondary mb-4">Pencarian Populer</h3>
          <div class="flex flex-wrap gap-2 justify-center">
            <button 
              v-for="(keyword, index) in popularSearches"
              :key="keyword"
              @click="searchQuery = keyword; handleSearch()"
              class="px-4 py-2.5 bg-surface-secondary dark:bg-dark-surface-secondary rounded-full 
                     text-sm font-medium text-text-primary dark:text-dark-text hover:bg-primary hover:text-white
                     transition-all duration-200 shadow-sm hover:shadow-md animate-fade-in"
              :style="{ animationDelay: `${index * 0.05}s` }"
            >
              {{ keyword }}
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="isSearching" class="py-8">
        <div class="space-y-3">
          <SkeletonLoader type="search" v-for="i in 4" :key="i" />
        </div>
      </div>

      <!-- No Results -->
      <div v-else-if="searchQuery && searchResults.length === 0" class="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div class="w-24 h-24 rounded-full bg-gray-100 dark:bg-dark-surface-secondary flex items-center justify-center mb-5">
          <svg class="w-12 h-12 text-text-disabled" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-text-primary dark:text-dark-text mb-2">Tidak Ditemukan</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary text-sm">
          Tidak ada ayat yang mengandung "{{ searchQuery }}"
        </p>
      </div>

      <!-- Results List -->
      <div v-else class="space-y-3">
        <div class="flex items-center justify-between py-2">
          <p class="text-sm font-medium text-text-secondary dark:text-dark-text-secondary">
            {{ searchResults.length }} hasil ditemukan
          </p>
          <button 
            @click="clearSearch"
            class="text-primary text-sm font-medium"
          >
            Hapus
          </button>
        </div>
        
        <div 
          v-for="(result, index) in searchResults"
          :key="result.id"
          class="card cursor-pointer hover:shadow-elevation-3 transition-all duration-300 animate-fade-in"
          :style="{ animationDelay: `${index * 0.03}s` }"
          @click="goToVerse(result)"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                  {{ result.book }} {{ result.chapter }}:{{ result.verse }}
                </span>
              </div>
              <p 
                class="text-text-primary dark:text-dark-text leading-relaxed"
                v-html="highlightText(result.text)"
              ></p>
            </div>
            <button 
              @click.stop="toggleFavorite(result)"
              class="btn-icon flex-shrink-0 -mr-2"
            >
              <svg 
                class="w-5 h-5 transition-all duration-200"
                :class="isFav(result.id) ? 'text-primary fill-primary scale-110' : 'text-text-secondary dark:text-dark-text-secondary'"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div 
        v-if="showToast"
        class="fixed bottom-24 left-4 right-4 z-50 flex justify-center"
      >
        <div class="bg-gray-800 dark:bg-gray-700 text-white px-4 py-3 rounded-xl shadow-elevation-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-sm font-medium">{{ toastMessage }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { searchVerses } from '../data/bibleData.js'
import SkeletonLoader from '../components/SkeletonLoader.vue'

const router = useRouter()

const addFavorite = inject('addFavorite')
const removeFavorite = inject('removeFavorite')
const isFavorite = inject('isFavorite')

const searchQuery = ref('')
const searchResults = ref([])
const isSearching = ref(false)
const showToast = ref(false)
const toastMessage = ref('')

const popularSearches = ['kasih', 'damai', 'harapan', 'iman', 'kuatir', 'berkat', 'kekuatan', 'ampun']

let searchTimeout = null

const handleSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  isSearching.value = true
  
  searchTimeout = setTimeout(() => {
    searchResults.value = searchVerses(searchQuery.value.trim())
    isSearching.value = false
  }, 2000)
}

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
}

const highlightText = (text) => {
  if (!searchQuery.value) return text
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<mark class="bg-primary/30 text-text-primary dark:text-dark-text rounded px-0.5">$1</mark>')
}

const isFav = (id) => {
  return isFavorite(id)
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

const toggleFavorite = (result) => {
  if (isFav(result.id)) {
    removeFavorite(result.id)
    showToastMessage('Dihapus dari favorit')
  } else {
    addFavorite(result)
    showToastMessage('Disimpan ke favorit')
  }
}

const goToVerse = (result) => {
  router.push('/baca')
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
