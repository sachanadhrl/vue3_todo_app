<script setup>
const props = defineProps({
  pages: String
})
</script>

<template>
  <div class="flex justify-center items-center">
    <img v-if="pages === 'dashboard'" src="../assets/img/activity-empty-state.svg" alt="" class="aspect-video" @click="$emit('addActivity')">
    <img v-else src="../assets/img/todo-empty-state.svg" alt="" class="aspect-video" @click="$emit('addTodo')">
  </div>
</template>