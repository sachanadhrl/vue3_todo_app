<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'
import dayjs from 'dayjs'

const props = defineProps({
  datas: Object
})

function formatDate(date) {
  return dayjs(date).format('D MMMM YYYY')
}
</script>

<template>
  <div class="w-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
    <div data-cy="activity-item" v-for="activity in datas" :key="activity"
      class="card card__square hover:bg-default-50 animate-slide-up" @click="$router.push({name: 'activity', params: { id: activity.id }})">
      <h3 data-cy="activity-item-title" class="card-title">
        <router-link :to="{ name: 'activity', params: { id: activity.id } }" class="btn-link transition-all">{{ activity.title }}</router-link>
      </h3>
  
      <div class="card-footer">
        <p data-cy="activity-item-date">{{ formatDate(activity.created_at) }}</p>
        <button data-cy="activity-item-delete-button" class="btn btn-link" @click.stop @click="$emit('emitDelete', activity.id)">
          <TrashIcon class="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>
    </div>
  </div>
</template>