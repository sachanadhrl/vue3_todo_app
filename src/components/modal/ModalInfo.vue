<script setup>
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

defineProps({
  messageProps: String
})
</script>

<template>
  <div data-cy="modal-information" class="modal-overlay" @click="$emit('closeModal')">
    <transition name="top-to-bottom" appear @click.stop>
      <div class="modal-container">
        <div class="modal-body">
          <div class="flex items-center text-sm gap-2.5">
            <ExclamationCircleIcon class="w-6 text-info" />
            {{ messageProps }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>