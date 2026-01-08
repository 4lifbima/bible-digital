<template>
  <div class="min-h-screen bg-surface dark:bg-dark-surface pb-24">
    <!-- Header -->
    <header class="sticky top-0 z-40 bg-surface/80 dark:bg-dark-surface/80 backdrop-blur-xl border-b border-gray-100 dark:border-dark-surface-tertiary">
      <div class="px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <button 
              @click="$router.push('/berita')"
              class="btn-icon"
            >
              <svg class="w-6 h-6 text-text-primary dark:text-dark-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span class="text-lg font-semibold text-text-primary dark:text-dark-text">Detail Berita</span>
          </div>
          <button 
            @click="shareArticle"
            class="btn-icon"
          >
            <svg class="w-6 h-6 text-text-secondary dark:text-dark-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <template v-if="isLoading">
      <div class="px-4 py-6 space-y-4">
        <div class="h-48 bg-gray-200 dark:bg-dark-surface-tertiary rounded-xl animate-pulse"></div>
        <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-1/3 animate-pulse"></div>
        <div class="h-8 bg-gray-200 dark:bg-dark-surface-tertiary rounded animate-pulse"></div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded animate-pulse"></div>
          <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded animate-pulse"></div>
          <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-3/4 animate-pulse"></div>
        </div>
      </div>
    </template>

    <!-- Article Not Found -->
    <template v-else-if="!article">
      <div class="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div class="w-24 h-24 rounded-full bg-gray-100 dark:bg-dark-surface-tertiary flex items-center justify-center mb-4">
          <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-text-primary dark:text-dark-text mb-2">Artikel Tidak Ditemukan</h2>
        <p class="text-text-secondary dark:text-dark-text-secondary mb-6 text-center">Maaf, artikel yang Anda cari tidak tersedia.</p>
        <button 
          @click="$router.push('/berita')"
          class="btn-primary"
        >
          Lihat Semua Berita
        </button>
      </div>
    </template>

    <!-- Article Content -->
    <template v-else>
      <article class="animate-fade-in">
        <!-- Hero Image -->
        <div class="relative h-56 md:h-72 bg-gradient-to-br from-primary via-primary-600 to-primary-800 overflow-hidden">
          <!-- Decorative Elements -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div class="w-24 h-24 rounded-3xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <svg class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
          <!-- Category Badge -->
          <div class="absolute bottom-4 left-4">
            <span class="px-4 py-1.5 text-sm font-semibold bg-white/90 text-primary rounded-full shadow-lg backdrop-blur-sm">
              {{ article.category }}
            </span>
          </div>
        </div>

        <!-- Article Body -->
        <div class="px-4 py-6">
          <!-- Meta Info -->
          <div class="flex items-center gap-3 text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formatDate(article.date) }}</span>
            </div>
            <span>•</span>
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ article.readTime }}</span>
            </div>
          </div>

          <!-- Title -->
          <h1 class="text-2xl md:text-3xl font-bold text-text-primary dark:text-dark-text leading-tight mb-4">
            {{ article.title }}
          </h1>

          <!-- Author -->
          <div class="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-dark-surface-tertiary">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p class="font-semibold text-text-primary dark:text-dark-text">{{ article.author }}</p>
              <p class="text-sm text-text-secondary dark:text-dark-text-secondary">Penulis</p>
            </div>
          </div>

          <!-- Content -->
          <div class="prose prose-lg dark:prose-invert max-w-none">
            <div 
              class="text-text-primary dark:text-dark-text leading-relaxed space-y-4 article-content"
              v-html="formattedContent"
            ></div>
          </div>

          <!-- Actions -->
          <div class="mt-8 pt-6 border-t border-gray-100 dark:border-dark-surface-tertiary">
            <div class="flex items-center justify-between">
              <button 
                @click="$router.push('/berita')"
                class="flex items-center gap-2 text-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Kembali</span>
              </button>
              <div class="flex items-center gap-2">
                <button 
                  @click="copyLink"
                  class="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-100 dark:bg-dark-surface-tertiary text-text-primary dark:text-dark-text rounded-xl hover:bg-gray-200 dark:hover:bg-dark-surface-secondary transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Salin Link
                </button>
                <button 
                  @click="shareArticle"
                  class="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary to-primary-600 text-white rounded-xl hover:shadow-lg transition-all"
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
      </article>
    </template>

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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getArticleBySlug, formatDate } from '../data/articlesData.js'

const route = useRoute()
const article = ref(null)
const isLoading = ref(true)
const showToast = ref(false)
const toastMessage = ref('')

onMounted(() => {
  setTimeout(() => {
    article.value = getArticleBySlug(route.params.slug)
    isLoading.value = false
  }, 1000)
})

const formattedContent = computed(() => {
  if (!article.value) return ''
  
  // Convert markdown-like content to HTML
  let content = article.value.content
  
  // Convert headers
  content = content.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-text-primary dark:text-dark-text mt-6 mb-3">$1</h2>')
  content = content.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-text-primary dark:text-dark-text mt-4 mb-2">$1</h3>')
  
  // Convert bold text
  content = content.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
  
  // Convert lists
  content = content.replace(/^- (.+)$/gm, '<li class="ml-4 text-text-secondary dark:text-dark-text-secondary">$1</li>')
  content = content.replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 text-text-secondary dark:text-dark-text-secondary"><span class="font-semibold text-primary">$1.</span> $2</li>')
  
  // Convert paragraphs
  content = content.split('\n\n').map(para => {
    if (para.startsWith('<h') || para.startsWith('<li')) return para
    if (para.trim() === '') return ''
    return `<p class="text-text-secondary dark:text-dark-text-secondary">${para}</p>`
  }).join('')
  
  return content
})

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

const copyLink = async () => {
  await navigator.clipboard.writeText(window.location.href)
  showToastMessage('Link berhasil disalin!')
}

const shareArticle = async () => {
  if (!article.value) return
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: article.value.title,
        text: article.value.excerpt,
        url: window.location.href
      })
    } catch (err) {
      console.log('Share cancelled')
    }
  } else {
    await copyLink()
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

.article-content :deep(h2) {
  font-size: 1.25rem;
  font-weight: 700;
  color: #212121;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.dark .article-content :deep(h2) {
  color: #E0E0E0;
}

.article-content :deep(h3) {
  font-size: 1.125rem;
  font-weight: 600;
  color: #212121;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.dark .article-content :deep(h3) {
  color: #E0E0E0;
}

.article-content :deep(p) {
  color: #757575;
  margin-bottom: 1rem;
}

.dark .article-content :deep(p) {
  color: #A0A0A0;
}

.article-content :deep(li) {
  margin-left: 1rem;
  margin-bottom: 0.5rem;
}

.article-content :deep(strong) {
  font-weight: 600;
  color: #212121;
}

.dark .article-content :deep(strong) {
  color: #E0E0E0;
}
</style>
