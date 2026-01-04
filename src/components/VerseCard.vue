<template>
  <div 
    class="card group cursor-pointer"
    @click="$emit('click')"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1">
        <span class="text-xs font-medium text-primary uppercase tracking-wider">
          {{ verse.book }} {{ verse.chapter }}:{{ verse.verse || verse.verses }}
        </span>
      </div>
      
      <!-- Bookmark Button -->
      <button 
        @click.stop="toggleFavorite"
        class="btn-icon -mr-2 -mt-1"
      >
        <svg 
          class="w-5 h-5 transition-colors duration-200"
          :class="isFav ? 'text-primary fill-primary' : 'text-text-secondary dark:text-dark-text-secondary'"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          stroke-width="2"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
          />
        </svg>
      </button>
    </div>
    
    <!-- Verse Text -->
    <p 
      class="text-text-primary dark:text-dark-text leading-relaxed"
      :class="fontSizeClass"
    >
      {{ verse.text }}
    </p>
    
    <!-- Quick Actions -->
    <div v-if="showActions" class="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-dark-surface-tertiary">
      <button 
        @click.stop="$emit('share')"
        class="btn-ghost text-sm flex items-center gap-1"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Bagikan
      </button>
      
      <button 
        @click.stop="$emit('copy')"
        class="btn-ghost text-sm flex items-center gap-1"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        Salin
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
  verse: {
    type: Object,
    required: true
  },
  showActions: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click', 'share', 'copy'])

const fontSize = inject('fontSize', 2)
const addFavorite = inject('addFavorite')
const removeFavorite = inject('removeFavorite')
const isFavorite = inject('isFavorite')

const fontSizeClass = computed(() => {
  const sizes = {
    1: 'text-sm',
    2: 'text-base',
    3: 'text-lg',
    4: 'text-xl'
  }
  return sizes[fontSize.value] || 'text-base'
})

const verseId = computed(() => {
  return `${props.verse.bookId || props.verse.book}-${props.verse.chapter}-${props.verse.verse || props.verse.verses}`
})

const isFav = computed(() => {
  return isFavorite(verseId.value)
})

const toggleFavorite = () => {
  if (isFav.value) {
    removeFavorite(verseId.value)
  } else {
    addFavorite({
      id: verseId.value,
      ...props.verse
    })
  }
}
</script>
