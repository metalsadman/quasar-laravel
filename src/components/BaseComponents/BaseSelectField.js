// import { QSelect } from 'quasar'
import SingleInputErrorMixin from '../FormValidations/SingleInputValidationMixin'
import { QSelect } from 'quasar'

export default {
  name: 'BaseSelectField',
  mixins: [SingleInputErrorMixin],
  inheritAttrs: false,
  props: {
    normalizeBottom: {
      type: Boolean,
      default: false
    }
  },
  // TODO:: bind attributes and props seperately ~ ren
  render (h) {
    return h(QSelect, {
      props: {
        error: this.val ? this.hasErrors : null,
        errorMessage: this.val ? this.errMessage : null,
        bottomSlots: this.normalizeBottom || this.hasErrors,
        ...this.$attrs
      },
      on: this.$listeners,
      scopedSlots: this.$scopedSlots
    })
  }
}
