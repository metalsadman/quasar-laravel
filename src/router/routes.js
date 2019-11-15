// TODO:: separate route definitions by modules and just import here
import routeModules from 'features/routes-index.js'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/Index.vue') },
      {
        path: '',
        meta: {
          title: 'Quasar v1 Samples'
        },
        component: () => import('pages/Index.vue')
      },
      {
        path: 'autocomplete',
        meta: {
          title: 'Autocomplete'
        },
        component: () => import('pages/AutocompleteSample/Autocomplete.vue')
      },
      {
        path: 'component-samples',
        meta: {
          title: 'Select Extension Sample'
        },
        component: () => import('pages/ComponentSamples/SelectSample.vue')
      },

      {
        path: 'dialog-sample',
        meta: {
          title: 'Form in Dialog sample'
        },
        component: () => import('pages/ComponentSamples/Samples.vue')
      }
      // {
      //   path: 'dropdown-extension',
      //   meta: {
      //     title: 'QBtnDropdown Test'
      //   },
      //   component: () =>
      //     import('pages/ComponentSamples/QBtnDropdownExtension.vue')
      // }
    ]
  },
  {
    path: '/form-validations',
    meta: {
      title: 'Form Component Extension Samples'
    },
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        meta: {
          title: 'Vuelidate Sample'
        },
        components: {
          default: () => import('pages/FormSamples/Index.vue'),
          tabs: () => import('pages/FormSamples/FormTab.vue')
        }
      },
      {
        path: 'external-vuelidate',
        meta: {
          title: 'Vuelidate Sample'
        },
        components: {
          default: () => import('pages/FormSamples/FormValidationSamples.vue'),
          tabs: () => import('pages/FormSamples/FormTab.vue')
        }
      },
      {
        path: 'external-veevalidate',
        meta: {
          title: 'VeeValidate Sample'
        },
        components: {
          default: () => import('pages/FormSamples/VeeValidateSample.vue'),
          tabs: () => import('pages/FormSamples/FormTab.vue')
        }
      }
    ]
  },
  // add other routes
  ...Object.keys(routeModules).map(v => routeModules[v])
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
