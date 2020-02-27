const state = {
  exercises: [
    {
      id: 1,
      name: 'Run',
      sets: 1,
      reps: 15,
      weight: 0,
      done: false
    },
    {
      id: 2,
      name: 'Leg press',
      sets: 4,
      reps: 15,
      weight: 40,
      done: false
    },
    {
      id: 3,
      name: 'Bench press',
      sets: 3,
      reps: 10,
      weight: 15,
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
  }
}
const actions = {
  updateExercise({ commit },  payload) {
    commit('updateExercise', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
