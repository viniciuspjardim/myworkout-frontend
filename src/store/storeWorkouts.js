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
  addExercise(state, exercise) {
    state.exercises.push(exercise)
  },
  updateExercise(state, exercise) {
    const ex = state.exercises.find((element) => {
      return element.id === exercise.id
    })
    Object.assign(ex, exercise)
  },
  deleteExercise(state, id) {
    const { exercises } = state
    for(let i = 0; i < exercises.length; i++) {
      if(exercises[i].id === id) {
        exercises.splice(i, 1)
        return
      }
    }
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
  async addExercise({ commit }, exercise) {
    try {
      exercise.user_id = 1
      const res = await axios.post('/workouts', exercise)
      commit('addExercise', res.data)
    }
    catch(err) {
      console.log(err)
    }
  },
  async updateExercise({ commit }, exercise) {
    try {
      exercise.user_id = 1
      const res = await axios.put(`/workouts/${exercise.id}`, exercise)
      commit('updateExercise', res.data)
    }
    catch(err) {
      console.log(err)
    }
  },
  async deleteExercise({ commit }, id) {
    try {
      await axios.delete(`/workouts/${id}`)
      commit('deleteExercise', id)
    }
    catch(err) {
      console.log(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
