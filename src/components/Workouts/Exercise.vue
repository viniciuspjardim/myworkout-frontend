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

    <q-item-section side>
      <q-badge color="secondary">SETS</q-badge>
    </q-item-section>

    <q-item-section>
      <q-item-label class="pad-left">{{ exercise.sets }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-badge color="secondary">REPS</q-badge>
    </q-item-section>

    <q-item-section>
      <q-item-label class="pad-left">{{ exercise.reps }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-badge color="secondary">WEIGHT</q-badge>
    </q-item-section>

    <q-item-section>
      <q-item-label class="pad-left">{{ exercise.weight }}</q-item-label>
    </q-item-section>

    <q-separator vertical />

    <q-item-section
      side>
      <q-btn
        @click.stop="editDialogOpen = true"
        flat
        round
        dense
        color="primary"
        icon="edit" />
    </q-item-section>

    <q-item-section
      side>
      <q-btn
        @click.stop="promptToDelete"
        flat
        round
        dense
        color="primary"
        icon="delete" />
    </q-item-section>

    <q-dialog v-model="editDialogOpen">
      <edit-exercise
        :exercise="exercise"
        @onEditSubmit="editDialogOpen = false">
      </edit-exercise>
    </q-dialog>

  </q-item>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['exercise'],
  data() {
    return {
      editDialogOpen: false
    }
  },
  methods: {
    ...mapActions('workouts', ['updateExercise', 'deleteExercise']),

    promptToDelete() {
      this.$q.dialog({
        title: 'Remove',
        message: `Remove <b>${this.exercise.name}</b>?`,
        cancel: true,
        persistent: true,
        html: true
      }).onOk(() => {
        this.deleteExercise(this.exercise.id)
      })
    }
  },
  components: {
    'edit-exercise' : require('components/Workouts/Modals/EditExercise.vue').default
  }
}
</script>

<style lang="sass">
.pad-left
  padding-left: 0.8em
</style>
