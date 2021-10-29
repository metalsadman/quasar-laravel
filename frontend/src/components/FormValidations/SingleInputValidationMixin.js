import BaseValidationMixin from './BaseValidationMixin'
/* eslint-disable */
export default {
  mixins: [BaseValidationMixin],
  props: ['val'],
  computed: {
    hasErrors () {
      return this.val ? this.val.$error : null
    },
    errMessage () {
      return this.val ? this.getErrMessage(this.val) : null
    }
  }
}
