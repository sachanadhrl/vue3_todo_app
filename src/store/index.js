import { createStore } from "vuex"
import axiosUser from "../axios"

const email = 'sachan@email.com'

const store = createStore({
  state: {
    loadings: {
      activity_add: false,
      save_todo: false
    },
    activities: {
      loading: false,
      data: {}
    },
    currentActivity: {
      loading: false,
      data: {}
    },
    todos: {
      loading: false,
      data: {}
    },
    currentTodo: {
      data: {}
    },
  },
  getters: {
    totalActivities(state) {
      return state.activities.data.length
    },
    totalTodos(state) {
      return state.todos.data.length
    },
    sortData: (state) => (filter) => {
      switch (filter) {
        case 'latest':
          return state.todos.data.sort((a,b) => (a.id < b.id ? 1 : -1 ))
        case 'oldest':
          return state.todos.data.sort((a,b) => (a.id > b.id ? 1 : -1 ))
        case 'titleASC':
          return state.todos.data.sort((a,b) => (a.title > b.title ? 1 : -1 ))
        case 'titleDESC':
          return state.todos.data.sort((a,b) => (a.title < b.title ? 1 : -1 ))
        case 'status':
          return state.todos.data.sort((item) => item.is_active ? 1 : -1 )
      }
    }
  },
  actions: {
    getActivities({ commit, state }) {
      state.activities.loading = true
      return axiosUser.get(`/activity-groups?email=${email}`)
      .then((res) => {
        commit('GET_ACTIVITIES', res.data)
        return res
      })      
    },
    getCurrentActivity({ commit, state }, id) {
      state.currentActivity.loading = true
      return axiosUser.get(`/activity-groups/${id}`)
      .then((res) => {
        commit('CURRENT_ACTIVITY', res.data)
        return res
      })
    },
    saveActivity({ commit, state }) {
      const data = {
        title: 'New Activity',
        email: email
      }
      state.loadings.activity_add = true
      return axiosUser.post('/activity-groups', data)
      .then((res) => {
        commit('SAVE_ACTIVITY', res.data)
        return res
      })
    },
    updateActivity({ commit }, data) {
      return axiosUser.patch(`/activity-groups/${data.id}`, data)
      .then((res) => {
        commit('CURRENT_ACTIVITY', res.data)
        return res
      })
    },
    deleteActivity({}, id) {
      return axiosUser.delete(`/activity-groups/${id}`)
    },
    getTodos({ commit, state }, activityId) {
      state.todos.loading = true
      return axiosUser.get(`/todo-items?activity_group_id=${activityId}`)
      .then((res) => {
        commit('GET_TODOS', res.data)
        return res
      })
    },
    getCurrentTodo({ commit }, id) {
      return axiosUser.get(`/todo-items/${id}`)
      .then((res) => {
        commit('CURRENT_TODO', res.data)
        return res
      })
    },
    saveTodo({ commit, state }, todo) {
      state.loadings.save_todo = true
      let response
      if (todo.id) {
        response = axiosUser.patch(`/todo-items/${todo.id}`, todo)
        .then((res) => {
          commit('SAVE_TODO', res.data)
          return res
        })
      } else {
        response = axiosUser.post('/todo-items', todo)
        .then((res) => {
          commit('SAVE_TODO', res.data)
          return res
        })
      }

      return response
    },
    deleteTodo({}, id) {
      return axiosUser.delete(`/todo-items/${id}`)
    }
  },
  mutations: {
    GET_ACTIVITIES: (state, activities) => {
      state.activities.loading = false
      state.activities.data = activities.data
    },
    CURRENT_ACTIVITY: (state, activity) => {
      state.currentActivity.loading = false
      state.currentActivity.data = activity
    },
    SAVE_ACTIVITY: (state, activity) => {
      state.loadings.activity_add = false
      state.activities.data = activity
    },
    GET_TODOS: (state, todos) => {
      state.todos.loading = false
      state.todos.data = todos.data
    },
    CURRENT_TODO: (state, todo) => {
      state.currentTodo.data = todo
    },
    SAVE_TODO: (state, todo) => {
      state.loadings.save_todo = false
      state.todos.data = todo      
    }
  }
})

export default store