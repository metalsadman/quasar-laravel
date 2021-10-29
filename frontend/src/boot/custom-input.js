import { QInput } from 'quasar'

export default async ({ Vue }) => {
  const CustomInput = Vue.extend({
    name: 'custom-input',
    extends: QInput,
    props: { upperCase: { type: Boolean, default: true } },
    watch: {
      value (v) {
        this.upperCase && v && this.$emit('input', v.toUpperCase())
      }
    }
  })
  Vue.component('CustomInput', CustomInput)
}
