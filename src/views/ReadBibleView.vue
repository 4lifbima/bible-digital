<template>
  <div class="min-h-screen bg-surface dark:bg-dark-surface">
    <!-- Header -->
    <header class="sticky top-0 z-30 bg-surface/95 dark:bg-dark-surface/95 backdrop-blur-md border-b border-gray-100 dark:border-dark-surface-tertiary">
      <div class="px-4 py-3 flex items-center gap-3">
        <button 
          v-if="currentView !== 'books'"
          @click="goBack"
          class="btn-icon -ml-2"
        >
          <svg class="w-6 h-6 text-text-primary dark:text-dark-text" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-lg font-semibold text-text-primary dark:text-dark-text">
          {{ headerTitle }}
        </h1>
      </div>

      <!-- Testament Tabs -->
      <div v-if="currentView === 'books'" class="flex">
        <button 
          v-for="testament in ['perjanjianLama', 'perjanjianBaru']"
          :key="testament"
          @click="selectedTestament = testament"
          class="flex-1 py-3 text-sm font-medium transition-all duration-300 relative"
          :class="selectedTestament === testament ? 'text-primary' : 'text-text-secondary dark:text-dark-text-secondary'"
        >
          {{ testament === 'perjanjianLama' ? 'Perjanjian Lama' : 'Perjanjian Baru' }}
          <div 
            class="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300"
            :class="selectedTestament === testament ? 'w-16' : 'w-0'"
          ></div>
        </button>
      </div>
    </header>

    <!-- Books List -->
    <div v-if="currentView === 'books'" class="pb-4">
      <template v-if="isLoadingPage">
        <div class="grid grid-cols-2 gap-3 p-4">
          <SkeletonLoader type="book" v-for="i in 6" :key="i" />
        </div>
      </template>
      
      <template v-else>
        <div class="grid grid-cols-2 gap-3 p-4">
          <button 
            v-for="(book, index) in currentBooks"
            :key="book.id"
            @click="selectBook(book)"
            class="card text-left hover:shadow-elevation-3 transition-all duration-300 animate-fade-in group"
            :style="{ animationDelay: `${index * 0.03}s` }"
          >
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <span class="text-primary font-bold text-sm">{{ book.name.substring(0, 3) }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-text-primary dark:text-dark-text text-sm truncate">{{ book.name }}</h3>
                <p class="text-xs text-text-secondary dark:text-dark-text-secondary">{{ book.chapters.length }} pasal</p>
              </div>
            </div>
          </button>
        </div>
      </template>
    </div>

    <!-- Chapters List -->
    <div v-if="currentView === 'chapters'" class="pb-4">
      <template v-if="isLoadingPage">
        <div class="grid grid-cols-5 gap-2 p-4">
          <div v-for="i in 10" :key="i" class="aspect-square rounded-android bg-gray-200 dark:bg-dark-surface-tertiary animate-pulse"></div>
        </div>
      </template>
      
      <template v-else>
        <div class="grid grid-cols-5 gap-2 p-4">
          <button 
            v-for="(chapter, index) in selectedBook.chapters"
            :key="chapter.number"
            @click="selectChapter(chapter)"
            class="aspect-square rounded-xl bg-surface-secondary dark:bg-dark-surface-secondary 
                   flex items-center justify-center font-semibold text-text-primary dark:text-dark-text
                   hover:bg-primary hover:text-white active:scale-95 transition-all duration-200 shadow-sm
                   animate-scale-in"
            :style="{ animationDelay: `${index * 0.02}s` }"
          >
            {{ chapter.number }}
          </button>
        </div>
      </template>
    </div>

    <!-- Verses Reading View -->
    <div v-if="currentView === 'verses'" class="pb-4">
      <!-- Chapter Navigation -->
      <div class="flex items-center justify-between px-4 py-3 bg-surface-secondary dark:bg-dark-surface-secondary sticky top-14 z-20">
        <button 
          @click="prevChapter"
          :disabled="!hasPrevChapter"
          class="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white dark:bg-dark-surface text-sm font-medium text-text-primary dark:text-dark-text disabled:opacity-30 shadow-sm transition-all hover:shadow-md"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>
        <span class="text-sm font-semibold text-text-primary dark:text-dark-text px-4 py-1.5 bg-white dark:bg-dark-surface rounded-full shadow-sm">
          {{ selectedBook.name }} {{ selectedChapter.number }}
        </span>
        <button 
          @click="nextChapter"
          :disabled="!hasNextChapter"
          class="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white dark:bg-dark-surface text-sm font-medium text-text-primary dark:text-dark-text disabled:opacity-30 shadow-sm transition-all hover:shadow-md"
        >
          Next
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Verses Content -->
      <template v-if="isLoadingVerses">
        <div class="px-4 py-4 space-y-4">
          <SkeletonLoader type="verse" v-for="i in 5" :key="i" />
        </div>
      </template>
      
      <template v-else>
        <div class="px-4 py-4">
          <div 
            v-for="(verse, index) in selectedChapter.verses"
            :key="verse.number"
            class="mb-5 last:mb-0 animate-fade-in"
            :style="{ animationDelay: `${index * 0.03}s` }"
          >
            <p :class="fontSizeClass" class="text-text-primary dark:text-dark-text leading-relaxed">
              <span class="inline-flex items-center justify-center w-6 h-6 bg-primary/10 text-primary font-bold text-xs rounded-full mr-2">
                {{ verse.number }}
              </span>
              <span 
                @click="toggleVerseSelection(verse)"
                class="cursor-pointer rounded px-1 -mx-1 transition-all duration-200"
                :class="isVerseSelected(verse) ? 'bg-primary/20 dark:bg-primary/30' : 'hover:bg-gray-100 dark:hover:bg-dark-surface-tertiary'"
              >
                {{ verse.text }}
              </span>
            </p>
          </div>
        </div>
      </template>

      <!-- Selected Verses Action Bar -->
      <Transition name="slide-up">
        <div 
          v-if="selectedVerses.length > 0"
          class="fixed bottom-24 left-4 right-4 bg-gradient-to-r from-primary to-primary-600 rounded-2xl shadow-elevation-4 p-4 flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {{ selectedVerses.length }}
            </span>
            <span class="text-white text-sm font-medium">ayat dipilih</span>
          </div>
          <div class="flex items-center gap-1">
            <button @click="bookmarkSelected" class="p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
            <button @click="shareSelected" class="p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button @click="copySelected" class="p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button @click="clearSelection" class="p-2.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors ml-1">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </Transition>
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
import { ref, computed, inject, onMounted } from 'vue'
import { bibleData } from '../data/bibleData.js'
import SkeletonLoader from '../components/SkeletonLoader.vue'

const fontSize = inject('fontSize', ref(2))
const addFavorite = inject('addFavorite')

const currentView = ref('books')
const selectedTestament = ref('perjanjianLama')
const selectedBook = ref(null)
const selectedChapter = ref(null)
const selectedVerses = ref([])
const isLoadingPage = ref(true)
const isLoadingVerses = ref(false)
const showToast = ref(false)
const toastMessage = ref('')

onMounted(() => {
  setTimeout(() => {
    isLoadingPage.value = false
  }, 1500)
})

const currentBooks = computed(() => {
  return bibleData[selectedTestament.value].books
})

const headerTitle = computed(() => {
  if (currentView.value === 'books') return 'Pilih Kitab'
  if (currentView.value === 'chapters') return selectedBook.value?.name || 'Pilih Pasal'
  if (currentView.value === 'verses') return `${selectedBook.value?.name} ${selectedChapter.value?.number}`
  return 'Baca Alkitab'
})

const fontSizeClass = computed(() => {
  const sizes = { 1: 'text-sm', 2: 'text-base', 3: 'text-lg', 4: 'text-xl' }
  return sizes[fontSize.value] || 'text-base'
})

const hasPrevChapter = computed(() => {
  if (!selectedBook.value || !selectedChapter.value) return false
  const currentIndex = selectedBook.value.chapters.findIndex(c => c.number === selectedChapter.value.number)
  return currentIndex > 0
})

const hasNextChapter = computed(() => {
  if (!selectedBook.value || !selectedChapter.value) return false
  const currentIndex = selectedBook.value.chapters.findIndex(c => c.number === selectedChapter.value.number)
  return currentIndex < selectedBook.value.chapters.length - 1
})

const showToastMessage = (message) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

const selectBook = (book) => {
  selectedBook.value = book
  currentView.value = 'chapters'
  isLoadingPage.value = true
  setTimeout(() => {
    isLoadingPage.value = false
  }, 300)
}

const selectChapter = (chapter) => {
  selectedChapter.value = chapter
  selectedVerses.value = []
  currentView.value = 'verses'
  isLoadingVerses.value = true
  setTimeout(() => {
    isLoadingVerses.value = false
  }, 400)
}

const goBack = () => {
  if (currentView.value === 'verses') {
    currentView.value = 'chapters'
    selectedVerses.value = []
  } else if (currentView.value === 'chapters') {
    currentView.value = 'books'
  }
}

const prevChapter = () => {
  if (!hasPrevChapter.value) return
  const currentIndex = selectedBook.value.chapters.findIndex(c => c.number === selectedChapter.value.number)
  selectedChapter.value = selectedBook.value.chapters[currentIndex - 1]
  selectedVerses.value = []
  isLoadingVerses.value = true
  setTimeout(() => {
    isLoadingVerses.value = false
  }, 300)
}

const nextChapter = () => {
  if (!hasNextChapter.value) return
  const currentIndex = selectedBook.value.chapters.findIndex(c => c.number === selectedChapter.value.number)
  selectedChapter.value = selectedBook.value.chapters[currentIndex + 1]
  selectedVerses.value = []
  isLoadingVerses.value = true
  setTimeout(() => {
    isLoadingVerses.value = false
  }, 300)
}

const isVerseSelected = (verse) => {
  return selectedVerses.value.some(v => v.number === verse.number)
}

const toggleVerseSelection = (verse) => {
  const index = selectedVerses.value.findIndex(v => v.number === verse.number)
  if (index === -1) {
    selectedVerses.value.push(verse)
  } else {
    selectedVerses.value.splice(index, 1)
  }
}

const clearSelection = () => {
  selectedVerses.value = []
}

const bookmarkSelected = () => {
  selectedVerses.value.forEach(verse => {
    addFavorite({
      id: `${selectedBook.value.id}-${selectedChapter.value.number}-${verse.number}`,
      book: selectedBook.value.name,
      bookId: selectedBook.value.id,
      chapter: selectedChapter.value.number,
      verse: verse.number,
      text: verse.text
    })
  })
  showToastMessage(`${selectedVerses.value.length} ayat disimpan!`)
  clearSelection()
}

const copySelected = async () => {
  const verses = selectedVerses.value
    .sort((a, b) => a.number - b.number)
    .map(v => `${v.number}. ${v.text}`)
    .join('\n')
  
  const text = `${selectedBook.value.name} ${selectedChapter.value.number}\n\n${verses}`
  await navigator.clipboard.writeText(text)
  showToastMessage('Ayat berhasil disalin!')
  clearSelection()
}

const shareSelected = async () => {
  const verses = selectedVerses.value
    .sort((a, b) => a.number - b.number)
    .map(v => `${v.number}. ${v.text}`)
    .join('\n')
  
  const text = `${selectedBook.value.name} ${selectedChapter.value.number}\n\n${verses}`
  
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
  clearSelection()
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
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
