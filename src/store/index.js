import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// import example from './module-example'
import modules from 'features/stores-index.js'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
    modules: modules,
    // global actions
    actions: {
      // reset all states
      resetAllState ({ dispatch }) {
        for (const currentModule in modules) {
          if (modules[currentModule].state.hasOwnProperty('initState')) {
            dispatch('resetModuleState', currentModule)
          }
        }
      },
      // reset state by module
      resetModuleState: ({ commit }, currentModule) => {
        const initState = modules[currentModule].state.initState
        commit('RESET_STATES', {
          namespace: currentModule,
          initState: initState
        })
      }
    },
    mutations: {
      // gobal reset state mutation
      RESET_STATES (state, module) {
        const initState = module.initState()
        const namespace = module.namespace
        Object.keys(state[namespace]).forEach(key => {
          // initialize state to og state
          key !== 'initState' && (state[namespace][key] = initState[key])
        })
      }
    },
    plugins: [createPersistedState()]
  })

  return Store
}
