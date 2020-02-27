import Vue from 'vue'
import Vuex from 'vuex'
import workouts from './storeWorkouts'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      workouts
    }
  })

  return Store
}
