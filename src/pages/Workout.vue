<template>
  <q-page class="bg-grey-3 column">
    <div
      class="absolute-bottom-right q-pa-lg">
      <q-btn
        @click="addExercise()"
        round
        color="secondary"
        icon="add" />
    </div>
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
    <q-dialog v-model="editor.open" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add / Edit Your Exercise</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="editor.data.name" autofocus @keyup.enter="prompt = false" />
          <q-input dense v-model="editor.data.sets" @keyup.enter="prompt = false" />
          <q-input dense v-model="editor.data.reps" @keyup.enter="prompt = false" />
          <q-input dense v-model="editor.data.weight" @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn v-if="!editor.adding" flat label="Remove" @click="finishEditing('remove')" v-close-popup />
          <q-btn flat label="Cancel" @click="finishEditing('cancel')" v-close-popup />
          <q-btn flat label="Ok" @click="finishEditing('add/edit')" v-close-popup />
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
          open: false,
          // false is editing, true is adding
          adding: false,
          editingIndex: null,
          data: {
            name: '',
            sets: 3,
            reps: 10,
            weight: 5,
            done: false
          }
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
    addExercise() {
      this.editor.open = true
      this.editor.adding = true
      this.editor.data.name = 'Name'
      this.editor.data.sets = 3
      this.editor.data.reps = 10
      this.editor.data.weight = 5
      this.editor.data.done = false
    },
    editExercise(index) {
      this.editor.editingIndex = index
      this.editor.open = true
      this.editor.data = { ...this.exercises[this.editor.editingIndex] }
      this.editor.data.done = false
    },
    finishEditing(action) {
      switch(action) {
        case 'add/edit':
          if(this.editor.adding) {
            this.exercises.push({ ...this.editor.data })
          }
          else {
            this.$set(this.exercises, this.editor.editingIndex, { ...this.editor.data })
          }
          break
        case 'remove':
          this.exercises.splice(this.editor.editingIndex, 1)
          break
        case 'cancel':
          break
        default:
          console.log('Other')
      }
      this.editor.editingIndex = null
      this.editor.open = false
      this.editor.adding = false
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