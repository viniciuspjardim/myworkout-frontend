import { uid } from 'quasar'
import axios from 'axios'

axios.defaults.baseURL = 'http://my-workout.test/api/users/1'

const state = {
  exercises: []
}
const getters = {
  exercises: (state) => {
    return state.exercises
  }
}
const mutations = {
  setExercises(state, exercises) {
    state.exercises = exercises
  },
  updateExercise(state, payload) {
    const exercise = state.exercises.find((element) => {
      return element.id === payload.id
    })
    Object.assign(exercise, payload.updates)
  },
  deleteExercise(state, id) {
    const { exercises } = state
    for(let i = 0; i < exercises.length; i++) {
      if(exercises[i].id === id) {
        exercises.splice(i, 1)
        return
      }
    }
  },
  addExercise(state, exercise) {
    exercise.id = uid()
    state.exercises.push(exercise)
  }
}
const actions = {
  async fetchExercises({ commit }) {
    try {
      const res = await axios.get('/workouts')
      commit('setExercises', res.data)
    }
    catch(err) {
      console.log(err)
    }
  },
  updateExercise({ commit },  payload) {
    commit('updateExercise', payload)
  },
  deleteExercise({ commit }, id) {
    commit('deleteExercise', id)
  },
  addExercise({ commit }, exercise) {
    commit('addExercise', exercise)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
