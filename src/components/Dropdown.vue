<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue"
import { ChevronDownIcon, CheckIcon } from "@heroicons/vue/20/solid"
import { ref } from "vue"

const props = defineProps({
  dropdownData: Object
})

const selected = ref()

function selectedList(index) {
  selected.value = index
}
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="btn btn-bordered">
        <slot name="dropdown-button" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems class="dropdown-item">
        <MenuItem v-for="(data, index) in dropdownData" :key="data">
          <button
            data-cy="sort-selection"
            class="relative flex w-full items-center text-sm text-default-600 gap-4 px-5.5 py-3.5"
            @click="[$emit('setFilter', data.value), selectedList(index)]"
          >
            <i class="icon" v-if="data.icon" :class="data.icon ? 'icon-' + data.icon : ''"></i>
            {{ data.label }}
            <span class="absolute inset-y-0 items-center right-3" :class="selected === index ? 'flex' : 'hidden'">
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
          </button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>