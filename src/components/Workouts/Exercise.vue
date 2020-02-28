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
  computed: {
    exerciseStr() {
      const ex = this.exercise
      return `${ex.sets}x${ex.reps} -> ${ex.weight}`
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
