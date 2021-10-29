const replaceAll = (str, find, replace) =>
  str.replace(new RegExp(find, 'g'), replace)

export default {
  inheritAttrs: false,
  props: {
    fieldName: String,
    localMessages: Object,
    asyncErrorMessage: {
      type: String,
      default: null
    },
    errorMessages: {
      type: Object,
      default: () => {
        // fill in more default messages per vuelidate validator function
        return {
          required: 'field is required.',
          minLength: 'field requires minimum length of',
          maxLength: 'field exceeds maximum length of',
          email: 'field is an invalid email.'
        }
      }
    }
  },
  methods: {
    replaceAll,
    getErrMessage (val) {
      if (!val.$error) return ''
      const fieldname = this.$attrs.label || this.fieldName
      const errMessages = this.localMessages || this.errorMessages

      if (val.hasOwnProperty('required') && !val.required) {
        return `${fieldname} ${errMessages.required ||
          this.errorMessages.required}`
      }
      if (val.hasOwnProperty('maxLength') && !val.maxLength) {
        return `${fieldname} ${errMessages.maxLength ||
          this.errorMessages.maxLength} ${val.$params.maxLength.max}.`
      }
      if (
        val.hasOwnProperty('minLength') &&
        !val.minLength &&
        errMessages.minLength
      ) {
        return `${fieldname} ${errMessages.minLength ||
          this.errorMessages.minLength} ${val.$params.minLength.min}.`
      }
      if (val.hasOwnProperty('email') && !val.email && errMessages.minLength) {
        return `${fieldname} ${errMessages.email || this.errorMessages.email}`
      }

      if (
        this.asyncErrorMessage !== null &&
        this.asyncErrorMessage !== '' &&
        !val.$pending
      ) {
        return this.asyncErrorMessage
      }
      // if validator not covered on what described above
      // just extract all the message
      // get validator params
      // TODO:: to be removed for a better way of
      // getting all the error messages.
      let valParams = Object.keys(val.$params).filter(
        v => !v.startsWith('_$') && !val[v]
      )

      let msgArr = []
      if (valParams.length) {
        valParams.forEach(v => {
          if (Object.keys(errMessages).filter(x => x === v).length > 0) {
            msgArr.push(errMessages[v])
          }
        })
        return `${fieldname} ${msgArr}`
      }

      // else return a generic error message
      return `${fieldname} has invalid value.`
    }
  }
}
