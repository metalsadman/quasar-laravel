const load = view => () => import(`features/QuasarThirdParty/ui/${view}.vue`)

const index = {
  path: '',
  name: 'quasar-third-party',
  meta: {
    title: 'Third Party Components'
  },
  components: {
    tabs: load('TabPager'),
    default: load('Index')
  }
}

const cardSkeleton = {
  path: 'card-skeleton',
  name: 'card-skeleton',
  meta: {
    title: 'Card Skeleton',
    tabLabel: 'Skeleton',
    tabIcon: 'mdi-card-text-outline'
  },
  components: {
    default: load('CardSkeletonScreen'),
    tabs: load('TabPager')
  }
  // props: { tabs: { tabs: this }}
}

const testSkeleton = {
  path: 'test-skeleton',
  name: 'test-skeleton',
  meta: {
    title: 'Dynamic Skeleton',
    tabLabel: 'Dynamic',
    tabIcon: 'mdi-card-text-outline'
  },
  components: {
    default: load('SkeletonTest'),
    tabs: load('TabPager')
  }
  // props: { tabs: { tabs: this }}
}

export const tabs = [cardSkeleton, testSkeleton]

export default {
  path: '/quasar-third-party',
  component: () => import('layouts/MyLayout.vue'),
  children: [index, cardSkeleton, testSkeleton]
}
