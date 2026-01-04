<template>
  <div class="min-h-screen bg-surface dark:bg-dark-surface">
    <!-- Header -->
    <header class="px-4 pt-6 pb-4">
      <h1 class="text-2xl font-bold text-text-primary dark:text-dark-text">Pengaturan</h1>
    </header>

    <!-- Settings List -->
    <div class="px-4 pb-4">
      <!-- Appearance Section -->
      <section class="mb-6 animate-fade-in">
        <h2 class="text-xs font-semibold text-text-secondary dark:text-dark-text-secondary uppercase tracking-wider mb-3 px-1">Tampilan</h2>
        
        <div class="card divide-y divide-gray-100 dark:divide-dark-surface-tertiary">
          <!-- Dark Mode -->
          <div class="flex items-center justify-between py-4 first:pt-0 last:pb-0">
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-500/10 flex items-center justify-center">
                <svg class="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-text-primary dark:text-dark-text">Mode Gelap</h3>
                <p class="text-sm text-text-secondary dark:text-dark-text-secondary">Lebih nyaman di malam hari</p>
              </div>
            </div>
            <button 
              @click="toggleDarkMode"
              class="toggle-track"
              :class="{ 'active': isDarkMode }"
            >
              <div class="toggle-thumb"></div>
            </button>
          </div>

          <!-- Font Size -->
          <div class="py-4">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-text-primary dark:text-dark-text">Ukuran Teks</h3>
                <p class="text-sm text-text-secondary dark:text-dark-text-secondary">{{ fontSizeLabel }}</p>
              </div>
            </div>
            
            <div class="flex items-center gap-4 px-2">
              <span class="text-xs text-text-secondary dark:text-dark-text-secondary font-medium">A</span>
              <div class="flex-1 relative">
                <input 
                  type="range"
                  min="1"
                  max="4"
                  :value="fontSize"
                  @input="updateFontSize($event.target.value)"
                  class="w-full h-2 bg-gray-200 dark:bg-dark-surface-tertiary rounded-full appearance-none cursor-pointer"
                />
                <div 
                  class="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary to-primary-400 rounded-full pointer-events-none"
                  :style="{ width: `${(fontSize - 1) / 3 * 100}%` }"
                ></div>
              </div>
              <span class="text-lg text-text-secondary dark:text-dark-text-secondary font-semibold">A</span>
            </div>
            
            <!-- Preview -->
            <div class="mt-4 p-4 bg-surface-secondary dark:bg-dark-surface-secondary rounded-xl">
              <p :class="fontSizeClass" class="text-text-primary dark:text-dark-text leading-relaxed">
                Karena begitu besar kasih Allah akan dunia ini...
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Data Section -->
      <section class="mb-6 animate-fade-in" style="animation-delay: 0.1s">
        <h2 class="text-xs font-semibold text-text-secondary dark:text-dark-text-secondary uppercase tracking-wider mb-3 px-1">Data</h2>
        
        <div class="card divide-y divide-gray-100 dark:divide-dark-surface-tertiary">
          <!-- Favorites Count -->
          <div class="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-text-primary dark:text-dark-text">Ayat Tersimpan</h3>
              <p class="text-sm text-text-secondary dark:text-dark-text-secondary">{{ favorites.length }} ayat</p>
            </div>
            <button 
              @click="$router.push('/favorit')"
              class="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full"
            >
              Lihat
            </button>
          </div>

          <!-- Clear Data -->
          <button 
            @click="confirmClearData"
            class="flex items-center gap-4 w-full py-4 first:pt-0 last:pb-0 text-left"
          >
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-red-500">Hapus Semua Data</h3>
              <p class="text-sm text-text-secondary dark:text-dark-text-secondary">Bookmark dan pengaturan</p>
            </div>
          </button>
        </div>
      </section>

      <!-- About Section -->
      <section class="mb-6 animate-fade-in" style="animation-delay: 0.2s">
        <h2 class="text-xs font-semibold text-text-secondary dark:text-dark-text-secondary uppercase tracking-wider mb-3 px-1">Tentang</h2>
        
        <div class="card divide-y divide-gray-100 dark:divide-dark-surface-tertiary">
          <div class="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
            <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/10 flex items-center justify-center">
              <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-text-primary dark:text-dark-text">Versi Aplikasi</h3>
              <p class="text-sm text-text-secondary dark:text-dark-text-secondary">1.0.0 (PWA)</p>
            </div>
            <span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-medium rounded-full">
              Terbaru
            </span>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <div class="text-center py-8 animate-fade-in" style="animation-delay: 0.3s">
        <div class="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 class="font-bold text-lg text-text-primary dark:text-dark-text mb-1">Alkitab</h3>
        <p class="text-sm text-text-secondary dark:text-dark-text-secondary">Firman Tuhan untuk setiap hari</p>
        <p class="text-xs text-text-disabled mt-2">Made with ❤️</p>
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
import { inject, computed, ref } from 'vue'

const isDarkMode = inject('isDarkMode')
const fontSize = inject('fontSize')
const favorites = inject('favorites')

const showToast = ref(false)
const toastMessage = ref('')

const fontSizeLabels = {
  1: 'Kecil',
  2: 'Normal',
  3: 'Besar',
  4: 'Sangat Besar'
}

const fontSizeLabel = computed(() => fontSizeLabels[fontSize.value] || 'Normal')

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

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  showToastMessage(isDarkMode.value ? 'Mode gelap aktif' : 'Mode terang aktif')
}

const updateFontSize = (value) => {
  fontSize.value = parseInt(value)
  localStorage.setItem('fontSize', JSON.stringify(fontSize.value))
}

const confirmClearData = () => {
  if (confirm('Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.')) {
    favorites.value = []
    localStorage.removeItem('favorites')
    localStorage.removeItem('darkMode')
    localStorage.removeItem('fontSize')
    localStorage.removeItem('hasShownInstallPrompt')
    isDarkMode.value = false
    fontSize.value = 2
    showToastMessage('Semua data telah dihapus')
  }
}
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  background: transparent;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #e87605 0%, #d56a04 100%);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(232, 118, 5, 0.4);
  position: relative;
  z-index: 10;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #e87605 0%, #d56a04 100%);
  border-radius: 50%;
  cursor: pointer;
  border: 0;
  box-shadow: 0 2px 6px rgba(232, 118, 5, 0.4);
}

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
