/**
 * Axios boot initiation and helper functions pertaining to axios instance
 * @author ren metalsadman
 */

// import { Platform } from 'quasar'
import { Notify } from 'quasar'
import axios from 'axios'

let notif = () => void 0

/**
 * Used for intercepting axios requests and responses
 * and logging it in the console, useful when in dev
 */
// eslint-disable-next-line
const defaultInterceptor = store => {
  // register a standard request interceptor
  axios.interceptors.request.use(
    config => {
      // Do something before request is sent
      console.log(
        '%c[REQUEST] sent -> ' + config.url,
        'color: blue; font-weight: bold;',
        config
      )
      return config
    },
    error => {
      // Do something with request error
      console.log(
        '%c[REQUEST] error -> ' + error.config.url,
        'color: red; font-weight: bold;',
        error.message || error
      )
      return Promise.reject(error)
    }
  )
  // Add a response interceptor
  axios.interceptors.response.use(
    response => {
      // Do something with response data
      console.log(
        '%c[RESPONSE] received -> ' + response.config.url,
        'color: green; font-weight: bold;',
        response
      )
      store.dispatch('commons/testRouter')
      notif()
      notif = Notify.create({
        color: 'positive',
        icon: 'mdi-check',
        message: response.data.message,
        timeout: 1500
      })
      return response
    },
    error => {
      // Do something with response error
      /**
       * @error object
       * @errorDotresponse only exist if the server responded with an error,
       * else it's a generic error object
       */
      console.log(
        '%c[RESPONSE] error ->' + error.config.url,
        'color: red; font-weight: bold;',
        error.response || error.message
      )
      let message = ''
      if (error.response !== undefined) {
        if (typeof error.response.data.message === 'object') {
          console.log('message', error.response.data.message)
          // message = error.response.message
          let messages = error.response.data.message
          for (let k in messages) {
            console.log(messages[k])
            if (Array.isArray(messages[k])) {
              message = messages[k].join(' ')
            }
          }
        } else {
          message = error.response.data.message
        }
      } else {
        message = error.message
      }

      notif()
      notif = Notify.create({
        color: 'negative',
        icon: 'mdi-alert-circle-outline',
        message: message,
        timeout: 2000
      })
      // return the error object
      return Promise.reject(error)
    }
  )
}

/**
 * Convenience function for getting the baseUrl
 * that will be used in the axios requests
 * @param {*} string || object literal
 * @returns String used for axios baseUrl
 */

const appMode = type =>
  ({
    test: 'https://b9g95.sse.codesandbox.io/',
    laravel: 'http://localhost:8000/api',
    production: 'http://127.0.0.1:8000/api'
    // get mobile () {
    //   return Platform.is.cordova ? this.local : this.test
    // }
  }[type])

export default ({ Vue, store }) => {
  // const url = store.state['commons'].targetUrl || appMode('vhost')
  // set axios defaults
  axios.defaults.baseURL = appMode(process.env.DEV ? 'laravel' : 'production')
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.timeout = 2000
  // add axios generic interceptor
  defaultInterceptor(store)
  // process.env.DEV && defaultInterceptor()
  // customInterceptor(store)
  const token = store.getters['auth/getField']('token')
  if (token) {
    setAuthHeader(token)
  }

  // set custom header for the client or device information
  // const deviceInfo = store.getters['commons/getField']('deviceInfo')
  // const quasarInfo = Platform.is
  // const clientInfo = deviceInfo
  //   ? { client: quasarInfo, device: deviceInfo }
  //   : { client: quasarInfo }
  // if (clientInfo) {
  //   setClientInfoHeader(clientInfo)
  // }

  Vue.prototype.$axios = axios
}

export const setAuthHeader = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const setClientInfoHeader = clientInfo => {
  axios.defaults.headers.common['ClientInfo'] = JSON.stringify(clientInfo)
}

/**
 * unset the header part of your axios instance
 * in logging out or token expiry etc..
 */
export const unSetAuthHeader = () => {
  axios.defaults.headers.common['Authorization'] = null
}

export const setBaseUrl = strUrl => {
  axios.defaults.baseURL = strUrl
}

/**
 * Custom interceptor if you want to have a global Notification
 * works well with vuex store
 * @param {*} store
 */
// eslint-disable-next-line
const customInterceptor = store => {
  // request interceptor
  axios.interceptors.request.use(
    config => {
      console.log(
        '%c[REQUEST] sent -> ' + config.url,
        'color: blue; font-weight: bold;',
        config
      )
      return config
    },
    error => {
      console.log(
        '%c[REQUEST] error -> ' + error.config.url,
        'color: red; font-weight: bold;',
        error.message || error
      )
      return Promise.reject(error)
    }
  )
  // Add a response interceptor
  axios.interceptors.response.use(
    response => {
      console.log(
        '%c[RESPONSE] received -> ' + response.config.url,
        'color: green; font-weight: bold;',
        response
      )
      if (store.getters['commons/getHandleAsyncValidation']) {
        store.dispatch('commons/setServerErrorResponse', null)
      }
      return response
    },
    error => {
      console.log(
        '%c[RESPONSE] error ->' + error.config.url,
        'color: red; font-weight: bold;',
        error.response || error.message
      )
      // if (error.response) {
      // if has response save to store
      // console.log('server error response =>', error.response.data)
      if (store.getters['commons/getHandleAsyncValidation'] && error.response) {
        store.dispatch(
          'commons/setServerErrorResponse',
          error.response.data.message
        )
      }
      // }
      return Promise.reject(error)
    }
  )
}

// usage in *.js file to keep same instance of axios
// throughout your app
// import { axios } from 'boot/axios'
export { axios }
