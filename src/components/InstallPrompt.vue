<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="showModal" 
        class="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="dismissModal"
        ></div>
        
        <!-- Modal Content -->
        <div class="relative w-full max-w-sm bg-white dark:bg-dark-surface-secondary rounded-android-xl shadow-elevation-4 overflow-hidden animate-slide-up">
          <!-- Header with illustration -->
          <div class="relative bg-gradient-to-br from-primary to-primary-700 px-6 pt-8 pb-12 text-center overflow-hidden">
            <!-- Decorative circles -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <!-- Icon -->
            <div class="relative z-10 w-20 h-20 mx-auto mb-4 bg-white rounded-2xl shadow-elevation-3 flex items-center justify-center">
              <svg class="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            
            <h2 class="relative z-10 text-xl font-bold text-white mb-1">Install Alkitab</h2>
            <p class="relative z-10 text-white/80 text-sm">Akses lebih cepat dari layar utama</p>
          </div>
          
          <!-- Features -->
          <div class="px-6 py-5 space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-text-primary dark:text-dark-text text-sm">Baca Offline</h3>
                <p class="text-xs text-text-secondary dark:text-dark-text-secondary">Akses Alkitab tanpa koneksi internet</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-text-primary dark:text-dark-text text-sm">Lebih Cepat</h3>
                <p class="text-xs text-text-secondary dark:text-dark-text-secondary">Buka langsung dari layar utama</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-text-primary dark:text-dark-text text-sm">Notifikasi</h3>
                <p class="text-xs text-text-secondary dark:text-dark-text-secondary">Dapatkan renungan harian</p>
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="px-6 pb-6 space-y-3">
            <button 
              @click="installApp"
              class="w-full btn-primary flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Install Sekarang
            </button>
            
            <button 
              @click="dismissModal"
              class="w-full py-3 text-text-secondary dark:text-dark-text-secondary text-sm font-medium hover:text-text-primary dark:hover:text-dark-text transition-colors"
            >
              Nanti Saja
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showModal = ref(false)
const deferredPrompt = ref(null)

onMounted(() => {
  // Check if already shown
  const hasShownInstallPrompt = localStorage.getItem('hasShownInstallPrompt')
  
  // Listen for beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    
    // Show modal only if not shown before and not already installed
    if (!hasShownInstallPrompt) {
      setTimeout(() => {
        showModal.value = true
      }, 2000) // Show after 2 seconds
    }
  })

  // Check if app is already installed
  window.addEventListener('appinstalled', () => {
    deferredPrompt.value = null
    showModal.value = false
  })

  // For iOS Safari - show custom install instructions
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
  
  if (isIOS && !isInStandaloneMode && !hasShownInstallPrompt) {
    setTimeout(() => {
      showModal.value = true
    }, 2000)
  }
})

const installApp = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    }
    
    deferredPrompt.value = null
  } else {
    // For iOS - show instructions
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    if (isIOS) {
      alert('Untuk install di iPhone/iPad:\n\n1. Ketuk tombol Share (kotak dengan panah ke atas)\n2. Scroll ke bawah dan ketuk "Add to Home Screen"\n3. Ketuk "Add"')
    }
  }
  
  dismissModal()
}

const dismissModal = () => {
  showModal.value = false
  localStorage.setItem('hasShownInstallPrompt', 'true')
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: translateY(100%);
}
</style>
