<template>
  <q-select
    v-model="model"
    @keyup.enter.native="$_setValue"
    ref="select"
    :options="computedOptions"
    v-on="listeners"
    v-bind="$attrs"
  >
    <template
      v-for="(_, slot) of $scopedSlots"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </q-select>
</template>
<script>
// the component is just an extension of QSelect with two custom props
// (self-filter & auto-select) for added functionality
// along with all of QSelect's functionalities
export default {
  props: {
    // to do a simple filter
    selfFilter: {
      type: Boolean,
      default: false
    },
    // autoselects current listed options on filter
    // only if one is showed by pressing enter key
    autoSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      model: this.$attrs.value,
      options: this.$attrs.options
    }
  },
  methods: {
    // use this default filter function
    filterFn (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.options = this.$attrs.options.filter(v => {
          const label = (v['option-label'] || v.label).toLowerCase()
          return label.includes(needle)
        })
      })
    },
    // method to check wheter the self-filter was passed as a prop
    // which will use the internal filterFn method for filtering
    // otherwise emit filter event
    filterFunc (v, u, a) {
      this.selfFilter ? this.filterFn(v, u) : this.$emit('filter', v, u, a)
    },
    // method called when a native enter keypress is emitted on the
    // QSelect component, simply checks if current option showing
    // is equal to 1 element and if auto-select prop is set then
    // sets this QSelect model to that option, emit the model change
    // and update the value shown
    $_setValue () {
      if (this.options.length === 1 && this.autoSelect) {
        const curOpt = this.options[0]
        // check if this option is disabled
        if (curOpt.disable) return
        // use the prop name passed on option-value prop
        // else use the standard 'value' prop
        this.model = this.$attrs[`option-value`]
          ? curOpt[this.$attrs[`option-value`]]
          : curOpt.value
        // emit model change
        this.$emit('input', this.model)
        // update the displayed value
        this.$refs.select.updateInputValue(
          // use the prop name passed on option-label prop
          // else use the standard 'label' prop
          this.$attrs[`option-label`]
            ? curOpt[this.$attrs[`option-label`]]
            : curOpt.label,
          true
        )
      }
      // do nuffin
    }
  },
  computed: {
    computedOptions () {
      return this.selfFilter ? this.options : this.$attrs.options
    },
    listeners () {
      return this.$listeners.filter || this.selfFilter
        ? { filter: this.filterFunc, ...this.$listeners }
        : { ...this.$listeners }
    }
  },
  created () {
    console.log('attrs', this.$attrs)
  }
}
// TODO:: Possibly to be combined with BaseSelectField.js
</script>

<style>
</style>
