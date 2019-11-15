const load = view => () => import(`features/ApiCommunication/ui/${view}.vue`)

const axiosNodeTest = {
  path: '',
  name: 'axios-node-test',
  meta: {
    title: 'Sandboxed Node Server Sample'
  },
  component: load('AxiosNodeTest')
}

export default {
  path: '/axios-node-test',
  component: () => import('layouts/MyLayout.vue'),
  children: [axiosNodeTest]
}
