<script setup>
import { ref, computed } from "vue"
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue"
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/20/solid"

const props = defineProps({
  options: Object,
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const label = computed(() => {
  return props.options.find(option => option.value === props.modelValue)?.label
})
</script>

<template>
  <Listbox data-cy="modal-add-priority-dropdown" @update:modelValue="value => emit('update:modelValue', value)" :model-value="props.modelValue">
    <div class="relative mt-1">
      <ListboxButton class="listbox-button">
        <p class="flex items-center truncate gap-3 md:gap-5" v-if="label">
          <slot name="button-indicator" />
          {{ label }}
        </p>
        <p class="truncate" v-else>Pilih priority</p>
        <span class="listbox-button__arrow">
          <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ListboxOptions class="listbox-options">
          <ListboxOption data-cy="modal-add-priority-item" v-slot="{ selected }" v-for="option in props.options" :key="option.value"
            :value="option.value" as="template">
            <li class="listbox-options__list">
            
              <slot name="option-indicator" v-bind="option" />
              <span>{{ option.label }}</span>
              <span v-if="selected" class="listbox-options__list-selected">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>