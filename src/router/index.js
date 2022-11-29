import { createRouter, createWebHistory } from "vue-router"

import Activity from '../views/Activity.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: '/detail/:id',
    name: 'activity',
    component: Activity,
    meta: {
      title: 'Detail'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `To Do List - ${to.meta.title}`
  next()
})

export default router