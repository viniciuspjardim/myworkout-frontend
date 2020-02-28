import { uid } from 'quasar'

const state = {
  exercises: [
    {
      id: 2,
      name: 'Leg press',
      sets: 4,
      reps: 15,
      weight: 40,
      done: false
    }
  ]
}
const getters = {
  exercises: (state) => {
    return state.exercises
  }
}
const mutations = {
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
