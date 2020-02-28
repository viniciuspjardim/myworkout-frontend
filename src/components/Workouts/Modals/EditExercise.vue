<template>
  <q-card class='q-px-md'>
    <modal-header>Edit Exercise</modal-header>

    <exercise-form
      @onSubmit="onEditSubmit()"
      :exercise="exerciseForm"
      :btnText="'Edit'">
    </exercise-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['exercise'],
  data() {
    return {
      exerciseForm: { ...this.exercise }
    }
  },
  methods: {
    ...mapActions('workouts', ['updateExercise']),
    onEditSubmit() {
      this.updateExercise({
        id: this.exerciseForm.id,
        updates: this.exerciseForm
      })
      this.$emit('onEditSubmit')
    }
  },
  components: {
    'modal-header': require('./ModalHeader').default,
    'exercise-form': require('./ExerciseForm').default
  }
}
</script>
