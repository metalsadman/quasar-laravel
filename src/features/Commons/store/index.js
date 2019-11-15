import { getField, updateField } from 'assets/utils/vuex-utils'
// import { routerInstance } from 'boot/router'
// a function returning the state objects useful for reinitialization
const commonState = () => ({
  token: null,
  pageMeta: null
})

const state = {
  // important prop if you want to reset state of this module
  initState: commonState,
  // populate state props
  ...commonState()
}

// getters, just using helper here
const getters = {
  getField
}

// mutator, using helper
const mutations = {
  updateField
}

const actions = {
  testRouter: () => {
    // console.log('router', routerInstance)
    // routerInstance.push('/')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
