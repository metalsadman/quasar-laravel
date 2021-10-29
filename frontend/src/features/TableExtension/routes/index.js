const load = view => () => import(`features/TableExtension/ui/${view}.vue`)

const index = {
  path: '',
  name: 'table-extensions',
  meta: {
    title: 'Table Extensions'
  },
  components: {
    tabs: load('TabPager'),
    default: load('Index')
  }
}

const dynamic = {
  path: 'dynamic-sample',
  name: 'dynamic-sample',
  meta: {
    title: 'Dynamic Example',
    tabLabel: 'Dynamic'
  },
  components: {
    default: load('Dynamic'),
    tabs: load('TabPager')
  }
}

const headers = {
  path: 'custom-header',
  name: 'custom-header',
  meta: {
    title: 'Custom Header',
    tabLabel: 'Headers'
  },
  components: {
    default: load('CustomHeader'),
    tabs: load('TabPager')
  }
}

export const tabs = [dynamic, headers]

export default {
  path: '/table-extensions',
  component: () => import('layouts/MyLayout.vue'),
  children: [index, dynamic, headers]
}
