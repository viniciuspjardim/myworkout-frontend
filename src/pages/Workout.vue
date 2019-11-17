<template>
  <q-page class="bg-grey-3 column">
    <q-list
      class="bg-white"
      separator>
      <q-item
        v-for="(exercise, index) in exercises"
        :key="exercise.name"
        @click="exercise.done = !exercise.done"
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
          v-if="exercise.done"
          side>
          <q-btn
            @click.stop="editExercise(index)"
            flat
            round
            dense
            color="primary"
            icon="edit" />
        </q-item-section>
        <q-item-section
          v-else
          side>
          {{ exerciseStr(index) }}
        </q-item-section>
      </q-item>
    </q-list>
    <q-dialog v-model="editor.editing" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add / Edit Your Exercise</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="editor.name" autofocus @keyup.enter="prompt = false" />
          <q-input dense v-model="editor.sets" @keyup.enter="prompt = false" />
          <q-input dense v-model="editor.reps" @keyup.enter="prompt = false" />
          <q-input dense v-model="editor.weight" @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Remove" @click="finishEditing('remove')" v-close-popup />
          <q-btn flat label="Cancel" @click="finishEditing('cancel')" v-close-popup />
          <q-btn flat label="Ok" @click="finishEditing('ok')" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      editor: {
          editing: false,
          editingIndex: null,
          name: '',
          sets: 3,
          reps: 10,
          weight: 5
      },
      exercises: [
        {
          name: 'Run',
          sets: 1,
          reps: 15,
          weight: 0,
          done: false
        },
        {
          name: 'Leg press',
          sets: 4,
          reps: 15,
          weight: 40,
          done: false
        },
        {
          name: 'Bench press',
          sets: 3,
          reps: 10,
          weight: 15,
          done: false
        }
      ]
    }
  },
  methods: {
    editExercise(index) {
      this.editor.editingIndex = index
      this.editor.editing = true
      const ex = this.exercises[this.editor.editingIndex]
      this.editor.name = ex.name
      this.editor.sets = ex.sets
      this.editor.reps = ex.reps
      this.editor.weight = ex.weight
    },
    finishEditing(action) {
      switch(action) {
        case 'remove':
          this.exercises.splice(this.editor.editingIndex, 1)
          break
        case 'cancel':
          break
        case 'ok':
          const ex = this.exercises[this.editor.editingIndex]
          ex.name = this.editor.name
          ex.sets = this.editor.sets
          ex.reps = this.editor.reps
          ex.weight = this.editor.weight
          ex.done = false
          break
        default:
          console.log('Other')
      }
      this.editor.editingIndex = null
      this.editor.editing = false
      console.log(action)
    },
    exerciseStr(index) {
      const ex = this.exercises[index]
      return `${ex.sets}x${ex.reps} -> ${ex.weight}`
    }
  }
}
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
</style>