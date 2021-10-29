import VeeValidate from 'vee-validate'

// "async" is optional
export default async ({ Vue }) => {
  Vue.use(VeeValidate, {
    validity: true
  })
}
