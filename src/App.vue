<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div>
    <Navbar data-cy="navbar" />

    <div class="flex justify-center px-5 py-7 xl:py-12">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>