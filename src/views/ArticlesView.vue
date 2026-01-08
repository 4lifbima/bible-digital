<template>
  <div class="min-h-screen bg-surface dark:bg-dark-surface pb-24">
    <!-- Header -->
    <header class="sticky top-0 z-40 bg-surface/80 dark:bg-dark-surface/80 backdrop-blur-xl border-b border-gray-100 dark:border-dark-surface-tertiary">
      <div class="px-4 py-4">
        <div class="flex items-center gap-3">
          <button 
            @click="$router.push('/')"
            class="btn-icon"
          >
            <svg class="w-6 h-6 text-text-primary dark:text-dark-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 class="text-xl font-bold text-text-primary dark:text-dark-text">Semua Berita</h1>
            <p class="text-sm text-text-secondary dark:text-dark-text-secondary">{{ articles.length }} artikel</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Articles Grid -->
    <main class="px-4 py-6">
      <template v-if="isLoading">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="i in 4" :key="i" class="card animate-pulse">
            <div class="h-40 bg-gray-200 dark:bg-dark-surface-tertiary rounded-xl mb-4"></div>
            <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-1/4 mb-2"></div>
            <div class="h-6 bg-gray-200 dark:bg-dark-surface-tertiary rounded mb-2"></div>
            <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-3/4"></div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article 
            v-for="(article, index) in articles" 
            :key="article.id"
            @click="$router.push(`/berita/${article.slug}`)"
            class="card group cursor-pointer hover:shadow-elevation-3 transition-all duration-300 animate-fade-in overflow-hidden"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <!-- Article Image Placeholder -->
            <div class="relative h-40 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-xl mb-4 overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              </div>
              <!-- Category Badge -->
              <div class="absolute top-3 left-3">
                <span class="px-3 py-1 text-xs font-semibold bg-white/90 dark:bg-dark-surface/90 text-primary rounded-full shadow-sm backdrop-blur-sm">
                  {{ article.category }}
                </span>
              </div>
              <!-- Headline Badge -->
              <div v-if="article.isHeadline" class="absolute top-3 right-3">
                <span class="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-primary to-primary-600 text-white rounded-full shadow-sm">
                  Headline
                </span>
              </div>
            </div>

            <!-- Article Content -->
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-xs text-text-secondary dark:text-dark-text-secondary">
                <span>{{ formatDate(article.date) }}</span>
                <span>•</span>
                <span>{{ article.readTime }}</span>
              </div>
              <h2 class="font-bold text-text-primary dark:text-dark-text line-clamp-2 group-hover:text-primary transition-colors">
                {{ article.title }}
              </h2>
              <p class="text-sm text-text-secondary dark:text-dark-text-secondary line-clamp-2">
                {{ article.excerpt }}
              </p>
            </div>

            <!-- Read More -->
            <div class="mt-4 flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
              <span>Baca Selengkapnya</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </article>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllArticles, formatDate } from '../data/articlesData.js'

const articles = ref([])
const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    articles.value = getAllArticles()
    isLoading.value = false
  }, 500)
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
