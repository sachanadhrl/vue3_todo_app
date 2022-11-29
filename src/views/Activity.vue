<script setup>
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  ChevronLeftIcon,
  ArrowsUpDownIcon
} from "@heroicons/vue/24/outline"

import Header from "../components/Header.vue"
import AddTodoModal from "../components/modal/AddTodoModal.vue"
import DetailActivityLoading from "../components/activity/DetailActivityLoading.vue"
import EmptyState from "../components/EmptyState.vue"
import TodoListLoading from "../components/todo/TodoListLoading.vue"
import ModalConfirmation from "../components/modal/ModalTodoConfirmation.vue"
import ModalInfo from "../components/modal/ModalInfo.vue"
import Dropdown from "../components/Dropdown.vue"

import { computed, nextTick, ref, watch } from "vue"
import { useRoute } from "vue-router"
import store from "../store"
import axiosUser from "../axios"

const route = useRoute()

/**
 * Activity
 */
const activityLoading = computed(() => store.state.currentActivity.loading)
const activity = ref({
  title: "",
})

const activityTitle = ref(true)
const activityTitleInput = ref()
const editActivity = () => {
  activityTitle.value = !activityTitle.value
  if (!activityTitle.value) {
    nextTick(() => {
      activityTitleInput.value.focus()
    })
  }
}

watch(
  () => store.state.currentActivity.data,
  (newAct, oldAct) => {
    activity.value = { ...JSON.parse(JSON.stringify(newAct)) }
  }
)

if (route.params.id) {
  store.dispatch("getCurrentActivity", route.params.id)
}

// update activity
function updateActivity() {
  store.dispatch("updateActivity", activity.value)
  .then(() => {
    activityTitle.value = !activityTitle.value
  })
}
/** Activity */

/**
 * Todo
 */

// get todo data
const saveTodoLoading = computed(() => store.state.loadings.save_todo)
const todoDatas = computed(() => store.state.todos)
const totalTodos = computed(() => store.getters.totalTodos)
store.dispatch("getTodos", route.params.id)

// set priorities property
const priorities = [
  { value: "very-high", label: "Very High" },
  { value: "high", label: "High" },
  { value: "normal", label: "Medium" },
  { value: "low", label: "Low" },
  { value: "very-low", label: "Very Low" },
]

const isOpen = ref(false) // modal status

const todo = ref({
  title: "",
  activity_group_id: route.params.id,
  is_active: 0,
  priority: "",
})

// set current todo data to v-model
watch(
  () => store.state.currentTodo.data,
  (newTodo, oldTodo) => {
    todo.value = { ...JSON.parse(JSON.stringify(newTodo)) }
  }
)

// trigger update todo modal
function updateTodoModal(id) {
  // get current todo data by id
  if (id) {
    store.dispatch("getCurrentTodo", id).then(() => {
      isOpen.value = !isOpen.value
    })
  }
}

// get todo object key
let emptyTodo = ref({})
Object.keys(todo).forEach((key) => {
  emptyTodo = todo[key]
})

function addTodoModal() {
  isOpen.value = !isOpen.value
  // reset todo v-model
  todo.value = { ...JSON.parse(JSON.stringify(emptyTodo)) }
}

// add or update todo
function saveTodo() {
  store.dispatch("saveTodo", todo.value).then(({ data }) => {
    store.dispatch("getTodos", route.params.id)
    isOpen.value = !isOpen.value
  })
}

// update todo status by clicking checkbox
function updateTodoStatus(item) {
  if (item.id) {
    store.dispatch("getCurrentTodo", item.id).then(() => {
      if (item.is_active === 1) {
        item.is_active = 0
        axiosUser.patch(`/todo-items/${item.id}`, item)
      } else {
        item.is_active = 1
        axiosUser.patch(`/todo-items/${item.id}`, item)
      }
    })
  }
}

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

// get todo data to delete
const currentTodo = computed(() => store.state.currentTodo.data) // get todo data

// show modal for delete todo
const alertConfirmation = ref(false)
function confirmDelete(id) {
  // tell vuex to set current todo data
  store.dispatch("getCurrentTodo", id).then(() => {
    alertConfirmation.value = !alertConfirmation.value // open confirmation modal
  })
}

// delete todo
const isConfirmed = ref(false)
function deleteTodo(id) {
  store.dispatch("deleteTodo", id).then(() => {
    alertConfirmation.value = !alertConfirmation.value // close confirmation modal
    isConfirmed.value = !isConfirmed.value // open modal info
    store.dispatch("getTodos", route.params.id)
  })
}

// sort data
const filters = [
  { value: 'latest', label: 'Terbaru', icon: 'sort-latest' },
  { value: 'oldest', label: 'Terlama', icon: 'sort-oldest' },
  { value: 'titleASC', label: 'A-Z', icon: 'sort-az' },
  { value: 'titleDESC', label: 'Z-A', icon: 'sort-za' },
  { value: 'status', label: 'Belum Selesai', icon: 'sort' },
]

let filteredTodo = ref({})
function setFilter(filter) {
  filteredTodo = store.getters.sortData(filter)
}

</script>

<template>
  <transition name="fade" mode="out-in">
    <DetailActivityLoading data-cy="detail-activity-loading" v-if="activityLoading" />
    <div v-else>
      <Header data-cy="header">
        <template #title-page>
          <div class="relative flex items-center mb-5 md:mb-0 md:gap-4">
            <button class="btn btn-link !hidden md:!flex" @click="$router.go(-1)">
              <ChevronLeftIcon class="w-11 h-11" />
            </button>
            <h1 v-if="activityTitle" @click="editActivity" class="w-full md:w-lg line-clamp-1">{{ activity.title }}</h1>
            <input
              data-cy="todo-title"
              v-else
              type="text"
              v-model="activity.title"
              class="form-title"
              ref="activityTitleInput"
              @focusout="updateActivity"
            />
            <button class="btn btn-link absolute inset-y-1/2 right-0 md:relative" @click="editActivity">
              <PencilIcon class="w-5 h-5" />
            </button>
          </div>
        </template>
        <template #buttons>
          <div class="flex justify-end items-center gap-4.5">
            <Dropdown data-cy="todo-sort-button" :dropdownData="filters" @setFilter="setFilter">
              <template #dropdown-button>
                <ArrowsUpDownIcon />
              </template>
            </Dropdown>
            <button data-cy="todo-add-button" @click="addTodoModal" class="btn btn-icon btn-primary">
              <PlusIcon />
              Tambah
            </button>
          </div>
        </template>
      </Header>

      <transition name="fade" mode="out-in">
        <AddTodoModal
          data-cy="modal-add"
          :isOpen="isOpen"
          :todo="todo"
          :priorities="priorities"
          :saveTodoLoading="saveTodoLoading"
          @closeModal="isOpen = !isOpen"
          @saveTodo="saveTodo"
        />
      </transition>

      <transition name="fade" mode="out-in">
        <TodoListLoading data-cy="todo-list-loading" v-if="todoDatas.loading" />
        <div
          v-else
          class="flex flex-col justify-center items-center gap-2.5 my-10"
        >
          <EmptyState data-cy="todo-empty-state" v-if="!totalTodos" :pages="route.name" @addTodo="addTodoModal" />
          <div
            v-for="item in todoDatas.data"
            :key="item.id"
            class="card flex items-center"
          >
            <div class="flex-1 flex items-center gap-4">
              <input
                data-cy="todo-item-checkbox"
                type="checkbox"
                class="form-checkbox"
                :checked="item.is_active"
                @click="updateTodoStatus(item)"
              />
              <span
                class="w-2.5 h-2.5 rounded-full"
                :class="priorityColor(item.priority)"
              ></span>
              <label
                data-cy="todo-item-title"
                for="checkbox"
                :class="
                  item.is_active === 1 ? 'line-through text-default-500' : ''
                "
              >
                {{ item.title }}
              </label>
              <button class="btn btn-link" @click="updateTodoModal(item.id)">
                <PencilIcon class="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>

            <button data-cy="todo-item-delete-button" class="btn btn-link" @click="confirmDelete(item.id)">
              <TrashIcon class="w-3 h-3 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </transition>
      
      <!-- Modal Confirmation -->
      <transition name="fade" mode="out-in">
        <ModalConfirmation
          data-cy="modal-delete"
          v-if="alertConfirmation"
          :alert="alertConfirmation"
          :currentData="currentTodo"
          messageProps="Apakah anda yakin menghapus List Item"
          @deleteData="deleteTodo"
          @cancelDelete="alertConfirmation = !alertConfirmation"
        />
      </transition>
      <!--/ Modal Confirmation -->

      <!-- Modal Info -->
      <transition name="fade" mode="out-in">
        <ModalInfo
          data-cy="modal-information"
          v-if="isConfirmed"
          messageProps="List Item berhasil dihapus!"
          :status="isConfirmed"
          @closeModal="isConfirmed = !isConfirmed"
        />
      </transition>
      <!--/ Modal Info -->
    </div>
  </transition>
</template>