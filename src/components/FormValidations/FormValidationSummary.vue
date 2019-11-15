<template>
  <div>
    <!-- TODO:: Make a wrapper that will automatically fetch
        all form input inside it then show accumulated errors
        in the q-banner
    -->
    <transition
      enter-active-class="animated flipInX"
      leave-active-class="animated flipOutX"
      appear
    >
      <q-banner
        dense
        rounded
        v-if="hasErrors"
        class="bg-negative text-white"
      >
        <div
          v-for="(error, index) in errors"
          :key="index"
        >
          {{ error }}
        </div>
      </q-banner>
    </transition>
  </div>
</template>
<script>
import BaseValidationMixin from './BaseValidationMixin'
const removeDupe = (names) => names.filter((v, i) => names.indexOf(v) === i)
export default {
  name: 'FormValidationSummary',
  mixins: [BaseValidationMixin],
  props: {
    validations: Object
  },
  data () {
    return {
      errors: []
    }
  },
  computed: {
    hasErrors () {
      return this.testForErrors().length > 0
    }
  },
  methods: {
    testForErrors () {
      let arr = []
      arr = removeDupe(this.getAllErrors(this.validations, arr))
      this.errors = arr
      return arr
    },
    // TODO:: improve recursive function
    getAllErrors (obj, arr) {
      if (typeof obj !== 'object' && obj !== null) {
        return arr
      }
      let keys = Object.keys(obj.$params)
      if (obj.$params[keys[0]] !== null) {
        if (obj.$error) {
          arr.push(this.getErrMessage(obj))
        }
        return
      }
      keys.forEach(v => {
        this.getAllErrors(obj[v], arr)
      })
      return arr
    }
  }
}
</script>
