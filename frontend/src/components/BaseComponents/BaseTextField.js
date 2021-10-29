import SingleInputErrorMixin from '../FormValidations/SingleInputValidationMixin'
import { QInput, QIcon } from 'quasar'

export default {
  name: 'BaseTextField',
  mixins: [SingleInputErrorMixin],
  props: {
    hideShowPassword: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: () => void 0
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
  render (h) {
    return h(QInput, {
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
      attrs: this.$attrs,
      scopedSlots: {
        append: () => {
          return this.type === 'password' &&
            this.hideShowPassword &&
            this.$scopedSlots.append === void 0
            ? h(QIcon, {
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
