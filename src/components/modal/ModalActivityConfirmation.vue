<script setup>
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

defineProps({
  currentData: Object,
  messageProps: String
})
</script>

<template>
  <div class="modal-overlay" @click="$emit('cancelDelete')">
    <transition name="slide-up" appear @click.stop>
      <div class="modal-container">
        <div class="modal-body">
          <div class="flex flex-col items-center">
            <ExclamationTriangleIcon class="w-20 text-danger mb-5 md:mb-9" />
            <p class="modal-text">
              {{ messageProps }}
              <span class="font-bold md:block">
                “{{ currentData.title }}”?
              </span>
            </p>
            <div class="flex justify-center items-center gap-5">
              <button data-cy="modal-delete-cancel-button" class="btn btn-default" @click="$emit('cancelDelete')">
                Batal
              </button>
              <button data-cy="modal-delete-confirm-button" class="btn btn-danger" @click="$emit('deleteData', currentData.id)">
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>