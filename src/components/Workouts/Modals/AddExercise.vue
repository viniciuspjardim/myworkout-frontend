<template>
  <q-card class='q-px-md'>
    <modal-header>Add Exercise</modal-header>

    <exercise-form
      @onSubmit="onSubmit()"
      :exercise="exercise"
      :btnText="'Add'">
    </exercise-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      exercise: {
        name: '',
        sets: 3,
        reps: 10,
        weight: 5,
        done: false
      }
    }
  },
  methods: {
    ...mapActions('workouts', ['addExercise']),
    onSubmit() {
      this.addExercise(this.exercise)
      this.$emit('onSubmit')
    }
  },
  components: {
    'modal-header': require('./ModalHeader').default,
    'exercise-form': require('./ExerciseForm').default
  }
}
</script>
