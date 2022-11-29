<script setup>
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  loading: Boolean
})
</script>

<template>
  <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
    <div v-for="index in 4" :key="index" class="card card__square animate-pulse">
      <div class="flex flex-col gap-3">
        <div class="w-full h-5 rounded-full bg-default-300"></div>
        <div class="w-2/5 h-5 rounded-full bg-default-300"></div>
        <div class="w-3/5 h-5 rounded-full bg-default-300"></div>
      </div>

      <div class="card-footer gap-3">
        <div class="w-full h-5 rounded-full bg-default-300"></div>
        <div class="w-2/5 h-5 rounded-full bg-default-300"></div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center items-center">
    <slot />
  </div>
</template>