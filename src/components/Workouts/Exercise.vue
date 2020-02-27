<template>
  <q-item
    @click="updateExercise({ id: exercise.id, updates: { done: !exercise.done } })"
    :class="{ 'done bg-pink-1' : exercise.done }"
    clickable
    v-ripple>

    <q-item-section avatar>
      <q-checkbox
        v-model="exercise.done"
        class="no-pointer-events"
        color="primary" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ exercise.name }}</q-item-label>
    </q-item-section>

    <q-item-section
      side>
      {{ exerciseStr }}
    </q-item-section>

    <q-item-section
      side>
      <q-btn
        @click.stop="1 + 1"
        flat
        round
        dense
        color="primary"
        icon="edit" />
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['exercise'],
  computed: {
    exerciseStr() {
      const ex = this.exercise
      return `${ex.sets}x${ex.reps} -> ${ex.weight}`
    }
  },
  methods: {
    ...mapActions('workouts', ['updateExercise'])
  }
}
</script>

<style scoped>

</style>