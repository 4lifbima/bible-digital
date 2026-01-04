<template>
  <div class="min-h-screen bg-surface dark:bg-dark-surface">
    <!-- Header -->
    <header class="px-4 pt-6 pb-4">
      <h1 class="text-2xl font-bold text-text-primary dark:text-dark-text">Renungan Harian</h1>
      <p class="text-text-secondary dark:text-dark-text-secondary text-sm mt-1">{{ formattedDate }}</p>
    </header>

    <!-- Today's Reflection -->
    <section class="px-4 mb-6">
      <template v-if="isLoadingPage">
        <div class="card animate-pulse">
          <div class="flex items-start gap-3 mb-4">
            <div class="w-12 h-12 rounded-full bg-gray-200 dark:bg-dark-surface-tertiary"></div>
            <div class="flex-1 space-y-2">
              <div class="h-5 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-1/3"></div>
            </div>
          </div>
          <div class="h-24 bg-gray-200 dark:bg-dark-surface-tertiary rounded-xl mb-4"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded"></div>
            <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded"></div>
            <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-2/3"></div>
          </div>
        </div>
      </template>
      
      <template v-else>
        <div class="card animate-fade-in">
          <!-- Header -->
          <div class="flex items-start gap-3 mb-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div class="flex-1">
              <h2 class="text-lg font-bold text-text-primary dark:text-dark-text">{{ todayReflection.title }}</h2>
              <p class="text-sm text-primary font-medium">
                {{ todayReflection.verse.book }} {{ todayReflection.verse.chapter }}:{{ todayReflection.verse.verse || todayReflection.verse.verses }}
              </p>
            </div>
          </div>

          <!-- Verse Quote -->
          <div class="relative bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-5 mb-5 overflow-hidden">
            <div class="absolute top-0 right-0 text-primary/10 dark:text-primary/20 text-8xl font-serif leading-none">"</div>
            <p class="text-text-primary dark:text-dark-text leading-relaxed italic relative z-10" :class="fontSizeClass">
              {{ todayReflection.verse.text }}
            </p>
          </div>

          <!-- Content -->
          <div class="mb-5">
            <p 
              v-for="(paragraph, index) in contentParagraphs" 
              :key="index"
              class="text-text-primary dark:text-dark-text leading-relaxed mb-4 last:mb-0"
              :class="fontSizeClass"
            >
              {{ paragraph }}
            </p>
          </div>

          <!-- Prayer -->
          <div class="bg-surface-secondary dark:bg-dark-surface-secondary rounded-2xl p-5">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <svg class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0 0a1.5 1.5 0 013 0" />
                </svg>
              </div>
              <span class="text-sm font-bold text-text-primary dark:text-dark-text">Doa</span>
            </div>
            <p class="text-text-secondary dark:text-dark-text-secondary text-sm leading-relaxed">
              {{ todayReflection.prayer }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3 mt-5 pt-5 border-t border-gray-100 dark:border-dark-surface-tertiary">
            <button @click="shareReflection" class="btn-ghost flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Bagikan
            </button>
            <button @click="copyReflection" class="btn-ghost flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Salin
            </button>
          </div>
        </div>
      </template>
    </section>

    <!-- Recent Reflections -->
    <section class="px-4 mb-6">
      <h2 class="text-lg font-semibold text-text-primary dark:text-dark-text mb-3">Renungan Sebelumnya</h2>
      
      <template v-if="isLoadingPage">
        <div class="space-y-3">
          <SkeletonLoader type="card" v-for="i in 3" :key="i" />
        </div>
      </template>
      
      <template v-else>
        <div class="space-y-3">
          <div 
            v-for="(reflection, index) in otherReflections"
            :key="reflection.id"
            @click="viewReflection(reflection)"
            class="card cursor-pointer hover:shadow-elevation-3 transition-all duration-300 animate-fade-in"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <div class="flex items-start gap-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                <span class="text-primary font-bold text-lg">{{ formatDateShort(reflection.date) }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-text-primary dark:text-dark-text">{{ reflection.title }}</h3>
                <p class="text-sm text-text-secondary dark:text-dark-text-secondary truncate mt-0.5">
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
        </div>
      </template>
    </section>

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
import { ref, computed, inject, onMounted } from 'vue'
import { getTodayReflection, getRecentReflections } from '../data/reflectionData.js'
import SkeletonLoader from '../components/SkeletonLoader.vue'

const fontSize = inject('fontSize', ref(2))

const todayReflection = ref(getTodayReflection())
const allReflections = getRecentReflections(5)
const otherReflections = computed(() => allReflections.slice(1))

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

const formattedDate = computed(() => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date().toLocaleDateString('id-ID', options)
})

const contentParagraphs = computed(() => {
  return todayReflection.value.content.split('\n\n').filter(p => p.trim())
})

const formatDateShort = (dateString) => {
  const date = new Date(dateString)
  return date.getDate()
}

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

const viewReflection = (reflection) => {
  todayReflection.value = reflection
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const copyReflection = async () => {
  const text = `${todayReflection.value.title}\n\n"${todayReflection.value.verse.text}"\n- ${todayReflection.value.verse.book} ${todayReflection.value.verse.chapter}:${todayReflection.value.verse.verse || todayReflection.value.verse.verses}`
  await navigator.clipboard.writeText(text)
  showToastMessage('Renungan berhasil disalin!')
}

const shareReflection = async () => {
  const text = `${todayReflection.value.title}\n\n"${todayReflection.value.verse.text}"\n- ${todayReflection.value.verse.book} ${todayReflection.value.verse.chapter}:${todayReflection.value.verse.verse || todayReflection.value.verse.verses}\n\n${todayReflection.value.content}`
  
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Renungan Harian', text })
    } catch (err) {
      console.log('Share cancelled')
    }
  } else {
    await navigator.clipboard.writeText(text)
    showToastMessage('Renungan berhasil disalin!')
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
