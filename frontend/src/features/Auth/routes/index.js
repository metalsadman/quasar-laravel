const load = view => () => import(`features/Auth/ui/${view}.vue`)

// const register = {
//   path: '',
//   name: 'register',
//   meta: {
//     title: 'Register'
//   },
//   component: load('Register')
// }

export default {
  path: '/',
  component: load('Login')
}
