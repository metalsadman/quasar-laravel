import { getField, updateField } from 'assets/utils/vuex-utils'
// import { routerInstance } from 'boot/router'
// a function returning the state objects useful for reinitialization
const teStates = () => ({
  tableDate: null,
  tableColumns: null,
  tablePagination: null,
  tableSelected: null
})

const state = {
  // important prop if you want to reset state of this module
  initState: teStates,
  // populate state props
  ...teStates()
}

// getters, just using helper here
const getters = {
  getField
}

// mutator, using helper
const mutations = {
  updateField
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
