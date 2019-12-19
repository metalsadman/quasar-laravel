import { axios, setAuthHeader } from 'boot/axios'
import { log } from 'assets/utils/app-utils'

export const login = async ({ commit, dispatch, getters }, payload) => {
  try {
    log('login action', payload)
    const res = await axios.post('/login', payload)
    log('login res', res)
    // if (res.data.users === 0) {
    //   return Promise.reject('Username or Password is incorrect.')
    // }
    // const finRes = await dispatch('mockLogin', payload)
    // log('final', finRes)
    commit('commons/updateField', { path: 'isAuth', value: true }, { root: true })
    commit('updateField', { path: 'token', value: res.data.data.token })
    setAuthHeader(getters['getField']('token'))
  } catch (e) {
    process.env.DEV && log(e)
    throw e
  }
}

export const register = async ({ commit, dispatch, getters }, payload) => {
  try {
    log('login action', payload)
    const res = await axios.post('/register', payload)
    log('login res', res)
  } catch (e) {
    process.env.DEV && log(e)
    throw e
  }
}
