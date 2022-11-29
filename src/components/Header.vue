<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>
    <header class="mb-9 gap-5 lg:mb-14" :class="[ route.name === 'dashboard' ? 'flex justify-between items-center' : 'block md:flex md:justify-between md:items-center' ]">
      <slot name="title-page" />
      <slot name="buttons" />
    </header>
  </div>
</template>