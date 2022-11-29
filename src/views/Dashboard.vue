<script setup>
import { PlusIcon, ArrowPathIcon } from "@heroicons/vue/24/outline"

import ActivityList from "../components/activity/ActivityList.vue"
import ActivityListLoading from "../components/activity/ActivityListLoading.vue"
import EmptyState from "../components/EmptyState.vue"
import Header from "../components/Header.vue"
import ModalConfirmation from "../components/modal/ModalActivityConfirmation.vue"
import ModalInfo from "../components/modal/ModalInfo.vue"

import { useRoute, useRouter } from "vue-router"
import { computed, ref } from "vue"
import store from "../store"

const route = useRoute()
const router = useRouter()

// get all data activity
const activities = computed(() => store.state.activities)
store.dispatch("getActivities")

// get data for loading state
const activityAddLoading = computed(() => store.state.loadings.activity_add)
const totalActivity = computed(() => store.getters.totalActivities)

// add activity
function addActivity() {
  store.dispatch("saveActivity").then(() => {
    store.dispatch("getActivities")
  })
}

// get activity data to delete
const currentActivity = computed(() => store.state.currentActivity.data) // get activity data

// show modal for delete activity
const alertConfirmation = ref(false)
function confirmDelete(id) {
  // tell vuex to set current activity data
  store.dispatch("getCurrentActivity", id).then(({ data }) => {
    alertConfirmation.value = !alertConfirmation.value // open confirmation modal
  })
}

// delete activity
const isConfirmed = ref(false)
function deleteActivity(id) {
  store.dispatch("deleteActivity", id).then(() => {
    alertConfirmation.value = !alertConfirmation.value // close confirmation modal
    isConfirmed.value = !isConfirmed.value // open modal info
    store.dispatch("getActivities")
  })
}
</script>

<template>
  <div>
    <Header>
      <template #title-page>
        <h1 data-cy="activity-title">Activity</h1>
      </template>
      <template #buttons>
        <button
          v-if="activityAddLoading"
          class="btn btn-icon btn-primary"
          disabled
        >
          <ArrowPathIcon class="animate-spin" />
        </button>
        <button data-cy="activity-add-button" v-else @click="addActivity" class="btn btn-icon btn-primary">
          <PlusIcon />
          Tambah
        </button>
      </template>
    </Header>

    <!-- Content -->
    <transition name="fade" mode="out-in">
      <ActivityListLoading data-cy="activity-list-loading" :loading="activities.loading">
        <EmptyState data-cy="activity-empty-state" v-if="!totalActivity" :pages="route.name" @addActivity="addActivity" />
        <ActivityList
          v-else
          :datas="activities.data"
          @emitDelete="confirmDelete"
        />
      </ActivityListLoading>
    </transition>
    <!--/ Content -->

    <!-- Modal Confirmation -->
    <transition name="fade" mode="out-in">
      <ModalConfirmation
        data-cy="modal-delete"
        v-if="alertConfirmation"
        :alert="alertConfirmation"
        :currentData="currentActivity"
        messageProps="Apakah anda yakin menghapus activity"
        @deleteData="deleteActivity"
        @cancelDelete="alertConfirmation = !alertConfirmation"
      />
    </transition>
    <!--/ Modal Confirmation -->

    <!-- Modal Info -->
    <transition name="fade" mode="out-in">
      <ModalInfo
        v-if="isConfirmed"
        messageProps="Activity berhasil dihapus!"
        :status="isConfirmed"
        @closeModal="isConfirmed = !isConfirmed"
      />
    </transition>
    <!--/ Modal Info -->
  </div>
</template>