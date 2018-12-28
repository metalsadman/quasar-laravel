const routes = [{
  path: '/',
  component: () => import('layouts/MyLayout.vue'),
  children: [{
    path: '',
    component: () => import('pages/Index.vue')
  },
  {
    path: '/test',
    component: () => import('pages/upload-test.vue')
  }
  ]
}]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
