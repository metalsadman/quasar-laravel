<template>
  <div class="q-pa-md row justify-center">
    <div class="q-gutter-md row">
      <q-select
        filled
        v-model="model"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFn"
        hint="Input your favorite LotR character. Mininum 1 character to trigger autocomplete"
        style="width: 250px; padding-bottom: 32px"
        option-value="Name"
        option-label="Name"
        @input="input"
        label="Autocomplete"
        hide-dropdown-icon
        clearable
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">No results</q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import lotrOpts from 'assets/lotr'
const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
]

export default {
  props: {
    autoSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selectModel: null,
      selectOpts: stringOptions,
      model: null,
      options: lotrOpts,
      notif: () => { },
      vowels: ['a', 'e', 'i', 'o', 'u']
    }
  },
  methods: {
    filterFn (val, update, abort) {
      if (val.length < 1) {
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = lotrOpts.filter(v => v.Name.toLowerCase().includes(needle))
      })
    },
    input (val) {
      this.notif()
      this.notif = this.$q.notify({ message: `Our friend ${val.Name} is ${this.vowels.includes(val.Race.toLowerCase().charAt(0)) ? 'an' : 'a'} ${val.Race}!`, duration: 300, color: 'positive' })
    }
  }
}
</script>
