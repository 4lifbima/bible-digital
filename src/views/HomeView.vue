<template>
  <div class="min-h-screen bg-surface dark:bg-dark-surface pb-4">
    <!-- Header -->
    <header class="px-4 pt-6 pb-4">
      <div class="flex items-center justify-between mb-1">
        <div>
          <p class="text-text-secondary dark:text-dark-text-secondary text-sm">{{ greeting }}</p>
          <h1 class="text-2xl font-bold text-text-primary dark:text-dark-text">Alkitab</h1>
        </div>
        <button 
          @click="$router.push('/favorit')"
          class="btn-icon relative"
        >
          <svg class="w-6 h-6 text-text-secondary dark:text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <!-- Badge for favorites count -->
          <span 
            v-if="favorites.length > 0"
            class="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            {{ favorites.length > 9 ? '9+' : favorites.length }}
          </span>
        </button>
      </div>
    </header>

    <!-- Daily Verse Card -->
    <section class="px-4 mb-6">
      <!-- Skeleton Loading -->
      <template v-if="isLoadingPage">
        <SkeletonLoader type="hero" />
      </template>
      
      <!-- Actual Content -->
      <template v-else>
        <div class="relative overflow-hidden rounded-android-xl bg-gradient-to-br from-primary via-primary-600 to-primary-800 p-5 shadow-elevation-3 animate-fade-in">
          <!-- Decorative Elements -->
          <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"></div>
          <div class="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div class="absolute top-1/2 right-1/4 w-20 h-20 bg-white/5 rounded-full"></div>
          
          <div class="relative z-10">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span class="text-white/90 text-sm font-medium">Ayat Hari Ini</span>
            </div>
            
            <p class="text-white text-lg leading-relaxed mb-4 font-medium" :class="fontSizeClass">
              "{{ dailyVerse.text }}"
            </p>
            
            <div class="flex items-center justify-between">
              <span class="text-white/80 text-sm font-medium">
                {{ dailyVerse.book }} {{ dailyVerse.chapter }}:{{ dailyVerse.verse }}
              </span>
              <div class="flex items-center gap-2">
                <button 
                  @click="copyVerse"
                  class="flex items-center gap-1 text-white/90 text-sm hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-full"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Salin
                </button>
                <button 
                  @click="shareVerse"
                  class="flex items-center gap-1 text-white/90 text-sm hover:text-white transition-colors bg-white/10 px-3 py-1.5 rounded-full"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Bagikan
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </section>

    <!-- Quick Actions -->
    <section class="px-4 mb-6">
      <h2 class="text-lg font-semibold text-text-primary dark:text-dark-text mb-3">Mulai Membaca</h2>
      
      <template v-if="isLoadingPage">
        <div class="grid grid-cols-3 gap-3">
          <SkeletonLoader type="grid" v-for="i in 3" :key="i" />
        </div>
      </template>
      
      <template v-else>
        <div class="grid grid-cols-3 gap-3">
          <button 
            @click="$router.push('/baca')"
            class="card flex flex-col items-center justify-center py-5 hover:shadow-elevation-3 group transition-all duration-300 animate-fade-in"
            style="animation-delay: 0.1s"
          >
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span class="text-sm font-semibold text-text-primary dark:text-dark-text">Baca</span>
            <span class="text-xs text-text-secondary dark:text-dark-text-secondary mt-0.5">Alkitab</span>
          </button>

          <button 
            @click="$router.push('/cari')"
            class="card flex flex-col items-center justify-center py-5 hover:shadow-elevation-3 group transition-all duration-300 animate-fade-in"
            style="animation-delay: 0.15s"
          >
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span class="text-sm font-semibold text-text-primary dark:text-dark-text">Cari</span>
            <span class="text-xs text-text-secondary dark:text-dark-text-secondary mt-0.5">Ayat</span>
          </button>

          <button 
            @click="$router.push('/renungan')"
            class="card flex flex-col items-center justify-center py-5 hover:shadow-elevation-3 group transition-all duration-300 animate-fade-in"
            style="animation-delay: 0.2s"
          >
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-7 h-7 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span class="text-sm font-semibold text-text-primary dark:text-dark-text">Renungan</span>
            <span class="text-xs text-text-secondary dark:text-dark-text-secondary mt-0.5">Harian</span>
          </button>
        </div>
      </template>
    </section>

    <!-- Recent Reflections -->
    <section class="px-4 mb-6">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-semibold text-text-primary dark:text-dark-text">Renungan Terbaru</h2>
        <button 
          @click="$router.push('/renungan')"
          class="text-primary text-sm font-medium hover:text-primary-600 transition-colors"
        >
          Lihat Semua
        </button>
      </div>
      
      <template v-if="isLoadingPage">
        <div class="space-y-3">
          <SkeletonLoader type="card" v-for="i in 2" :key="i" />
        </div>
      </template>
      
      <template v-else>
        <div class="space-y-3">
          <div 
            v-for="(reflection, index) in recentReflections" 
            :key="reflection.id"
            @click="$router.push('/renungan')"
            class="card flex items-start gap-4 cursor-pointer hover:shadow-elevation-3 transition-all duration-300 animate-fade-in"
            :style="{ animationDelay: `${0.25 + index * 0.05}s` }"
          >
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
              <svg class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-text-primary dark:text-dark-text truncate">{{ reflection.title }}</h3>
              <p class="text-sm text-text-secondary dark:text-dark-text-secondary mt-0.5">
                {{ reflection.verse.book }} {{ reflection.verse.chapter }}:{{ reflection.verse.verse || reflection.verse.verses }}
              </p>
            </div>
            <div class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-surface-tertiary">
              <svg class="w-4 h-4 text-text-secondary dark:text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </template>
    </section>

    <!-- Continue Reading -->
    <section class="px-4">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-semibold text-text-primary dark:text-dark-text">Lanjutkan Membaca</h2>
      </div>
      
      <template v-if="isLoadingPage">
        <SkeletonLoader type="card" />
      </template>
      
      <template v-else>
        <div 
          @click="$router.push('/baca')"
          class="card flex items-center gap-4 cursor-pointer hover:shadow-elevation-3 transition-all duration-300 animate-fade-in"
          style="animation-delay: 0.35s"
        >
          <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg">
            <span class="text-white font-bold text-lg">Kej</span>
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-text-primary dark:text-dark-text">Kejadian 1</h3>
            <p class="text-sm text-text-secondary dark:text-dark-text-secondary">Penciptaan Langit dan Bumi</p>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex flex-col items-end">
              <span class="text-xs text-text-secondary dark:text-dark-text-secondary mb-1">30%</span>
              <div class="w-16 h-1.5 bg-gray-200 dark:bg-dark-surface-tertiary rounded-full overflow-hidden">
                <div class="w-1/3 h-full bg-gradient-to-r from-primary to-primary-400 rounded-full"></div>
              </div>
            </div>
            <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </template>
    </section>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div 
        v-if="showToast"
        class="fixed bottom-24 left-4 right-4 z-50 flex justify-center"
      >
        <div class="bg-gray-800 dark:bg-gray-700 text-white px-4 py-3 rounded-android-lg shadow-elevation-4 flex items-center gap-2">
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
import { ref, computed, inject, onMounted } from 'vue'
import { getDailyVerse } from '../data/bibleData.js'
import { getRecentReflections } from '../data/reflectionData.js'
import SkeletonLoader from '../components/SkeletonLoader.vue'

const fontSize = inject('fontSize', ref(2))
const favorites = inject('favorites', ref([]))

const dailyVerse = getDailyVerse()
const recentReflections = getRecentReflections(3)

const isLoadingPage = ref(true)
const showToast = ref(false)
const toastMessage = ref('')

onMounted(() => {
  // Simulate loading
  setTimeout(() => {
    isLoadingPage.value = false
  }, 1000)
})

const fontSizeClass = computed(() => {
  const sizes = { 1: 'text-base', 2: 'text-lg', 3: 'text-xl', 4: 'text-2xl' }
  return sizes[fontSize.value] || 'text-lg'
})

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Selamat Pagi'
  if (hour < 15) return 'Selamat Siang'
  if (hour < 18) return 'Selamat Sore'
  return 'Selamat Malam'
})

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

const copyVerse = async () => {
  const text = `"${dailyVerse.text}" - ${dailyVerse.book} ${dailyVerse.chapter}:${dailyVerse.verse}`
  await navigator.clipboard.writeText(text)
  showToastMessage('Ayat berhasil disalin!')
}

const shareVerse = async () => {
  const text = `"${dailyVerse.text}" - ${dailyVerse.book} ${dailyVerse.chapter}:${dailyVerse.verse}`
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Ayat Hari Ini',
        text: text
      })
    } catch (err) {
      console.log('Share cancelled')
    }
  } else {
    await navigator.clipboard.writeText(text)
    showToastMessage('Ayat berhasil disalin!')
  }
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
