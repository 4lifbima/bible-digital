<template>
  <div class="animate-pulse">
    <!-- Card Skeleton -->
    <div 
      v-if="type === 'card'" 
      class="card"
    >
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-dark-surface-tertiary"></div>
        <div class="flex-1 space-y-2">
          <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-1/3"></div>
          <div class="h-3 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-full"></div>
          <div class="h-3 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-2/3"></div>
        </div>
      </div>
    </div>

    <!-- Verse Skeleton -->
    <div 
      v-else-if="type === 'verse'" 
      class="card"
    >
      <div class="h-3 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-24 mb-3"></div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-full"></div>
        <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-full"></div>
        <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-3/4"></div>
      </div>
    </div>

    <!-- Daily Verse Hero Skeleton -->
    <div 
      v-else-if="type === 'hero'" 
      class="rounded-android-xl bg-gray-200 dark:bg-dark-surface-tertiary p-5 h-48"
    >
      <div class="space-y-3">
        <div class="h-4 bg-gray-300 dark:bg-dark-surface-secondary rounded w-28"></div>
        <div class="h-5 bg-gray-300 dark:bg-dark-surface-secondary rounded w-full"></div>
        <div class="h-5 bg-gray-300 dark:bg-dark-surface-secondary rounded w-full"></div>
        <div class="h-5 bg-gray-300 dark:bg-dark-surface-secondary rounded w-2/3"></div>
        <div class="h-3 bg-gray-300 dark:bg-dark-surface-secondary rounded w-32 mt-4"></div>
      </div>
    </div>

    <!-- Grid Item Skeleton -->
    <div 
      v-else-if="type === 'grid'" 
      class="card flex flex-col items-center justify-center py-5"
    >
      <div class="w-12 h-12 rounded-full bg-gray-200 dark:bg-dark-surface-tertiary mb-2"></div>
      <div class="h-3 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-12 mb-1"></div>
      <div class="h-2 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-8"></div>
    </div>

    <!-- Book Item Skeleton -->
    <div 
      v-else-if="type === 'book'" 
      class="card"
    >
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-android bg-gray-200 dark:bg-dark-surface-tertiary"></div>
        <div class="flex-1">
          <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-24 mb-1"></div>
          <div class="h-3 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-16"></div>
        </div>
      </div>
    </div>

    <!-- Search Result Skeleton -->
    <div 
      v-else-if="type === 'search'" 
      class="card"
    >
      <div class="h-3 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-32 mb-3"></div>
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-full"></div>
        <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-5/6"></div>
      </div>
    </div>

    <!-- Line Skeleton -->
    <div 
      v-else-if="type === 'line'" 
      class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded"
      :class="widthClass"
    ></div>

    <!-- Default Text Skeleton -->
    <div v-else class="space-y-2">
      <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-full"></div>
      <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-5/6"></div>
      <div class="h-4 bg-gray-200 dark:bg-dark-surface-tertiary rounded w-4/6"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'card', 'verse', 'hero', 'grid', 'book', 'search', 'line'].includes(value)
  },
  width: {
    type: String,
    default: 'full'
  }
})

const widthClass = computed(() => {
  const widths = {
    'full': 'w-full',
    '3/4': 'w-3/4',
    '2/3': 'w-2/3',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '1/4': 'w-1/4'
  }
  return widths[props.width] || 'w-full'
})
</script>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-pulse > div {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
</style>
