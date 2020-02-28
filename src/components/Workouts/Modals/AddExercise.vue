<template>
  <q-card class='q-px-md'>
    <q-card-section class="row">
      <div class="text-h6">Add Exercise</div>

      <q-space />

      <q-btn
        v-close-popup
        flat
        round
        dense
        color="grey-8"
        icon="close" />
    </q-card-section>

    <q-form
      @submit="onSubmit">

      <q-card-section class="q-pt-none">
        <q-input
          clearable
          clear-icon="clear"
          class="icon-grey-6"
          v-model="exercise.name"
          :rules="[val => !!val || 'The exercise name is required']"
          label="Exercise name" />

        <q-input
          v-model="exercise.sets"
          type="number"
          :rules="[
            val => val !== null && val !== '' || 'The number of sets is required',
            val => val > 0 || 'It must be greater then zero'
          ]"
          label="Sets">
          <template v-slot:append>
            <q-btn
              @click="exercise.sets++"
              round
              dense
              flat
              color="grey-6"
              icon="add" />
            <q-btn
              @click="exercise.sets--"
              round
              dense
              flat
              color="grey-6"
              icon="remove" />
          </template>
        </q-input>

        <q-input
          v-model="exercise.reps"
          type="number"
          :rules="[
            val => val !== null && val !== '' || 'The number of repetitions is required',
            val => val > 0 || 'It must be greater then zero'
          ]"
          label="Reps">
          <template v-slot:append>
            <q-btn
              @click="exercise.reps++"
              round
              dense
              flat
              color="grey-6"
              icon="add" />
            <q-btn
              @click="exercise.reps--"
              round
              dense
              flat
              color="grey-6"
              icon="remove" />
          </template>
        </q-input>

        <q-input
          v-model="exercise.weight"
          type="number"
          :rules="[
            val => val !== null && val !== '' || 'The weight is required',
            val => val >= 0 || 'It must be equal or greater then zero'
          ]"
          label="Weight">
          <template v-slot:append>
            <q-btn
              @click="exercise.weight++"
              round
              dense
              flat
              color="grey-6"
              icon="add" />
            <q-btn
              @click="exercise.weight--"
              round
              dense
              flat
              color="grey-6"
              icon="remove" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          type="submit"
          flat
          label="Add"
          color="primary" />
      </q-card-actions>
    </q-form>
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
  }
}
</script>

<style lang="sass" scoped>
.icon-grey-6 /deep/ .q-icon
  color: $grey-6
</style>
