import Vue from 'vue'
import VueRouter from 'vue-router'
import { Notify } from 'quasar'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  let notif = () => void 0

  Router.beforeEach((to, from, next) => {
    // check if route meta that's navigating to needs authentication
    // Vue.prototype.$test(to.path)
    // console.log('to =>', to, 'from =>', from)
    if (to.matched.some(record => record.meta.needAuth)) {
      // if not athenticated
      if (!store.getters['commons/getField']('token')) {
        notif()
        notif = Notify.create({
          color: 'negative',
          icon: 'mdi-alert-circle',
          message: 'You need to login.'
        })
        // route to start page
        next('/')
      } else {
        // else continue routing
        // update route meta
        store.commit('commons/updateField', {
          path: 'pageMeta',
          value: to.meta
        })
        next()
      }
    } else {
      // else just continue the routing
      // update route meta
      store.commit('commons/updateField', { path: 'pageMeta', value: to.meta })
      next() // make sure to always call next()!
    }
  })

  return Router
}
