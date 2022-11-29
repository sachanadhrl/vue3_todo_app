<script setup>
import { XMarkIcon, ArrowPathIcon } from "@heroicons/vue/24/outline"
import SelectOption from "../SelectOption.vue"
defineProps({
  isOpen: Boolean,
  saveTodoLoading: Boolean,
  todo: Object,
  priorities: Object,
})

// color class for each priority
const priorityColorClass = {
  "very-low": "bg-indigo-600",
  low: "bg-primary-dark",
  normal: "bg-info",
  high: "bg-yellow-500",
  "very-high": "bg-danger",
}
// set color class
function priorityColor(priority) {
  return priorityColorClass[priority]
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click="$emit('closeModal')">
    <transition name="slide-up" appear @click.stop>
      <div class="modal-container modal-container__fixed">
        <div class="modal-header">
          <h3>Tambah List Item</h3>
          <button class="btn btn-link" @click="$emit('closeModal')">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>
        <div class="modal-body">
          <form ref="todoForm">
            <div class="form-group">
              <label class="form-label">Nama list item</label>
              <input
                data-cy="modal-add-name-input"
                v-model="todo.title"
                type="text"
                class="form-input"
                placeholder="Tambahkan nama list item"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Priority List Box</label>
              <SelectOption v-model="todo.priority" :options="priorities" class="w-full md:w-1/3">
                <template #button-indicator>
                  <span class="w-2.5 h-2.5 rounded-full" :class="priorityColor(todo.priority)"></span>
                </template>
                <template #option-indicator="{ value }">
                  <span class="w-2.5 h-2.5 rounded-full" :class="priorityColor(value)"></span>
                </template>
              </SelectOption>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            v-if="saveTodoLoading"
            class="btn btn-icon btn-primary"
            disabled
          >
            <ArrowPathIcon class="animate-spin" />
          </button>
          <button
            data-cy="modal-add-save-button"
            v-else
            class="btn btn-primary"
            :disabled="!todo.title"
            @click="$emit('saveTodo')"
          >
            Simpan
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>