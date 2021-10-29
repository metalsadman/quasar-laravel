// import { QInput, QIcon } from 'quasar'
import SingleInputErrorMixin from '../FormValidations/SingleInputValidationMixin'

export default {
  name: 'QVeeTextField',
  mixins: [SingleInputErrorMixin],
  props: {
    hideShowPassword: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: () => 'text'
    },
    normalizeBottom: {
      type: Boolean,
      default: false
    },
    upperCase: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isPwShown: false
    }
  },
  computed: {
    computedType () {
      return this.type === 'password'
        ? this.isPwShown
          ? 'text'
          : this.type
        : this.type
    }
  },
  // TODO:: bind seperately attributes and props ~ ren
  render (h) {
    return h('q-input', {
      props: {
        error: this.val ? this.hasErrors : null,
        errorMessage: this.val ? this.errMessage : null,
        type: this.computedType,
        bottomSlots: this.normalizeBottom || this.hasErrors,
        ...this.$attrs
      },
      on: {
        ...this.$listeners,
        input: val => {
          val && this.upperCase
            ? this.$emit('input', val.toUpperCase())
            : this.$emit('input', val)
        }
      },
      scopedSlots: {
        append: () => {
          return this.type === 'password' &&
            this.hideShowPassword &&
            this.$scopedSlots.append === void 0
            ? h('q-icon', {
              class: 'cursor-pointer relative-position',
              props: {
                name: this.isPwShown ? 'mdi-eye' : 'mdi-eye-off'
              },
              on: {
                click: () => {
                  this.isPwShown = !this.isPwShown
                }
              },
              directives: [
                {
                  name: 'ripple',
                  value: true
                }
              ]
            })
            : null
        },
        ...this.$scopedSlots
      }
    })
  }
}
