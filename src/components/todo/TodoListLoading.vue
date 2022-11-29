<template>
  <div
    class="
      flex flex-col
      justify-center
      items-center
      gap-2.5
      my-10
      animate-pulse
    "
  >
    <div
      v-for="item in 4"
      :key="item"
      class="card flex items-center !bg-default-300"
    >
      <div class="flex-1 flex items-center gap-4">
        <div class="w-1/3 h-10 rounded-full bg-default-400/50"></div>
      </div>

      <button class="btn btn-link">
        <div class="w-7 h-7 rounded-full bg-default-400/50"></div>
      </button>
    </div>
  </div>
</template>