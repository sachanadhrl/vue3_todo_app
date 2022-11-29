<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import store from '../store'

const route = useRoute()

const currentActivity = computed(() => store.state.currentActivity)
if (route.params.id) {
  setTimeout(() => {
    store.dispatch('getCurrentActivity', route.params.id)
  }, 2000)
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <h1 data-cy="header-title" class="text-white text-lg lg:text-2xl font-bold uppercase" :class="route.params.id ? 'hidden md:block ' : ''">TO DO LIST APP
      </h1>
      <div v-if="route.params.id">
        <div v-if="currentActivity.loading" class="block md:hidden w-36 h-5 rounded-full bg-default-100 animate-pulse"></div>
        <div v-else class="flex items-center gap-3 md:hidden">
          <button class="btn btn-link !text-white" @click="$router.go(-1)">
            <ChevronLeftIcon class="w-5 h-5" />
          </button>
          <h1 data-cy="todo-title" class="line-clamp-1 text-lg text-white font-bold">
            {{ currentActivity.data.title }}
          </h1>
        </div>
      </div>
    </div>
  </nav>
</template>