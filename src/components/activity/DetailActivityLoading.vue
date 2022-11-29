<template>
  <div class="animate-pulse">
    <div class="flex md:justify-between md:items-center md:gap-5 mb-10">
      <div class="flex-1 flex justify-between items-center md:justify-start gap-3">
        <div class="order-2 md:order-1 w-10 h-7 md:h-10 rounded-full bg-default-300"></div>
        <div class="order-1 md:order-2 w-2/3 h-7 md:h-10 rounded-full bg-default-300"></div>
      </div>
      <div class="hidden md:block w-40 h-7 md:h-10 rounded-full bg-default-300 mt-3 md:mt-0"></div>
    </div>
    <div class="flex flex-col justify-center items-center gap-2.5 my-10">
      <div v-for="item in 4" :key="item" class="card flex items-center !bg-default-300">
        <div class="flex-1 flex items-center gap-4">
          <div class="w-1/3 h-7 md:h-10 rounded-full bg-default-400/50"></div>
        </div>

        <div class="w-5 md:w-7 h-5 md:h-7 rounded-full bg-default-400/50"></div>
      </div>
    </div>
  </div>
</template>