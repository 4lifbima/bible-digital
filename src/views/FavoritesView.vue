<template>
  <div class="min-h-screen bg-surface dark:bg-dark-surface">
    <!-- Header -->
    <header class="px-4 pt-6 pb-4">
      <h1 class="text-2xl font-bold text-text-primary dark:text-dark-text">Ayat Tersimpan</h1>
      <p class="text-text-secondary dark:text-dark-text-secondary text-sm mt-1">
        {{ favorites.length }} ayat disimpan
      </p>
    </header>

    <!-- Content -->
    <div class="px-4 pb-4">
      <!-- Loading State -->
      <template v-if="isLoadingPage">
        <div class="space-y-3">
          <SkeletonLoader type="verse" v-for="i in 3" :key="i" />
        </div>
      </template>
      
      <!-- Empty State -->
      <template v-else-if="favorites.length === 0">
        <div class="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
          <div class="w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-5">
            <svg class="w-14 h-14 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold text-text-primary dark:text-dark-text mb-2">Belum Ada Ayat Tersimpan</h2>
          <p class="text-text-secondary dark:text-dark-text-secondary text-sm max-w-xs mb-6">
            Simpan ayat favorit Anda untuk dibaca kembali kapan saja
          </p>
          <button 
            @click="$router.push('/baca')"
            class="btn-primary"
          >
            <svg class="w-5 h-5 mr-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Mulai Membaca
          </button>
        </div>
      </template>

      <!-- Favorites List -->
      <template v-else>
        <div class="space-y-3">
          <div 
            v-for="(verse, index) in favorites"
            :key="verse.id"
            class="card animate-fade-in"
            :style="{ animationDelay: `${index * 0.03}s` }"
          >
            <div class="flex items-start justify-between gap-3 mb-2">
              <span class="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                {{ verse.book }} {{ verse.chapter }}:{{ verse.verse || verse.verses }}
              </span>
              <button 
                @click="removeFromFavorites(verse.id)"
                class="btn-icon -mr-2 -mt-1 group"
              >
                <svg class="w-5 h-5 text-primary fill-primary group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
            
            <p class="text-text-primary dark:text-dark-text leading-relaxed" :class="fontSizeClass">
              {{ verse.text }}
            </p>

            <div class="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-dark-surface-tertiary">
              <button 
                @click="shareVerse(verse)"
                class="btn-ghost text-sm flex items-center gap-1.5"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Bagikan
              </button>
              <button 
                @click="copyVerse(verse)"
                class="btn-ghost text-sm flex items-center gap-1.5"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Salin
              </button>
            </div>
          </div>
        </div>
      </template>
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
import { inject, computed, ref, onMounted } from 'vue'
import SkeletonLoader from '../components/SkeletonLoader.vue'

const favorites = inject('favorites')
const removeFavorite = inject('removeFavorite')
const fontSize = inject('fontSize')

const isLoadingPage = ref(true)
const showToast = ref(false)
const toastMessage = ref('')

onMounted(() => {
  setTimeout(() => {
    isLoadingPage.value = false
  }, 1000)
})

const fontSizeClass = computed(() => {
  const sizes = { 1: 'text-sm', 2: 'text-base', 3: 'text-lg', 4: 'text-xl' }
  return sizes[fontSize.value] || 'text-base'
})

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

const removeFromFavorites = (id) => {
  removeFavorite(id)
  showToastMessage('Dihapus dari favorit')
}

const shareVerse = async (verse) => {
  const text = `"${verse.text}" - ${verse.book} ${verse.chapter}:${verse.verse || verse.verses}`
  
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Alkitab', text })
    } catch (err) {
      console.log('Share cancelled')
    }
  } else {
    await navigator.clipboard.writeText(text)
    showToastMessage('Ayat berhasil disalin!')
  }
}

const copyVerse = async (verse) => {
  const text = `"${verse.text}" - ${verse.book} ${verse.chapter}:${verse.verse || verse.verses}`
  await navigator.clipboard.writeText(text)
  showToastMessage('Ayat berhasil disalin!')
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
