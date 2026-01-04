<template>
  <button
    @click="handleClick"
    class="fixed right-4 z-40 w-14 h-14 rounded-full bg-primary shadow-fab 
           flex items-center justify-center text-white
           transition-all duration-300 ease-android
           hover:bg-primary-600 active:scale-95 active:shadow-elevation-2"
    :class="bottomClass"
  >
    <slot>
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  bottom: {
    type: String,
    default: '80px'
  }
})

const emit = defineEmits(['click'])

const bottomClass = computed(() => {
  return `bottom-[${props.bottom}]`
})

const handleClick = (e) => {
  emit('click', e)
}
</script>

<style scoped>
button {
  -webkit-tap-highlight-color: transparent;
  bottom: calc(80px + env(safe-area-inset-bottom, 0px));
}
</style>
