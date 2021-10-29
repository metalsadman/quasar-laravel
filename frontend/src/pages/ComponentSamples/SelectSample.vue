<template>
  <div class="q-pa-md row justify-center">
    <div class="q-gutter-md">
      <base-select
        v-model="selectModel"
        :options="selectOpts"
        outlined
        self-filter
        clearable
        style="width: 250px"
        use-input
        hide-selected
        fill-input
        emit-value
        map-options
        input-debounce="0"
        label="Simple filter"
        auto-select
        hint="W/ custom props, Autoselects on enter key if current filtered option is only one."
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">No results</q-item-section>
          </q-item>
        </template>
      </base-select>
      <div>
        Selected value:
        <p class="text-primary">{{ selectModel }}</p>
      </div>

      <base-select
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
        @input="input2"
        auto-select
      />
      <div>
        Autocomplete:
        <p class="text-primary">{{ model }}</p>
      </div>

      <q-select
        filled
        v-model="modelMultiple"
        multiple
        :options="options2"
        use-chips
        stack-label
        label="Multiple selection (Basic QSelect)"
      />

      <base-select
        filled
        v-model="modelMultiple2"
        multiple
        :options="options1"
        use-chips
        stack-label
        label="Multiple selection (Extended)"
      />
    </div>
  </div>
</template>

<script>
import lotrOpts from 'assets/lotr'

const stringOptions = [
  {
    label: 'Google',
    value: 'goog'
  },
  {
    label: 'Facebook',
    value: 'fb'
  },
  {
    label: 'Twitter',
    value: 'twt'
  },
  {
    label: 'Apple',
    value: 'app'
  },
  {
    label: 'Oracle',
    value: 'ora',
    disable: true
  }
]

export default {
  data () {
    return {
      selectModel: '',
      selectModel2: null,
      selectOpts: stringOptions,
      model: null,
      options: lotrOpts,
      notif: () => { },
      vowels: ['a', 'e', 'i', 'o', 'u'],
      modelMultiple: ['Facebook'],
      modelMultiple2: ['Facebook'],
      options2: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
      options1: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle']
    }
  },
  computed: {},
  methods: {
    filterFn (val, update, abort) {
      if (val.length < 1) {
        abort()
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = lotrOpts.filter(v =>
          v.Name.toLowerCase().includes(needle)
        )
      })
    },
    input (val) {
      console.log('vla', val)
      this.notif()
      this.notif = this.$q.notify({
        message: `Our friend ${val.Name} is ${
          this.vowels.includes(val.Race.toLowerCase().charAt(0)) ? 'an' : 'a'
        } ${val.Race}!`,
        timeout: 300,
        color: 'positive'
      })
    },
    input2 (val) {
      this.notif()
      this.notif = this.$q.notify({
        message: `Selected ${val} as our hero.`,
        timeout: 300,
        color: 'positive'
      })
    }
  }
}
</script>
